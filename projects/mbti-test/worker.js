// Cloudflare Workers API for MBTI Test
// 将questions.js和test-prompt.js的内容内联到此文件

// ==================== 内联 questions.js ====================
const questions = {
  EI: {
    easy: [
      { id: 'EI-e1', text: '周末休息时，你更愿意和朋友出去玩还是在家享受独处时光？', options: ['和朋友出去', '稍微倾向出去', '不确定', '稍微倾向在家', '在家独处'] },
      { id: 'EI-e2', text: '在社交场合，你会主动和陌生人交谈还是保持安静？', options: ['主动交谈', '稍微主动', '不确定', '稍微安静', '保持安静'] },
      { id: 'EI-e3', text: '你更喜欢热闹嘈杂的环境还是安静平和的环境？', options: ['热闹环境', '稍微热闹', '不确定', '稍微安静', '安静环境'] },
      { id: 'EI-e4', text: '当手机响起时，你会立即接听还是犹豫一下？', options: ['立即接听', '稍微倾向立即', '不确定', '稍微犹豫', '犹豫一下'] },
      { id: 'EI-e5', text: '你更喜欢通过电话沟通还是文字消息？', options: ['电话沟通', '稍微倾向电话', '不确定', '稍微倾向文字', '文字消息'] },
      { id: 'EI-e6', text: '参加完一场大型聚会后，你通常感觉如何？', options: ['精力充沛，迫不及待想参加下一场', '有点累但很开心', '还好，需要休息一下', '比较疲惫，想静静', '精疲力竭，需要独处恢复'] },
      { id: 'EI-e7', text: '如果可以选择，你更倾向于用哪种方式和朋友聊天？', options: ['直接打电话或视频', '语音消息', '都可以', '文字消息', '更愿意面对面文字沟通'] },
      { id: 'EI-e8', text: '在一场派对中，你更可能：', options: ['主动认识新朋友，活跃气氛', '和几个人愉快聊天', '随缘，顺其自然', '待在熟悉的圈子里', '找个安静的角落待着'] },
      { id: 'EI-e9', text: '你更喜欢哪种工作环境？', options: ['开放式办公室，随时可以交流', '偶尔有交流的开放空间', '混合环境', '半封闭的小组空间', '独立的办公室或在家办公'] },
      { id: 'EI-e10', text: '周末有人约你出去，但你在休息，你会：', options: ['立刻答应，休息时也想出去玩', '考虑一下，可能会去', '看心情决定', '可能会婉拒', '果断拒绝，想待在家'] }
    ],
    medium: [
      { id: 'EI-m1', text: '参加聚会后，你通常会感到精力充沛还是疲惫需要休息？', options: ['精力充沛', '稍微充沛', '不确定', '稍微疲惫', '疲惫需要休息'] },
      { id: 'EI-m2', text: '当需要向他人表达想法时，你更习惯当面说出来还是写下来发送？', options: ['当面说出来', '稍微倾向当面', '不确定', '稍微倾向写下来', '写下来发送'] },
      { id: 'EI-m3', text: '你倾向于拥有少数几个深度好友还是广泛的社交圈？', options: ['广泛社交圈', '稍微倾向广泛', '不确定', '稍微倾向深度好友', '少数深度好友'] },
      { id: 'EI-m4', text: '在团队讨论中，你更愿意公开发言还是私下提出建议？', options: ['公开发言', '稍微倾向公开', '不确定', '稍微倾向私下', '私下提出'] },
      { id: 'EI-m5', text: '当你获得好消息时，你会第一时间分享给很多人还是只告诉重要的人？', options: ['分享给很多人', '分享给一些人', '不确定', '只告诉几个人', '只告诉重要的人'] },
      { id: 'EI-m6', text: '当团队出现分歧时，你倾向于：', options: ['主动调解，让大家把话说开', '鼓励大家沟通', '看情况处理', '先观察事态发展', '等待别人来解决'] },
      { id: 'EI-m7', text: '学习新技能时，你更偏好：', options: ['参加培训班，和同学一起学', '找学习伙伴一起', '都可以', '看视频教程自学', '安静地看书或资料自学'] },
      { id: 'EI-m8', text: '需要做重要决定时，你通常：', options: ['和很多人讨论，听取意见', '找几个人商量', '适当参考意见', '只和亲近的人商量', '自己安静思考决定'] },
      { id: 'EI-m9', text: '面对压力时，你更可能：', options: ['找朋友倾诉、出去活动', '和信任的人聊聊', '看情况', '自己找点事做转移注意力', '独自消化、安静休息'] },
      { id: 'EI-m10', text: '在团队项目中，你更擅长：', options: ['协调沟通、推动进度', '积极参与讨论', '各有所长', '专注自己的任务', '独立完成分配的部分'] }
    ],
    hard: [
      { id: 'EI-h1', text: '当你面临困难时，你倾向于寻求他人支持还是独自想办法解决？', options: ['寻求他人支持', '稍微倾向寻求', '不确定', '稍微倾向独自', '独自解决'] },
      { id: 'EI-h2', text: '你认为深入的一对一交流比群体讨论更有意义吗？', options: ['群体讨论更有意义', '稍微倾向群体', '不确定', '稍微倾向一对一', '一对一更有意义'] },
      { id: 'EI-h3', text: '在需要长时间专注工作时，你能忍受周围有人还是需要绝对安静？', options: ['能忍受周围有人', '稍微能忍受', '不确定', '稍微需要安静', '需要绝对安静'] },
      { id: 'EI-h4', text: '当有人问你怎么看某件事，你会立即说出看法还是需要时间思考后再说？', options: ['立即说出看法', '稍微倾向立即', '不确定', '稍微倾向思考后', '需要思考后'] },
      { id: 'EI-h5', text: '你更看重外部认可（他人赞赏）还是内心满足（自我认可）？', options: ['外部认可更重要', '稍微倾向外部', '不确定', '稍微倾向内心', '内心满足更重要'] }
    ]
  },
  SN: {
    easy: [
      { id: 'SN-e1', text: '你更关注眼前正在发生的事还是想象未来的可能性？', options: ['想象未来', '稍微倾向未来', '不确定', '稍微倾向眼前', '眼前的事'] },
      { id: 'SN-e2', text: '阅读时，你更喜欢具体的故事情节还是抽象的思想探讨？', options: ['抽象思想', '稍微倾向抽象', '不确定', '稍微倾向具体', '具体故事'] },
      { id: 'SN-e3', text: '你更容易记住具体的事实细节还是大致的概念框架？', options: ['大致概念', '稍微倾向概念', '不确定', '稍微倾向细节', '具体细节'] },
      { id: 'SN-e4', text: '描述一件事时，你会用很多具体例子还是用概括性语言？', options: ['概括性语言', '稍微倾向概括', '不确定', '稍微倾向具体例子', '具体例子'] },
      { id: 'SN-e5', text: '你更信任直接经验还是灵感直觉？', options: ['灵感直觉', '稍微倾向直觉', '不确定', '稍微倾向经验', '直接经验'] },
      { id: 'SN-e6', text: '阅读说明书时，你的习惯是？', options: ['大概看看结构就行', '快速浏览重点', '看情况', '仔细阅读关键部分', '逐字逐句认真看'] },
      { id: 'SN-e7', text: '别人给你指路时，你更希望对方怎么描述？', options: ['说个大概方向，我自己探索', '说主要标志物', '都可以', '说清楚主要路口', '详细说每一步怎么走'] },
      { id: 'SN-e8', text: '你更喜欢哪种类型的书籍？', options: ['科幻/哲学类', '推理/探索类', '都看', '生活/实用类', '工具书/教程类'] },
      { id: 'SN-e9', text: '做计划时，你通常关注的是？', options: ['长远愿景和大方向', '中期目标和阶段', '看情况', '近期的关键节点', '具体的每日行程'] },
      { id: 'SN-e10', text: '学习新技能时，你更倾向于？', options: ['先理解原理和底层逻辑', '边用边学', '看情况', '看教程了解基本操作', '跟着步骤一步步学'] }
    ],
    medium: [
      { id: 'SN-m1', text: '解决问题时，你更喜欢尝试新方法还是沿用已验证的方案？', options: ['尝试新方法', '稍微倾向新方法', '不确定', '稍微倾向已有方案', '沿用已验证方案'] },
      { id: 'SN-m2', text: '你更容易被理论创新还是实用改进所吸引？', options: ['理论创新', '稍微倾向理论', '不确定', '稍微倾向实用', '实用改进'] },
      { id: 'SN-m3', text: '你更看重概念的准确性还是实际的可操作性？', options: ['概念准确性', '稍微倾向概念', '不确定', '稍微倾向实操', '实际可操作性'] },
      { id: 'SN-m4', text: '对于未来，你更关注可能性还是现实性？', options: ['可能性', '稍微倾向可能', '不确定', '稍微倾向现实', '现实性'] },
      { id: 'SN-m5', text: '你更喜欢思考抽象问题还是处理具体事务？', options: ['抽象问题', '稍微倾向抽象', '不确定', '稍微倾向具体', '具体事务'] },
      { id: 'SN-m6', text: '面对一个新项目，你更可能先：', options: ['构思整体框架和愿景', '规划关键步骤', '看情况', '列出具体待办事项', '立即开始动手'] },
      { id: 'SN-m7', text: '你更相信灵感还是数据？', options: ['灵感', '稍微倾向灵感', '不确定', '稍微倾向数据', '数据'] },
      { id: 'SN-m8', text: '你更喜欢哪种类型的讨论？', options: ['探讨理念和创新', '分享见解', '都可以', '分析具体案例', '讨论具体执行方案'] },
      { id: 'SN-m9', text: '当你学习新知识时，你更倾向于：', options: ['先理解大概念再学细节', '边学边理解', '看情况', '从细节开始逐步理解', '先掌握具体知识点'] },
      { id: 'SN-m10', text: '你对哪种描述更有共鸣？', options: ['想象力比知识更重要', '创意驱动进步', '两者都重要', '细节决定成败', '实践出真知'] }
    ],
    hard: [
      { id: 'SN-h1', text: '你认为透过表象看本质重要还是关注表象本身？', options: ['透过表象看本质', '稍微倾向本质', '不确定', '稍微倾向表象', '关注表象本身'] },
      { id: 'SN-h2', text: '你更容易被新的可能性还是既有的事实所吸引？', options: ['新的可能性', '稍微倾向可能', '不确定', '稍微倾向事实', '既有的事实'] },
      { id: 'SN-h3', text: '你更看重创新还是传统？', options: ['创新', '稍微倾向创新', '不确定', '稍微倾向传统', '传统'] },
      { id: 'SN-h4', text: '你更相信直觉还是观察？', options: ['直觉', '稍微倾向直觉', '不确定', '稍微倾向观察', '观察'] },
      { id: 'SN-h5', text: '你更认同哪种观点？', options: ['理论指导实践', '理论有价值', '两者结合', '实践验证理论', '实践出真知'] }
    ]
  },
  TF: {
    easy: [
      { id: 'TF-e1', text: '做决定时，你更依赖逻辑分析还是内心感受？', options: ['逻辑分析', '稍微倾向逻辑', '不确定', '稍微倾向感受', '内心感受'] },
      { id: 'TF-e2', text: '当朋友遇到问题时，你更倾向给出解决方案还是情感支持？', options: ['给出解决方案', '稍微倾向方案', '不确定', '稍微倾向支持', '情感支持'] },
      { id: 'TF-e3', text: '你更看重公正还是和谐？', options: ['公正', '稍微倾向公正', '不确定', '稍微倾向和谐', '和谐'] },
      { id: 'TF-e4', text: '批评他人时，你更关注事实正确还是对方感受？', options: ['事实正确', '稍微倾向事实', '不确定', '稍微倾向感受', '对方感受'] },
      { id: 'TF-e5', text: '你更容易被逻辑论证还是情感故事打动？', options: ['逻辑论证', '稍微倾向逻辑', '不确定', '稍微倾向故事', '情感故事'] },
      { id: 'TF-e6', text: '面对冲突，你更倾向于：', options: ['理性分析，找出最优解', '分析利弊', '看情况', '考虑各方感受', '维护关系和谐'] },
      { id: 'TF-e7', text: '你更看重效率还是人情？', options: ['效率', '稍微倾向效率', '不确定', '稍微倾向人情', '人情'] },
      { id: 'TF-e8', text: '评价一个决定时，你更看重：', options: ['是否合理高效', '是否合乎逻辑', '都可以', '是否考虑他人感受', '是否让人满意'] },
      { id: 'TF-e9', text: '当同事犯错时，你会：', options: ['指出问题，分析原因', '说明问题所在', '看情况', '委婉提醒', '考虑到对方的感受'] },
      { id: 'TF-e10', text: '你更喜欢哪种反馈方式？', options: ['直接的、有逻辑的建议', '具体可行的建议', '都可以', '温和的建议', '顾及感受的反馈'] }
    ],
    medium: [
      { id: 'TF-m1', text: '你认为原则比关系重要还是关系比原则重要？', options: ['原则更重要', '稍微倾向原则', '不确定', '稍微倾向关系', '关系更重要'] },
      { id: 'TF-m2', text: '做重要决定时，你更看重客观标准还是个人价值？', options: ['客观标准', '稍微倾向客观', '不确定', '稍微倾向个人', '个人价值'] },
      { id: 'TF-m3', text: '你更容易被批评还是赞美所影响？', options: ['批评让我改进', '稍微倾向批评', '不确定', '稍微倾向赞美', '赞美激励我'] },
      { id: 'TF-m4', text: '你更看重真相还是感情？', options: ['真相', '稍微倾向真相', '不确定', '稍微倾向感情', '感情'] },
      { id: 'TF-m5', text: '你认为坦率直言还是委婉表达更好？', options: ['坦率直言', '稍微倾向坦率', '不确定', '稍微倾向委婉', '委婉表达'] },
      { id: 'TF-m6', text: '面对他人的错误，你更可能：', options: ['指出问题并分析原因', '说明问题所在', '看情况', '委婉提醒', '考虑到对方感受'] },
      { id: 'TF-m7', text: '你认为理性还是感性更能解决问题？', options: ['理性', '稍微倾向理性', '不确定', '稍微倾向感性', '感性'] },
      { id: 'TF-m8', text: '评价一个人时，你更看重：', options: ['能力和成就', '逻辑和理性', '两者都重要', '品德和善良', '对人的关怀'] },
      { id: 'TF-m9', text: '你更认同哪种观点？', options: ['事实胜于雄辩', '逻辑是关键', '两者都重要', '人心比事实重要', '情感驱动行动'] },
      { id: 'TF-m10', text: '面对分歧，你更倾向于：', options: ['分析各方论据', '权衡利弊', '看情况', '理解各方立场', '寻求共识和和谐'] }
    ],
    hard: [
      { id: 'TF-h1', text: '你认为公平分配还是按需分配更合理？', options: ['公平分配', '稍微倾向公平', '不确定', '稍微倾向按需', '按需分配'] },
      { id: 'TF-h2', text: '你更看重结果还是过程？', options: ['结果', '稍微倾向结果', '不确定', '稍微倾向过程', '过程'] },
      { id: 'TF-h3', text: '你认为批评应该直接还是委婉？', options: ['直接', '稍微倾向直接', '不确定', '稍微倾向委婉', '委婉'] },
      { id: 'TF-h4', text: '你更相信理性判断还是直觉感受？', options: ['理性判断', '稍微倾向理性', '不确定', '稍微倾向直觉', '直觉感受'] },
      { id: 'TF-h5', text: '你更看重个人成就还是他人福祉？', options: ['个人成就', '稍微倾向成就', '不确定', '稍微倾向他人', '他人福祉'] }
    ]
  },
  JP: {
    easy: [
      { id: 'JP-e1', text: '你更喜欢提前计划还是随性而为？', options: ['提前计划', '稍微倾向计划', '不确定', '稍微倾向随性', '随性而为'] },
      { id: 'JP-e2', text: '你更看重完成任务还是享受过程？', options: ['完成任务', '稍微倾向完成', '不确定', '稍微倾向享受', '享受过程'] },
      { id: 'JP-e3', text: '你更喜欢有序的生活还是充满惊喜的生活？', options: ['有序的生活', '稍微倾向有序', '不确定', '稍微倾向惊喜', '充满惊喜'] },
      { id: 'JP-e4', text: '你的工作方式更像是有条不紊还是灵活应变？', options: ['有条不紊', '稍微倾向有条不紊', '不确定', '稍微倾向灵活', '灵活应变'] },
      { id: 'JP-e5', text: '你更看重规则还是自由？', options: ['规则', '稍微倾向规则', '不确定', '稍微倾向自由', '自由'] },
      { id: 'JP-e6', text: '安排旅行时，你更倾向于：', options: ['详细规划行程', '大致安排', '看情况', '只定大致方向', '随心所欲'] },
      { id: 'JP-e7', text: '你更喜欢哪种工作节奏？', options: ['稳定有序的进度', '有计划推进', '都可以', '灵活调整', '随状态变化'] },
      { id: 'JP-e8', text: '面对待办事项，你通常：', options: ['按计划逐一完成', '有顺序完成', '看情况', '灵活安排', '想到什么做什么'] },
      { id: 'JP-e9', text: '你更认同哪种生活态度？', options: ['凡事预则立', '计划很重要', '两者结合', '人生需要惊喜', '活在当下'] },
      { id: 'JP-e10', text: '对于周末安排，你更可能：', options: ['提前计划好', '大致规划', '看情况', '临时决定', '随心所欲'] }
    ],
    medium: [
      { id: 'JP-m1', text: '你认为明确的目标还是开放的可能性更有价值？', options: ['明确的目标', '稍微倾向明确', '不确定', '稍微倾向开放', '开放的可能性'] },
      { id: 'JP-m2', text: '你更喜欢确定的结果还是探索的机会？', options: ['确定的结果', '稍微倾向确定', '不确定', '稍微倾向探索', '探索的机会'] },
      { id: 'JP-m3', text: '你更看重执行计划还是适应变化？', options: ['执行计划', '稍微倾向执行', '不确定', '稍微倾向适应', '适应变化'] },
      { id: 'JP-m4', text: '你认为果断决策还是深思熟虑更好？', options: ['果断决策', '稍微倾向果断', '不确定', '稍微倾向深思', '深思熟虑'] },
      { id: 'JP-m5', text: '你更容易按计划行事还是随机应变？', options: ['按计划行事', '稍微倾向计划', '不确定', '稍微倾向随机', '随机应变'] },
      { id: 'JP-m6', text: '面对变化，你更倾向于：', options: ['按原计划执行', '调整计划', '看情况', '灵活应对', '顺势而为'] },
      { id: 'JP-m7', text: '你更看重完成deadline还是保持灵活？', options: ['完成deadline', '稍微倾向deadline', '不确定', '稍微倾向灵活', '保持灵活'] },
      { id: 'JP-m8', text: '对于决定，你更倾向：', options: ['尽早做出决定', '及时决定', '看情况', '再考虑一下', '保留选择余地'] },
      { id: 'JP-m9', text: '你更喜欢哪种工作方式？', options: ['按计划稳步推进', '有序进行', '都可以', '灵活调整', '随灵感行动'] },
      { id: 'JP-m10', text: '你更认同哪种说法？', options: ['计划是成功的基础', '计划有帮助', '两者都重要', '变化比计划重要', '灵活才是关键'] }
    ],
    hard: [
      { id: 'JP-h1', text: '你更看重做出明确决定还是保留选择余地？', options: ['保留选择余地', '稍微倾向保留', '不确定', '稍微倾向明确', '做出明确决定'] },
      { id: 'JP-h2', text: '当项目接近尾声，你会严格执行计划还是允许调整？', options: ['允许调整', '稍微倾向调整', '不确定', '稍微倾向执行', '严格执行'] },
      { id: 'JP-h3', text: '你认为规则应该严格遵守还是根据情况灵活运用？', options: ['灵活运用', '稍微倾向灵活', '不确定', '稍微倾向遵守', '严格遵守'] },
      { id: 'JP-h4', text: '完成任务的方式，你更看重结果达标还是过程完美？', options: ['过程完美', '稍微倾向过程', '不确定', '稍微倾向结果', '结果达标'] },
      { id: 'JP-h5', text: '你认为人生的意义在于达成目标还是体验过程？', options: ['体验过程更重要', '稍微倾向体验', '不确定', '稍微倾向达成', '达成目标更重要'] }
    ]
  }
};

const VERSIONS = {
  quick: { name: '快速版', description: '24题', questionsPerDimension: { EI: 6, SN: 6, TF: 6, JP: 6 }, totalQuestions: 24, aiCallInterval: 6, timeEstimate: '5分钟' },
  standard: { name: '标准版', description: '60题', questionsPerDimension: { EI: 15, SN: 15, TF: 15, JP: 15 }, totalQuestions: 60, aiCallInterval: 5, timeEstimate: '10分钟' },
  professional: { name: '专业版', description: '93题', questionsPerDimension: { EI: 23, SN: 24, TF: 23, JP: 23 }, totalQuestions: 93, aiCallInterval: 8, timeEstimate: '15分钟' },
  advanced: { name: '进阶版', description: '144题', questionsPerDimension: { EI: 36, SN: 36, TF: 36, JP: 36 }, totalQuestions: 144, aiCallInterval: 12, timeEstimate: '25分钟' },
  complete: { name: '完整版', description: '200题', questionsPerDimension: { EI: 50, SN: 50, TF: 50, JP: 50 }, totalQuestions: 200, aiCallInterval: 15, timeEstimate: '35分钟' }
};

function getDimensions() {
  return ['EI', 'SN', 'TF', 'JP'];
}

function getVersionInfo(version) {
  return VERSIONS[version];
}

function getAllVersions() {
  return Object.keys(VERSIONS).map(key => ({ id: key, ...VERSIONS[key] }));
}

function getQuestionCount(version) {
  return VERSIONS[version]?.totalQuestions || 60;
}

function getQuestion(dimension, difficulty, usedIds = []) {
  const pool = questions[dimension]?.[difficulty];
  if (!pool) return null;
  const available = pool.filter(q => !usedIds.includes(q.id));
  if (available.length === 0) return null;
  return available[Math.floor(Math.random() * available.length)];
}

// ==================== 内联 test-prompt.js ====================
const dimensionNames = {
  'EI': { first: 'E', second: 'I', firstLabel: '外向', secondLabel: '内向' },
  'SN': { first: 'S', second: 'N', firstLabel: '实感', secondLabel: '直觉' },
  'TF': { first: 'T', second: 'F', firstLabel: '思考', secondLabel: '情感' },
  'JP': { first: 'J', second: 'P', firstLabel: '判断', secondLabel: '感知' }
};

const personalityTraits = {
  'INTJ': '内向直觉思考判断 - 独立思考者、战略规划、追求完美、不善社交表达',
  'INTP': '内向直觉思考感知 - 逻辑分析者、理论探索、灵活开放、行动力较弱',
  'ENTJ': '外向直觉思考判断 - 天生领导者、果断决策、目标导向、可能过于强势',
  'ENTP': '外向直觉思考感知 - 创意辩论家、思维敏捷、挑战常规、缺乏耐心',
  'INFJ': '内向直觉情感判断 - 理想主义者、洞察人心、追求意义、容易内耗',
  'INFP': '内向直觉情感感知 - 治愈系梦想家、价值观驱动、创意丰富、行动力弱',
  'ENFJ': '外向直觉情感判断 - 天生导师、善于激励、关注他人、可能过度付出',
  'ENFP': '外向直觉情感感知 - 热情创意者、感染力强、追求自由、难以专注',
  'ISTJ': '内向实感思考判断 - 踏实执行者、规则意识、责任心强、缺乏灵活性',
  'ISFJ': '内向实感情感判断 - 温暖守护者、细节关注、默默付出、不善表达需求',
  'ESTJ': '外向实感思考判断 - 高效管理者、组织能力、执行力强、可能过于严格',
  'ESFJ': '外向实感情感判断 - 热心协调者、社交能力强、关注和谐、害怕冲突',
  'ISTP': '内向实感思考感知 - 冷静工匠、动手能力强、独立解决问题、不善沟通',
  'ISFP': '内向实感情感感知 - 温和艺术家、审美敏锐、活在当下、缺乏规划',
  'ESTP': '外向实感思考感知 - 行动派冒险家、应变能力强、追求刺激、冲动决策',
  'ESFP': '外向实感情感感知 - 热情表演者、感染力强、享受当下、缺乏长远规划'
};

function getCoreTraits(type) {
  return personalityTraits[type] || '独特人格组合';
}

function buildAnalysisPrompt(history, dimension, tendencySum) {
  const dimInfo = dimensionNames[dimension];
  const plus2 = history.filter(h => h.tendencyScore === 2).length;
  const plus1 = history.filter(h => h.tendencyScore === 1).length;
  const zero = history.filter(h => h.tendencyScore === 0).length;
  const minus1 = history.filter(h => h.tendencyScore === -1).length;
  const minus2 = history.filter(h => h.tendencyScore === -2).length;

  return `分析用户在${dimInfo.firstLabel}/${dimInfo.secondLabel}维度的回答模式，推荐下一题难度。

当前统计：
- 强倾向${dimInfo.firstLabel}：${plus2}题
- 中等倾向${dimInfo.firstLabel}：${plus1}题
- 中立：${zero}题
- 中等倾向${dimInfo.secondLabel}：${minus1}题
- 强倾向${dimInfo.secondLabel}：${minus2}题
- 累计分数：${tendencySum}

请返回JSON：{"consistency":一致性百分比,"nextDifficulty":"easy/medium/hard","nextTopic":"建议主题","reason":"简短理由"}`;
}

function buildFinalPrompt(history, questionsPerDimension) {
  const dimensions = getDimensions();
  const dimensionStats = {};

  for (const dim of dimensions) {
    const dimHistory = history.filter(h => h.dimension === dim);
    const totalQuestions = questionsPerDimension[dim] || 15;
    const plus2 = dimHistory.filter(h => h.tendencyScore === 2).length;
    const plus1 = dimHistory.filter(h => h.tendencyScore === 1).length;
    const zero = dimHistory.filter(h => h.tendencyScore === 0).length;
    const minus1 = dimHistory.filter(h => h.tendencyScore === -1).length;
    const minus2 = dimHistory.filter(h => h.tendencyScore === -2).length;
    const sum = 2 * plus2 + 1 * plus1 - 1 * minus1 - 2 * minus2;

    let tendency;
    if (sum > 0) tendency = dimensionNames[dim].first;
    else if (sum < 0) tendency = dimensionNames[dim].second;
    else {
      const firstTendencyCount = plus2 + plus1;
      const secondTendencyCount = minus2 + minus1;
      tendency = firstTendencyCount >= secondTendencyCount ? dimensionNames[dim].first : dimensionNames[dim].second;
    }

    const maxPossibleScore = totalQuestions * 2;
    let percentage = sum === 0 ? 50 : Math.round(50 + (Math.abs(sum) / maxPossibleScore) * 50);
    percentage = Math.max(50, Math.min(100, percentage));

    dimensionStats[dim] = { totalQuestions, sum, tendency, percentage };
  }

  const finalType = dimensions.map(dim => dimensionStats[dim].tendency).join('');

  return `基于用户测试结果，确定人格类型。

维度统计：${JSON.stringify(dimensionStats)}
最终类型：${finalType}

返回JSON：{"EI":{"score":${dimensionStats.EI.percentage},"tendency":"${dimensionStats.EI.tendency}"},"SN":{"score":${dimensionStats.SN.percentage},"tendency":"${dimensionStats.SN.tendency}"},"TF":{"score":${dimensionStats.TF.percentage},"tendency":"${dimensionStats.TF.tendency}"},"JP":{"score":${dimensionStats.JP.percentage},"tendency":"${dimensionStats.JP.tendency}"},"finalType":"${finalType}","confidence":85,"description":"性格特征简述"}`;
}

function buildDeepAnalysisPrompt(personality) {
  const type = personality.finalType;
  const typeNames = {
    'INTJ': '建筑师', 'INTP': '逻辑学家', 'ENTJ': '指挥官', 'ENTP': '辩论家',
    'INFJ': '提倡者', 'INFP': '调停者', 'ENFJ': '主人公', 'ENFP': '竞选者',
    'ISTJ': '物流师', 'ISFJ': '守卫者', 'ESTJ': '总经理', 'ESFJ': '执政官',
    'ISTP': '鉴赏家', 'ISFP': '探险家', 'ESTP': '企业家', 'ESFP': '表演者'
  };

  return `你是MBTI人格深度分析专家，为${type}类型用户生成详细分析报告。

## 用户信息
- 人格类型：${type}（${typeNames[type] || ''}型）
- 维度强度：${personality.EI.tendency}${personality.EI.score}%、${personality.SN.tendency}${personality.SN.score}%、${personality.TF.tendency}${personality.TF.score}%、${personality.JP.tendency}${personality.JP.score}%

## 核心特质
${getCoreTraits(type)}

## 请生成以下内容

### 1. 成长路径（三阶段）
- 18-25岁：核心任务、具体建议（3条）、潜在挑战
- 26-35岁：核心任务、具体建议（3条）、潜在挑战
- 36-45岁：核心任务、具体建议（3条）、潜在挑战

### 2. 职业匹配
- 高匹配职业（2个，匹配度>85%）：职业名、匹配度、理由
- 中匹配职业（1个，匹配度60-80%）：职业名、匹配度、注意事项

### 3. 社交建议
- 优势（2条）
- 挑战（2条）
- 技巧（2条）

### 4. 名人匹配（3位）
- 必须是${type}类型的名人
- 至少1位中国名人
- 包含：姓名、职业、匹配度、相似特质（3个）、差异点、名言

## 输出格式
严格返回以下JSON格式：
{
  "growthPath": {
    "stages": [
      {"ageRange": "18-25岁", "coreTask": "任务", "actionAdvice": ["建议1", "建议2", "建议3"], "challenges": ["挑战1", "挑战2"], "strengthGuidance": "倾向强度影响分析"},
      {"ageRange": "26-35岁", "coreTask": "任务", "actionAdvice": ["建议1", "建议2", "建议3"], "challenges": ["挑战1", "挑战2"], "strengthGuidance": "倾向强度影响分析"},
      {"ageRange": "36-45岁", "coreTask": "任务", "actionAdvice": ["建议1", "建议2", "建议3"], "challenges": ["挑战1", "挑战2"], "strengthGuidance": "倾向强度影响分析"}
    ]
  },
  "careerAnalysis": {
    "topMatches": [{"career": "职业", "matchScore": 90, "reason": "理由"}, {"career": "职业", "matchScore": 88, "reason": "理由"}],
    "mediumMatch": {"career": "职业", "matchScore": 75, "caution": "注意事项"}
  },
  "socialAdvice": {
    "strengths": ["优势1", "优势2"],
    "challenges": ["挑战1", "挑战2"],
    "tips": ["技巧1", "技巧2"]
  },
  "celebrityMatches": [
    {"name": "名人名", "profession": "职业", "matchScore": 90, "similarTraits": ["特质1", "特质2", "特质3"], "difference": "差异点", "quote": "名言"},
    {"name": "名人名", "profession": "职业", "matchScore": 88, "similarTraits": ["特质1", "特质2", "特质3"], "difference": "差异点", "quote": "名言"},
    {"name": "名人名", "profession": "职业", "matchScore": 85, "similarTraits": ["特质1", "特质2", "特质3"], "difference": "差异点", "quote": "名言"}
  ]
}`;
}

// ==================== Workers Session存储 ====================
// 使用KV存储替代内存存储（Workers限制）
// 暂时使用内存存储测试，后续可迁移到KV

let sessions = {};

// ==================== API配置 ====================
const API_CONFIGS = {
  zhipu: {
    name: '智谱AI (GLM)',
    url: 'https://open.bigmodel.cn/api/paas/v4/chat/completions',
    model: 'glm-4-flash'
  }
};

async function callAI(apiKey, prompt, maxTokens = 300) {
  const response = await fetch(API_CONFIGS.zhipu.url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: API_CONFIGS.zhipu.model,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
      max_tokens: maxTokens
    })
  });

  if (!response.ok) {
    throw new Error(`API调用失败: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

function parseAIJSON(text) {
  let cleaned = text.trim();
  if (cleaned.startsWith('```json')) cleaned = cleaned.slice(7);
  if (cleaned.startsWith('```')) cleaned = cleaned.slice(3);
  if (cleaned.endsWith('```')) cleaned = cleaned.slice(0, -3);
  cleaned = cleaned.trim();

  try {
    return JSON.parse(cleaned);
  } catch (e) {
    // 尝试修复不完整JSON
    let lastValidEnd = -1;
    for (let i = cleaned.length - 1; i >= 0; i--) {
      if (cleaned[i] === '}' || cleaned[i] === ']') {
        lastValidEnd = i;
        break;
      }
    }
    if (lastValidEnd > 0) {
      let truncated = cleaned.substring(0, lastValidEnd + 1);
      const openBraces = (truncated.match(/{/g) || []).length;
      let closeBraces = (truncated.match(/}/g) || []).length;
      const openArrays = (truncated.match(/\[/g) || []).length;
      let closeArrays = (truncated.match(/\]/g) || []).length;
      while (closeBraces < openBraces) { truncated += '}'; closeBraces++; }
      while (closeArrays < openArrays) { truncated += ']'; closeArrays++; }
      return JSON.parse(truncated);
    }
    throw new Error('JSON解析失败');
  }
}

function selectRandomDimension(history, questionsPerDimension, dimensions) {
  const completedCounts = {};
  for (const dim of dimensions) {
    completedCounts[dim] = history.filter(h => h.dimension === dim).length;
  }
  const incompleteDimensions = dimensions.filter(dim => {
    const targetCount = questionsPerDimension[dim] || 15;
    return completedCounts[dim] < targetCount;
  });
  if (incompleteDimensions.length === 0) return null;
  return incompleteDimensions[Math.floor(Math.random() * incompleteDimensions.length)];
}

// ==================== Workers Fetch Handler ====================
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json'
    };

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // API路由
    try {
      // GET /api/apis - 获取API列表
      if (path === '/api/apis' && request.method === 'GET') {
        return new Response(JSON.stringify([{ id: 'zhipu', name: '智谱AI (GLM)' }]), { headers: corsHeaders });
      }

      // GET /api/versions - 获取版本列表
      if (path === '/api/versions' && request.method === 'GET') {
        return new Response(JSON.stringify(getAllVersions()), { headers: corsHeaders });
      }

      // POST /api/start - 开始测试
      if (path === '/api/start' && request.method === 'POST') {
        const body = await request.json();
        const version = body.version || 'standard';
        const versionInfo = getVersionInfo(version);

        if (!versionInfo) {
          return new Response(JSON.stringify({ error: '无效的版本' }), { headers: corsHeaders });
        }

        const sessionId = Date.now().toString();
        const dimensions = getDimensions();
        const questionsPerDimension = versionInfo.questionsPerDimension;

        const firstDimension = selectRandomDimension([], questionsPerDimension, dimensions);
        const firstQuestion = getQuestion(firstDimension, 'medium');

        sessions[sessionId] = {
          history: [],
          currentDimension: firstDimension,
          usedQuestionIds: [],
          currentQuestion: firstQuestion,
          version,
          versionInfo,
          questionsPerDimension,
          totalQuestions: versionInfo.totalQuestions,
          aiCallInterval: versionInfo.aiCallInterval
        };

        return new Response(JSON.stringify({
          sessionId,
          version: versionInfo,
          dimension: firstDimension,
          question: firstQuestion,
          progress: { current: 1, total: versionInfo.totalQuestions }
        }), { headers: corsHeaders });
      }

      // POST /api/answer - 提交答案
      if (path === '/api/answer' && request.method === 'POST') {
        const body = await request.json();
        const { sessionId, choiceIndex, choiceText } = body;
        const session = sessions[sessionId];

        if (!session) {
          return new Response(JSON.stringify({ error: '会话不存在' }), { headers: corsHeaders });
        }

        const tendencyScore = 2 - choiceIndex;

        session.history.push({
          question: session.currentQuestion.text,
          choice: choiceText,
          choiceIndex,
          tendencyScore,
          dimension: session.currentDimension,
          questionId: session.currentQuestion.id,
          difficulty: session.currentQuestion.difficulty || 'medium'
        });
        session.usedQuestionIds.push(session.currentQuestion.id);

        const answersInDimension = session.history.filter(h => h.dimension === session.currentDimension);
        const answersCount = answersInDimension.length;
        const dimensionTendencySum = answersInDimension.reduce((sum, h) => sum + h.tendencyScore, 0);
        const totalAnswersCount = session.history.length;

        let aiRecommendation = null;

        // AI分析（每aiCallInterval题）
        if (totalAnswersCount > 0 && totalAnswersCount % session.aiCallInterval === 0) {
          try {
            const apiKey = env.ZHIPU_API_KEY;
            const prompt = buildAnalysisPrompt(answersInDimension, session.currentDimension, dimensionTendencySum);
            const aiResponse = await callAI(apiKey, prompt);
            aiRecommendation = parseAIJSON(aiResponse);
          } catch (error) {
            aiRecommendation = { nextDifficulty: 'medium', nextTopic: '继续当前维度' };
          }
        }

        // 检查维度是否完成
        const currentDimensionQuestions = session.questionsPerDimension[session.currentDimension] || 15;
        const dimensions = getDimensions();
        const allDimensionsCompleted = dimensions.every(dim => {
          const count = session.history.filter(h => h.dimension === dim).length;
          return count >= session.questionsPerDimension[dim];
        });

        if (allDimensionsCompleted) {
          try {
            const apiKey = env.ZHIPU_API_KEY;
            const finalPrompt = buildFinalPrompt(session.history, session.questionsPerDimension);
            const finalResult = await callAI(apiKey, finalPrompt, 500);
            const personality = parseAIJSON(finalResult);

            return new Response(JSON.stringify({
              completed: true,
              personality,
              history: session.history,
              version: session.versionInfo,
              sessionId
            }), { headers: corsHeaders });
          } catch (error) {
            return new Response(JSON.stringify({ error: '分析失败' }), { headers: corsHeaders });
          }
        }

        // 获取下一题
        const difficulty = aiRecommendation?.nextDifficulty || 'medium';
        const nextDimension = selectRandomDimension(session.history, session.questionsPerDimension, dimensions);

        if (!nextDimension) {
          // 所有维度完成
          try {
            const apiKey = env.ZHIPU_API_KEY;
            const finalPrompt = buildFinalPrompt(session.history, session.questionsPerDimension);
            const finalResult = await callAI(apiKey, finalPrompt, 500);
            const personality = parseAIJSON(finalResult);

            return new Response(JSON.stringify({
              completed: true,
              personality,
              history: session.history,
              version: session.versionInfo,
              sessionId
            }), { headers: corsHeaders });
          } catch (error) {
            return new Response(JSON.stringify({ error: '分析失败' }), { headers: corsHeaders });
          }
        }

        session.currentDimension = nextDimension;
        const nextQuestion = getQuestion(nextDimension, difficulty, session.usedQuestionIds);

        if (!nextQuestion) {
          const fallbackQuestion = getQuestion(nextDimension, 'medium', session.usedQuestionIds);
          session.currentQuestion = fallbackQuestion;
        } else {
          session.currentQuestion = nextQuestion;
        }

        return new Response(JSON.stringify({
          dimension: session.currentDimension,
          question: session.currentQuestion,
          aiRecommendation,
          progress: { current: totalAnswersCount + 1, total: session.totalQuestions }
        }), { headers: corsHeaders });
      }

      // POST /api/deep-analysis - 深度分析（不需要session验证）
      if (path === '/api/deep-analysis' && request.method === 'POST') {
        const body = await request.json();
        const { personality } = body;

        if (!personality) {
          return new Response(JSON.stringify({ success: false, error: '缺少人格数据' }), { headers: corsHeaders });
        }

        try {
          const apiKey = env.ZHIPU_API_KEY;

          if (!apiKey) {
            return new Response(JSON.stringify({ success: false, error: 'API密钥未配置' }), { headers: corsHeaders });
          }

          const deepPrompt = buildDeepAnalysisPrompt(personality);
          const deepResult = await callAI(apiKey, deepPrompt, 4000);
          const deepAnalysis = parseAIJSON(deepResult);

          return new Response(JSON.stringify({ success: true, deepAnalysis }), { headers: corsHeaders });
        } catch (error) {
          return new Response(JSON.stringify({ success: false, error: error.message }), { headers: corsHeaders });
        }
      }

      // 默认响应
      return new Response(JSON.stringify({ error: '未知路由' }), { headers: corsHeaders, status: 404 });

    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), { headers: corsHeaders, status: 500 });
    }
  }
};