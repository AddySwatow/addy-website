# MBTI测试项目部署到Cloudflare完整指南

## 部署架构概览

```
┌─────────────────────────────────────────────────────────────┐
│                     用户访问流程                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  用户浏览器                                                  │
│      │                                                      │
│      ▼                                                      │
│  Cloudflare Pages (静态前端)                                │
│  └─ index.html, questions.js, test-prompt.js               │
│      │                                                      │
│      ▼ API请求                                              │
│  Cloudflare Workers (API后端)                               │
│  └─ /api/versions, /api/start, /api/answer...              │
│  └─ 环境变量: ZHIPU_API_KEY (密钥安全存储)                   │
│      │                                                      │
│      ▼                                                      │
│  智谱AI API                                                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘

GitHub仓库：
├─ 前端代码 (公开可见)
├─ Workers代码 (公开可见，但密钥不在代码里)
└─ 密钥存放在Cloudflare后台 (只有您能访问)
```

---

## Step 1: 修改API密钥为环境变量

### 1.1 修改 server.js

**原代码（硬编码密钥）**：
```javascript
const DEFAULT_API_KEY = '983a92f1ea6744daafac1f4b2b774dae.ipUy2Te24YjnKQRH';
```

**修改为**：
```javascript
const DEFAULT_API_KEY = process.env.ZHIPU_API_KEY || '';
```

### 1.2 创建 .env 文件（本地开发用）

在项目根目录创建 `.env` 文件：
```
ZHIPU_API_KEY=983a92f1ea6744daafac1f4b2b774dae.ipUy2Te24YjnKQRH
```

### 1.3 添加到 .gitignore

确保 `.gitignore` 包含：
```
.env
node_modules/
test-logs/
```

**验证**：运行 `git status`，确认 `.env` 文件不在待上传列表中。

---

## Step 2: 改写server.js为Cloudflare Workers格式

Workers与Node.js的主要差异：
| Node.js | Cloudflare Workers |
|---------|-------------------|
| `express`框架 | 使用`fetch`事件处理 |
| `fs`文件系统 | 不支持（使用KV存储） |
| `require()`模块 | 使用`import`或内联代码 |

### 2.1 创建 worker.js 文件

新建 `worker.js`，将 `server.js` 的API逻辑迁移过来。

**关键改动**：
- 移除 `express`、`fs`、`path` 等Node.js模块
- 使用 Workers 的 `fetch` 事件处理请求
- 环境变量从 `env.ZHIPU_API_KEY` 获取（Workers语法）

---

## Step 3: 创建Workers配置文件

### 3.1 创建 wrangler.toml

```toml
name = "mbti-api"
main = "worker.js"
compatibility_date = "2024-01-01"

[vars]
# 开发环境变量（生产环境在Cloudflare后台设置）
```

### 3.2 安装Wrangler CLI

```bash
npm install -g wrangler
```

### 3.3 登录Cloudflare

```bash
wrangler login
```

---

## Step 4: 部署Workers并配置环境变量

### 4.1 部署Workers

```bash
wrangler deploy
```

部署成功后会得到Workers URL：
```
https://mbti-api.您的账户名.workers.dev
```

### 4.2 在Cloudflare后台设置密钥

1. 访问 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 **Workers & Pages** → **mbti-api**
3. 点击 **Settings** → **Variables**
4. 添加环境变量：
   - 名称：`ZHIPU_API_KEY`
   - 值：`983a92f1ea6744daafac1f4b2b774dae.ipUy2Te24YjnKQRH`
5. 选择 **Secret** 类型（加密存储）
6. 保存后重新部署Workers

---

## Step 5: 部署静态文件到Cloudflare Pages

### 5.1 准备前端文件

将以下文件放入 `public/` 目录：
- `index.html`
- `questions.js`
- `test-prompt.js`

### 5.2 部署到Pages

**方式A：通过GitHub自动部署**
1. 将代码推送到GitHub仓库
2. Cloudflare Pages → Create project → Connect Git
3. 选择仓库，设置：
   - Build output directory: `public`
   - Framework preset: None

**方式B：直接上传**
```bash
wrangler pages deploy public --project-name mbti-test
```

部署成功后得到Pages URL：
```
https://mbti-test.pages.dev
```

---

## Step 6: 前端API地址指向Workers

修改 `index.html` 中的API请求地址：

**原代码**：
```javascript
fetch('/api/versions')
fetch('/api/start')
fetch('/api/answer')
```

**修改为**：
```javascript
const API_BASE = 'https://mbti-api.您的账户名.workers.dev';

fetch(API_BASE + '/api/versions')
fetch(API_BASE + '/api/start')
fetch(API_BASE + '/api/answer')
```

---

## Step 7: 添加到个人网站作品

### 7.1 复制项目到个人网站projects文件夹

```bash
# 在个人网站projects文件夹下创建mbti-test文件夹
mkdir -p "/home/tenbox/Desktop/龙虾交互/addy-website/projects/mbti-test"

# 复制前端静态文件
cp /home/tenbox/Desktop/dynamic-mbti-test/index.html "/home/tenbox/Desktop/龙虾交互/addy-website/projects/mbti-test/"
cp /home/tenbox/Desktop/dynamic-mbti-test/questions.js "/home/tenbox/Desktop/龙虾交互/addy-website/projects/mbti-test/"
cp /home/tenbox/Desktop/dynamic-mbti-test/test-prompt.js "/home/tenbox/Desktop/龙虾交互/addy-website/projects/mbti-test/"
```

### 7.2 修改个人网站index.html

将第4个作品（占位图片）改为MBTI测试：

```html
<article class="portfolio-item" data-project-url="projects/mbti-test/index.html" data-title="动态MBTI人格测试">
  <img
    src="images/mbti-test.png"
    alt="动态MBTI人格测试 - AI驱动的智能难度调整"
    loading="lazy"
    width="400"
    height="300"
  />
  <div class="portfolio-overlay">
    <span class="play-icon" aria-hidden="true">▶</span>
  </div>
  <div class="portfolio-badge">AI + 心理测试</div>
</article>
```

### 7.3 准备预览图片

创建或准备一张预览图片，放入 `images/mbti-test.png`

---

## 完整文件清单

### GitHub仓库文件（公开）
```
mbti-test/
├─ public/
│   ├─ index.html        # 前端页面
│   ├─ questions.js      # 题库
│   └─ test-prompt.js    # 提示词模板
├─ worker.js             # Workers代码（无密钥）
├─ wrangler.toml         # Workers配置
├─ package.json
├─ README.md
└─ .gitignore            # 包含.env
```

### 不上传文件
```
├─ .env                  # 密钥文件（不上传！）
├─ node_modules/
└─ test-logs/
```

---

## 安全验证清单

| 检查项 | 验证方法 |
|-------|---------|
| GitHub无密钥 | 克隆仓库 → 搜索密钥字符串 → 无结果 |
| Workers可调用API | 访问Workers URL测试 |
| 环境变量生效 | Workers后台查看变量（显示为Secret） |
| 前端可访问API | 测试网站 → 完成测试流程 |

---

## 部署完成后的URL

| 服务 | URL |
|------|-----|
| 前端Pages | `https://mbti-test.pages.dev` |
| API Workers | `https://mbti-api.账户名.workers.dev` |
| 个人网站作品 | `https://about-addy.pages.dev/projects/mbti-test/` |

---

## 下一步行动

现在请确认，我将按以下顺序逐步执行：

1. ✅ **Step 1**: 修改server.js密钥为环境变量 + 创建.env + 更新.gitignore
2. ⏳ **Step 2-3**: 创建worker.js + wrangler.toml（需您确认Workers代码结构）
3. ⏳ **Step 4**: 部署Workers（需您登录Cloudflare）
4. ⏳ **Step 5-6**: 部署Pages + 修改API地址
5. ⏳ **Step 7**: 添加到个人网站作品

---

**请回复「开始执行」或「确认」，我将从Step 1开始逐步操作。**