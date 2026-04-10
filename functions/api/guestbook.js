// ============================================
// 留言板 API - Pages Functions 版本
// ============================================

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const path = url.pathname;

  // CORS 处理
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  }

  try {
    // 路由处理
    if (path.includes('/admin/delete')) {
      return await handleAdminDelete(request, env, url);
    } else if (path.includes('/admin/list')) {
      return await handleAdminList(request, env, url);
    } else if (request.method === 'GET') {
      return await handleGet(env);
    } else if (request.method === 'POST') {
      return await handlePost(request, env);
    } else {
      return jsonResponse({ success: false, message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API error:', error);
    return jsonResponse({ success: false, message: '服务器错误' });
  }
}

// ============================================
// 核心处理函数
// ============================================

function jsonResponse(data) {
  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}

function dehydrate(text) {
  return text.replace(/[^\w\u4e00-\u9fa5]/g, '');
}

function normalize(text) {
  return text.toLowerCase();
}

function filterContent(text, blockedWords) {
  if (!text || !blockedWords || blockedWords.length === 0) return text;

  const positions = [];
  let cleanIndex = 0;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const isValidChar = /[\w\u4e00-\u9fa5]/.test(char);
    positions.push({
      originalIndex: i,
      char: char,
      isValid: isValidChar,
      cleanIndex: isValidChar ? cleanIndex++ : -1
    });
  }

  const cleanText = normalize(dehydrate(text));
  const replacePositions = new Set();

  for (const word of blockedWords) {
    const normalizedWord = normalize(word);
    const wordLen = normalizedWord.length;

    let searchStart = 0;
    while (searchStart <= cleanText.length - wordLen) {
      const foundIndex = cleanText.indexOf(normalizedWord, searchStart);
      if (foundIndex === -1) break;

      for (let i = 0; i < positions.length; i++) {
        if (positions[i].cleanIndex >= foundIndex &&
            positions[i].cleanIndex < foundIndex + wordLen) {
          replacePositions.add(i);
        }
      }

      searchStart = foundIndex + 1;
    }
  }

  if (replacePositions.size === 0) return text;

  const resultArray = text.split('');
  for (const idx of replacePositions) {
    resultArray[idx] = '🌸';
  }

  return resultArray.join('');
}

function containsLink(text) {
  const patterns = [
    /https?:\/\//i,
    /www\./i,
    /\.com/i,
    /\.cn/i,
    /\.net/i,
    /\.org/i,
    /\.xyz/i,
    /\.top/i,
    /\.io/i,
    /\.cc/i,
    /\.me/i,
    /\.vip/i,
    /\.tv/i
  ];
  return patterns.some(p => p.test(text));
}

// ============================================
// GET：获取留言列表
// ============================================

async function handleGet(env) {
  const result = await env.DB.prepare(
    `SELECT id, nickname, content, created_at FROM comments ORDER BY created_at DESC LIMIT 100`
  ).all();

  return jsonResponse({
    success: true,
    data: result.results || []
  });
}

// ============================================
// POST：提交留言
// ============================================

async function handlePost(request, env) {
  const ip = request.headers.get('cf-connecting-ip') || 'unknown';

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ success: false, message: '请求格式错误' });
  }

  const { nickname, content } = body;

  if (!nickname || !content) {
    return jsonResponse({ success: false, message: '请填写昵称和留言内容' });
  }

  if (nickname.trim().length === 0 || content.trim().length === 0) {
    return jsonResponse({ success: false, message: '昵称和内容不能为空' });
  }

  if (nickname.length > 20) {
    return jsonResponse({ success: false, message: '昵称最多 20 个字符' });
  }

  if (content.length > 500) {
    return jsonResponse({ success: false, message: '留言最多 500 个字符' });
  }

  if (containsLink(nickname) || containsLink(content)) {
    return jsonResponse({ success: false, message: '留言禁止包含链接地址' });
  }

  const rateLimitResult = await env.DB.prepare(
    `SELECT COUNT(*) as count FROM comments
     WHERE ip = ? AND created_at > datetime('now', '-1 hour')`
  ).bind(ip).first();

  if (rateLimitResult && rateLimitResult.count >= 5) {
    return jsonResponse({
      success: false,
      message: '提交过于频繁，请等待一段时间后再试'
    });
  }

  let blockedWords = [];
  try {
    const wordsResult = await env.DB.prepare(
      `SELECT word FROM blocked_words`
    ).all();
    blockedWords = wordsResult.results.map(r => r.word);
  } catch (e) {
    console.log('blocked_words table not found');
  }

  const filteredNickname = filterContent(nickname, blockedWords);
  const filteredContent = filterContent(content, blockedWords);

  try {
    await env.DB.prepare(
      `INSERT INTO comments (nickname, content, ip) VALUES (?, ?, ?)`
    ).bind(filteredNickname, filteredContent, ip).run();

    return jsonResponse({
      success: true,
      message: '留言成功',
      filtered: filteredNickname !== nickname || filteredContent !== content
    });
  } catch (e) {
    console.error('Insert error:', e);
    return jsonResponse({ success: false, message: '保存失败，请稍后重试' });
  }
}

// ============================================
// 管理接口：删除留言
// ============================================

async function handleAdminDelete(request, env, url) {
  const id = url.searchParams.get('id');
  const token = url.searchParams.get('token');

  const config = await env.DB.prepare(
    `SELECT value FROM admin_config WHERE key = 'admin_token'`
  ).first();

  if (!config || config.value !== token) {
    return jsonResponse({ success: false, message: '无效的管理密钥' });
  }

  if (!id) {
    return jsonResponse({ success: false, message: '缺少留言 ID' });
  }

  try {
    await env.DB.prepare(
      `DELETE FROM comments WHERE id = ?`
    ).bind(parseInt(id)).run();

    return jsonResponse({ success: true, message: '删除成功' });
  } catch (e) {
    return jsonResponse({ success: false, message: '删除失败' });
  }
}

// ============================================
// 管理接口：查看留言列表
// ============================================

async function handleAdminList(request, env, url) {
  const token = url.searchParams.get('token');

  const config = await env.DB.prepare(
    `SELECT value FROM admin_config WHERE key = 'admin_token'`
  ).first();

  if (!config || config.value !== token) {
    return jsonResponse({ success: false, message: '无效的管理密钥' });
  }

  try {
    const result = await env.DB.prepare(
      `SELECT id, nickname, content, ip, created_at FROM comments ORDER BY created_at DESC LIMIT 100`
    ).all();

    return jsonResponse({
      success: true,
      data: result.results || []
    });
  } catch (e) {
    return jsonResponse({ success: false, message: '查询失败' });
  }
}