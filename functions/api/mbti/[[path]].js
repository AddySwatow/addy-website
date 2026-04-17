// ============================================
// MBTI 测试 API - Pages Functions 版本（客户端存储模式）
// 不依赖session，每次请求携带完整历史数据
// ============================================

// ==================== 题库数据（每维度65题：easy25+medium25+hard15） ====================
const questions = {
  EI: {
    easy: [
      // 原有10题 + 新增15题
      { id: 'EI-e1', text: '周末休息时，你更愿意和朋友出去玩还是在家享受独处时光？', options: ['和朋友出去', '稍微倾向出去', '不确定', '稍微倾向在家', '在家独处'] },
      { id: 'EI-e2', text: '在社交场合，你会主动和陌生人交谈还是保持安静？', options: ['主动交谈', '稍微主动', '不确定', '稍微安静', '保持安静'] },
      { id: 'EI-e3', text: '你更喜欢热闹嘈杂的环境还是安静平和的环境？', options: ['热闹环境', '稍微热闹', '不确定', '稍微安静', '安静环境'] },
      { id: 'EI-e4', text: '当手机响起时，你会立即接听还是犹豫一下？', options: ['立即接听', '稍微倾向立即', '不确定', '稍微犹豫', '犹豫一下'] },
      { id: 'EI-e5', text: '你更喜欢通过电话沟通还是文字消息？', options: ['电话沟通', '稍微倾向电话', '不确定', '稍微倾向文字', '文字消息'] },
      { id: 'EI-e6', text: '参加完一场大型聚会后，你通常感觉如何？', options: ['精力充沛，迫不及待想参加下一场', '有点累但很开心', '还好，需要休息一下', '比较疲惫，想静静', '精疲力竭，需要独处恢复'] },
      { id: 'EI-e7', text: '如果可以选择，你更倾向于用哪种方式和朋友聊天？', options: ['直接打电话或视频', '语音消息', '都可以', '文字消息', '更愿意面对面文字沟通'] },
      { id: 'EI-e8', text: '在一场派对中，你更可能：', options: ['主动认识新朋友，活跃气氛', '和几个人愉快聊天', '随缘，顺其自然', '待在熟悉的圈子里', '找个安静的角落待着'] },
      { id: 'EI-e9', text: '你更喜欢哪种工作环境？', options: ['开放式办公室，随时可以交流', '偶尔有交流的开放空间', '混合环境', '半封闭的小组空间', '独立的办公室或在家办公'] },
      { id: 'EI-e10', text: '周末有人约你出去，但你在休息，你会：', options: ['立刻答应，休息时也想出去玩', '考虑一下，可能会去', '看心情决定', '可能会婉拒', '果断拒绝，想待在家'] },
      // 新增easy题目 e11-e25
      { id: 'EI-e11', text: '朋友突然来访，你会感到开心还是有些被打扰？', options: ['非常开心，热烈欢迎', '挺开心的', '无所谓', '有点被打扰', '希望他们能提前预约'] },
      { id: 'EI-e12', text: '在餐厅用餐时，你更喜欢和很多人一起还是独自用餐？', options: ['和很多人一起热闹', '几个人一起', '都可以', '一个人也还行', '更喜欢独自安静用餐'] },
      { id: 'EI-e13', text: '你在社交活动中通常是什么角色？', options: ['组织者，负责安排活动', '积极参与者', '看情况', '参与者但不太主动', '旁观者，安静参与'] },
      { id: 'EI-e14', text: '接到陌生电话推销，你通常会？', options: ['有兴趣听对方介绍', '听一会儿再决定', '看情况', '礼貌打断', '直接挂断'] },
      { id: 'EI-e15', text: '你更喜欢哪种休闲方式？', options: ['和朋友出去逛街、聚餐', '参加社交活动', '看情况', '在家看剧、玩游戏', '独自读书、冥想'] },
      { id: 'EI-e16', text: '在社交媒体上，你更倾向于？', options: ['经常发动态，分享生活', '偶尔发一些', '看情况', '主要浏览别人的动态', '很少使用社交媒体'] },
      { id: 'EI-e17', text: '团队聚餐时，你通常会？', options: ['主动提议去哪吃', '积极参与讨论', '都可以', '跟随大多数人的决定', '希望早点结束回家'] },
      { id: 'EI-e18', text: '你更喜欢哪种交流方式？', options: ['面对面聊天', '视频通话', '都可以', '语音消息', '文字消息'] },
      { id: 'EI-e19', text: '在电梯里遇到同事，你会？', options: ['主动打招呼并聊天', '打招呼并简单聊几句', '打招呼', '点头示意', '默默等待电梯到达'] },
      { id: 'EI-e20', text: '参加培训或讲座时，你更倾向？', options: ['主动提问和互动', '适当参与讨论', '看情况', '认真听但不发言', '只想安静听完内容'] },
      { id: 'EI-e21', text: '你更愿意参加哪种活动？', options: ['大型聚会或派对', '中等规模的活动', '都可以', '小型聚会', '一对一的活动'] },
      { id: 'EI-e22', text: '收到群聊消息，你通常会？', options: ['积极参与讨论', '偶尔发言', '看情况', '只看不发', '很少关注群聊'] },
      { id: 'EI-e23', text: '朋友邀请你当活动主持人，你会？', options: ['欣然接受，很乐意', '考虑接受', '看情况', '有些犹豫', '婉拒，不喜欢当焦点'] },
      { id: 'EI-e24', text: '你更喜欢和哪种人相处？', options: ['活泼外向的人', '性格开朗的人', '都可以', '温和安静的人', '内向深沉的人'] },
      { id: 'EI-e25', text: '假期你更倾向？', options: ['和朋友出去旅行', '和家人一起活动', '看情况', '在家休息但偶尔出门', '独自在家放松'] }
    ],
    medium: [
      // 原有10题 + 新增15题
      { id: 'EI-m1', text: '参加聚会后，你通常会感到精力充沛还是疲惫需要休息？', options: ['精力充沛', '稍微充沛', '不确定', '稍微疲惫', '疲惫需要休息'] },
      { id: 'EI-m2', text: '当需要向他人表达想法时，你更习惯当面说出来还是写下来发送？', options: ['当面说出来', '稍微倾向当面', '不确定', '稍微倾向写下来', '写下来发送'] },
      { id: 'EI-m3', text: '你倾向于拥有少数几个深度好友还是广泛的社交圈？', options: ['广泛社交圈', '稍微倾向广泛', '不确定', '稍微倾向深度好友', '少数深度好友'] },
      { id: 'EI-m4', text: '在团队讨论中，你更愿意公开发言还是私下提出建议？', options: ['公开发言', '稍微倾向公开', '不确定', '稍微倾向私下', '私下提出'] },
      { id: 'EI-m5', text: '当你获得好消息时，你会第一时间分享给很多人还是只告诉重要的人？', options: ['分享给很多人', '分享给一些人', '不确定', '只告诉几个人', '只告诉重要的人'] },
      { id: 'EI-m6', text: '当团队出现分歧时，你倾向于：', options: ['主动调解，让大家把话说开', '鼓励大家沟通', '看情况处理', '先观察事态发展', '等待别人来解决'] },
      { id: 'EI-m7', text: '学习新技能时，你更偏好：', options: ['参加培训班，和同学一起学', '找学习伙伴一起', '都可以', '看视频教程自学', '安静地看书或资料自学'] },
      { id: 'EI-m8', text: '需要做重要决定时，你通常：', options: ['和很多人讨论，听取意见', '找几个人商量', '适当参考意见', '只和亲近的人商量', '自己安静思考决定'] },
      { id: 'EI-m9', text: '面对压力时，你更可能：', options: ['找朋友倾诉、出去活动', '和信任的人聊聊', '看情况', '自己找点事做转移注意力', '独自消化、安静休息'] },
      { id: 'EI-m10', text: '在团队项目中，你更擅长：', options: ['协调沟通、推动进度', '积极参与讨论', '各有所长', '专注自己的任务', '独立完成分配的部分'] },
      // 新增medium题目 m11-m25
      { id: 'EI-m11', text: '在社交场合，你更容易成为话题引导者还是倾听者？', options: ['话题引导者', '偶尔引导话题', '看情况', '主要倾听', '安静的倾听者'] },
      { id: 'EI-m12', text: '对于社交邀请，你通常的态度是？', options: ['总是乐于接受', '多数情况下接受', '看情况', '有些挑剔', '经常婉拒'] },
      { id: 'EI-m13', text: '你更倾向于哪种社交节奏？', options: ['频繁社交，每周多次', '适度社交，每周一两次', '看情况', '偶尔社交', '很少主动社交'] },
      { id: 'EI-m14', text: '在网络社区或论坛，你更倾向于？', options: ['经常发帖和评论', '偶尔参与讨论', '看情况', '主要浏览', '很少参与互动'] },
      { id: 'EI-m15', text: '当你有想法要表达时，你更倾向于？', options: ['立即说出来，不加犹豫', '想好要点就说出来', '看情况', '整理好思路再说', '反复思考后再表达'] },
      { id: 'EI-m16', text: '在陌生环境中，你会？', options: ['主动探索，结识新朋友', '积极适应新环境', '看情况', '观察一段时间再行动', '保持谨慎，慢慢适应'] },
      { id: 'EI-m17', text: '你更喜欢哪种类型的聚会？', options: ['热闹的大型派对', '中等规模的聚会', '都可以', '小型朋友聚会', '一对一深度交流'] },
      { id: 'EI-m18', text: '当有人主动和你搭话，你通常反应是？', options: ['热情回应并展开话题', '友好回应', '看情况', '礼貌回应', '简短回应后结束对话'] },
      { id: 'EI-m19', text: '你更倾向于从哪里获得能量？', options: ['与人互动和社交活动', '适度的社交', '两者都可以', '独自思考和阅读', '独处和安静的环境'] },
      { id: 'EI-m20', text: '在团队合作中，你更看重？', options: ['团队氛围和沟通效率', '保持良好沟通', '看情况', '各自完成任务', '专注个人工作不受干扰'] },
      { id: 'EI-m21', text: '你更喜欢的周末安排是？', options: ['多个社交活动排满', '一两场社交活动', '看情况', '安静在家偶尔出门', '完全独自放松'] },
      { id: 'EI-m22', text: '当你独自一段时间后，你会？', options: ['渴望和人交流', '觉得可以出去走走', '看情况', '还挺享受独处', '很享受独处时光'] },
      { id: 'EI-m23', text: '在需要表达的场合（如演讲、汇报），你更倾向于？', options: ['很享受表达的机会', '比较愿意表达', '看情况', '有些紧张但能完成', '尽量避免或简短表达'] },
      { id: 'EI-m24', text: '对于朋友的关系维护，你更倾向于？', options: ['主动联系，经常见面', '定期保持联系', '看情况', '偶尔联系', '等待对方主动联系'] },
      { id: 'EI-m25', text: '你更倾向于把时间花在？', options: ['社交和人际交往上', '适度的社交', '两者平衡', '个人兴趣和爱好上', '内心世界和思考上'] }
    ],
    hard: [
      // 原有5题 + 新增10题
      { id: 'EI-h1', text: '当你面临困难时，你倾向于寻求他人支持还是独自想办法解决？', options: ['寻求他人支持', '稍微倾向寻求', '不确定', '稍微倾向独自', '独自解决'] },
      { id: 'EI-h2', text: '你认为深入的一对一交流比群体讨论更有意义吗？', options: ['群体讨论更有意义', '稍微倾向群体', '不确定', '稍微倾向一对一', '一对一更有意义'] },
      { id: 'EI-h3', text: '在需要长时间专注工作时，你能忍受周围有人还是需要绝对安静？', options: ['能忍受周围有人', '稍微能忍受', '不确定', '稍微需要安静', '需要绝对安静'] },
      { id: 'EI-h4', text: '当有人问你怎么看某件事，你会立即说出看法还是需要时间思考后再说？', options: ['立即说出看法', '稍微倾向立即', '不确定', '稍微倾向思考后', '需要思考后'] },
      { id: 'EI-h5', text: '你更看重外部认可（他人赞赏）还是内心满足（自我认可）？', options: ['外部认可更重要', '稍微倾向外部', '不确定', '稍微倾向内心', '内心满足更重要'] },
      // 新增hard题目 h6-h15
      { id: 'EI-h6', text: '你认为自己是需要外界刺激才能感到充实，还是能在内心世界中找到满足？', options: ['需要外界刺激', '稍微倾向外界', '不确定', '稍微倾向内心', '内心世界足够满足'] },
      { id: 'EI-h7', text: '在社交互动中，你倾向于主动创造话题还是等待话题自然发生？', options: ['主动创造话题', '稍微倾向主动', '不确定', '稍微倾向等待', '等待话题自然发生'] },
      { id: 'EI-h8', text: '你更倾向于在群体中获得认同感还是在独处中获得自在感？', options: ['群体认同感', '稍微倾向群体', '不确定', '稍微倾向独处', '独处自在感'] },
      { id: 'EI-h9', text: '面对社交冲突，你会主动介入调解还是倾向于回避？', options: ['主动介入调解', '稍微倾向介入', '不确定', '稍微倾向回避', '回避社交冲突'] },
      { id: 'EI-h10', text: '你认为自己的价值感更多地来源于？', options: ['外界的反馈和认可', '两者都有', '不确定', '稍微倾向自我认知', '内心的自我认知'] },
      { id: 'EI-h11', text: '在需要独自完成的任务和需要协作的任务之间，你更倾向？', options: ['需要协作的任务', '稍微倾向协作', '不确定', '稍微倾向独自', '独自完成的任务'] },
      { id: 'EI-h12', text: '当周围有人时，你的思维清晰度是？', options: ['有人时思维更活跃', '稍微倾向有人', '不确定', '稍微倾向独处', '独处时思维更清晰'] },
      { id: 'EI-h13', text: '你更倾向于把内心想法表达出来还是保持私密？', options: ['倾向于表达出来', '稍微倾向表达', '不确定', '稍微倾向私密', '保持私密'] },
      { id: 'EI-h14', text: '在人际交往中，你更注重广度还是深度？', options: ['注重广度，认识更多人', '稍微倾向广度', '不确定', '稍微倾向深度', '注重深度，深入了解'] },
      { id: 'EI-h15', text: '当你独自面对问题时，你会？', options: ['很快就会想找人交流', '有时候会想找人', '看情况', '大部分时候独自处理', '完全独自解决，不需要他人'] }
    ]
  },
  SN: {
    easy: [
      // 原有10题 + 新增15题
      { id: 'SN-e1', text: '你更关注眼前正在发生的事还是想象未来的可能性？', options: ['想象未来', '稍微倾向未来', '不确定', '稍微倾向眼前', '眼前的事'] },
      { id: 'SN-e2', text: '阅读时，你更喜欢具体的故事情节还是抽象的思想探讨？', options: ['抽象思想', '稍微倾向抽象', '不确定', '稍微倾向具体', '具体故事'] },
      { id: 'SN-e3', text: '你更容易记住具体的事实细节还是大致的概念框架？', options: ['大致概念', '稍微倾向概念', '不确定', '稍微倾向细节', '具体细节'] },
      { id: 'SN-e4', text: '描述一件事时，你会用很多具体例子还是用概括性语言？', options: ['概括性语言', '稍微倾向概括', '不确定', '稍微倾向具体例子', '具体例子'] },
      { id: 'SN-e5', text: '你更信任直接经验还是灵感直觉？', options: ['灵感直觉', '稍微倾向直觉', '不确定', '稍微倾向经验', '直接经验'] },
      { id: 'SN-e6', text: '阅读说明书时，你的习惯是？', options: ['大概看看结构就行', '快速浏览重点', '看情况', '仔细阅读关键部分', '逐字逐句认真看'] },
      { id: 'SN-e7', text: '别人给你指路时，你更希望对方怎么描述？', options: ['说个大概方向，我自己探索', '说主要标志物', '都可以', '说清楚主要路口', '详细说每一步怎么走'] },
      { id: 'SN-e8', text: '你更喜欢哪种类型的书籍？', options: ['科幻/哲学类', '推理/探索类', '都看', '生活/实用类', '工具书/教程类'] },
      { id: 'SN-e9', text: '做计划时，你通常关注的是？', options: ['长远愿景和大方向', '中期目标和阶段', '看情况', '近期的关键节点', '具体的每日行程'] },
      { id: 'SN-e10', text: '学习新技能时，你更倾向于？', options: ['先理解原理和底层逻辑', '边用边学', '看情况', '看教程了解基本操作', '跟着步骤一步步学'] },
      // 新增easy题目 e11-e25
      { id: 'SN-e11', text: '你更喜欢关注新奇事物还是熟悉的事物？', options: ['新奇事物', '稍微倾向新奇', '不确定', '稍微倾向熟悉', '熟悉的事物'] },
      { id: 'SN-e12', text: '看电影时，你更在意情节创意还是画面细节？', options: ['情节创意和隐喻', '创意和细节都看', '不确定', '画面细节和效果', '画面细节'] },
      { id: 'SN-e13', text: '你更容易被抽象概念还是具体案例打动？', options: ['抽象概念', '稍微倾向概念', '不确定', '稍微倾向案例', '具体案例'] },
      { id: 'SN-e14', text: '你更喜欢探索未知领域还是深耕已知领域？', options: ['探索未知领域', '稍微倾向探索', '不确定', '稍微倾向深耕', '深耕已知领域'] },
      { id: 'SN-e15', text: '对于问题，你更关注背后的原因还是表面的现象？', options: ['背后的原因', '稍微倾向原因', '不确定', '稍微倾向现象', '表面的现象'] },
      { id: 'SN-e16', text: '你更喜欢听概念讲解还是实操演示？', options: ['概念讲解', '稍微倾向概念', '不确定', '稍微倾向实操', '实操演示'] },
      { id: 'SN-e17', text: '做决策时，你更依赖直觉预感还是事实数据？', options: ['直觉预感', '稍微倾向直觉', '不确定', '稍微倾向数据', '事实数据'] },
      { id: 'SN-e18', text: '你更感兴趣的是理论探讨还是实际应用？', options: ['理论探讨', '稍微倾向理论', '不确定', '稍微倾向应用', '实际应用'] },
      { id: 'SN-e19', text: '你更容易发现事物之间的联系还是事物的具体特征？', options: ['事物之间的联系', '稍微倾向联系', '不确定', '稍微倾向特征', '事物的具体特征'] },
      { id: 'SN-e20', text: '你喜欢思考"为什么"还是"怎么做"？', options: ['为什么', '稍微倾向为什么', '不确定', '稍微倾向怎么做', '怎么做'] },
      { id: 'SN-e21', text: '你更喜欢宏观视角还是微观视角？', options: ['宏观视角', '稍微倾向宏观', '不确定', '稍微倾向微观', '微观视角'] },
      { id: 'SN-e22', text: '面对信息，你更倾向于建立关联还是分类整理？', options: ['建立关联', '稍微倾向关联', '不确定', '稍微倾向分类', '分类整理'] },
      { id: 'SN-e23', text: '你更喜欢想象可能的场景还是回忆过去的经历？', options: ['想象可能场景', '稍微倾向想象', '不确定', '稍微倾向回忆', '回忆过去经历'] },
      { id: 'SN-e24', text: '你更看重创意表达还是精准描述？', options: ['创意表达', '稍微倾向创意', '不确定', '稍微倾向精准', '精准描述'] },
      { id: 'SN-e25', text: '你更容易看到大局还是注意到细节？', options: ['看到大局', '稍微倾向大局', '不确定', '稍微倾向细节', '注意到细节'] }
    ],
    medium: [
      // 原有10题 + 新增15题
      { id: 'SN-m1', text: '解决问题时，你更喜欢尝试新方法还是沿用已验证的方案？', options: ['尝试新方法', '稍微倾向新方法', '不确定', '稍微倾向已有方案', '沿用已验证方案'] },
      { id: 'SN-m2', text: '你更容易被理论创新还是实用改进所吸引？', options: ['理论创新', '稍微倾向理论', '不确定', '稍微倾向实用', '实用改进'] },
      { id: 'SN-m3', text: '你更看重概念的准确性还是实际的可操作性？', options: ['概念准确性', '稍微倾向概念', '不确定', '稍微倾向实操', '实际可操作性'] },
      { id: 'SN-m4', text: '对于未来，你更关注可能性还是现实性？', options: ['可能性', '稍微倾向可能', '不确定', '稍微倾向现实', '现实性'] },
      { id: 'SN-m5', text: '你更喜欢思考抽象问题还是处理具体事务？', options: ['抽象问题', '稍微倾向抽象', '不确定', '稍微倾向具体', '具体事务'] },
      { id: 'SN-m6', text: '面对一个新项目，你更可能先：', options: ['构思整体框架和愿景', '规划关键步骤', '看情况', '列出具体待办事项', '立即开始动手'] },
      { id: 'SN-m7', text: '你更相信灵感还是数据？', options: ['灵感', '稍微倾向灵感', '不确定', '稍微倾向数据', '数据'] },
      { id: 'SN-m8', text: '你更喜欢哪种类型的讨论？', options: ['探讨理念和创新', '分享见解', '都可以', '分析具体案例', '讨论具体执行方案'] },
      { id: 'SN-m9', text: '当你学习新知识时，你更倾向于：', options: ['先理解大概念再学细节', '边学边理解', '看情况', '从细节开始逐步理解', '先掌握具体知识点'] },
      { id: 'SN-m10', text: '你对哪种描述更有共鸣？', options: ['想象力比知识更重要', '创意驱动进步', '两者都重要', '细节决定成败', '实践出真知'] },
      // 新增medium题目 m11-m25
      { id: 'SN-m11', text: '你更倾向于寻找规律还是收集事实？', options: ['寻找规律', '稍微倾向规律', '不确定', '稍微倾向事实', '收集事实'] },
      { id: 'SN-m12', text: '在分析问题时，你更关注系统性还是具体性？', options: ['系统性', '稍微倾向系统', '不确定', '稍微倾向具体', '具体性'] },
      { id: 'SN-m13', text: '你更喜欢探索未知可能性还是确认已知事实？', options: ['探索未知可能性', '稍微倾向探索', '不确定', '稍微倾向确认', '确认已知事实'] },
      { id: 'SN-m14', text: '面对复杂问题，你会先建立框架还是收集资料？', options: ['先建立框架', '稍微倾向框架', '不确定', '稍微倾向资料', '先收集资料'] },
      { id: 'SN-m15', text: '你更看重预见性还是经验性？', options: ['预见性', '稍微倾向预见', '不确定', '稍微倾向经验', '经验性'] },
      { id: 'SN-m16', text: '你更容易从整体理解还是从局部理解？', options: ['从整体理解', '稍微倾向整体', '不确定', '稍微倾向局部', '从局部理解'] },
      { id: 'SN-m17', text: '你更倾向于演绎推理还是归纳总结？', options: ['演绎推理', '稍微倾向演绎', '不确定', '稍微倾向归纳', '归纳总结'] },
      { id: 'SN-m18', text: '你更喜欢开放的讨论还是基于事实的分析？', options: ['开放的讨论', '稍微倾向开放', '不确定', '稍微倾向事实', '基于事实的分析'] },
      { id: 'SN-m19', text: '你更倾向于联想思考还是线性思考？', options: ['联想思考', '稍微倾向联想', '不确定', '稍微倾向线性', '线性思考'] },
      { id: 'SN-m20', text: '你更看重洞察力还是执行力？', options: ['洞察力', '稍微倾向洞察', '不确定', '稍微倾向执行', '执行力'] },
      { id: 'SN-m21', text: '你更容易发现潜在机会还是现有问题？', options: ['潜在机会', '稍微倾向机会', '不确定', '稍微倾向问题', '现有问题'] },
      { id: 'SN-m22', text: '你更倾向于从概念出发还是从案例出发？', options: ['从概念出发', '稍微倾向概念', '不确定', '稍微倾向案例', '从案例出发'] },
      { id: 'SN-m23', text: '你更喜欢创新性思考还是实用性思考？', options: ['创新性思考', '稍微倾向创新', '不确定', '稍微倾向实用', '实用性思考'] },
      { id: 'SN-m24', text: '你更容易看到趋势还是关注现状？', options: ['看到趋势', '稍微倾向趋势', '不确定', '稍微倾向现状', '关注现状'] },
      { id: 'SN-m25', text: '你更倾向于抽象思维还是具体思维？', options: ['抽象思维', '稍微倾向抽象', '不确定', '稍微倾向具体', '具体思维'] }
    ],
    hard: [
      // 原有5题 + 新增10题
      { id: 'SN-h1', text: '你认为透过表象看本质重要还是关注表象本身？', options: ['透过表象看本质', '稍微倾向本质', '不确定', '稍微倾向表象', '关注表象本身'] },
      { id: 'SN-h2', text: '你更容易被新的可能性还是既有的事实所吸引？', options: ['新的可能性', '稍微倾向可能', '不确定', '稍微倾向事实', '既有的事实'] },
      { id: 'SN-h3', text: '你更看重创新还是传统？', options: ['创新', '稍微倾向创新', '不确定', '稍微倾向传统', '传统'] },
      { id: 'SN-h4', text: '你更相信直觉还是观察？', options: ['直觉', '稍微倾向直觉', '不确定', '稍微倾向观察', '观察'] },
      { id: 'SN-h5', text: '你更认同哪种观点？', options: ['理论指导实践', '理论有价值', '两者结合', '实践验证理论', '实践出真知'] },
      // 新增hard题目 h6-h15
      { id: 'SN-h6', text: '你倾向于相信潜在规律还是显性数据？', options: ['潜在规律', '稍微倾向规律', '不确定', '稍微倾向数据', '显性数据'] },
      { id: 'SN-h7', text: '你更容易发现概念间的隐含关联还是独立事实？', options: ['概念间的隐含关联', '稍微倾向关联', '不确定', '稍微倾向事实', '独立事实'] },
      { id: 'SN-h8', text: '你更看重系统性思考还是实证性分析？', options: ['系统性思考', '稍微倾向系统', '不确定', '稍微倾向实证', '实证性分析'] },
      { id: 'SN-h9', text: '你倾向于从假设出发还是从证据出发？', options: ['从假设出发', '稍微倾向假设', '不确定', '稍微倾向证据', '从证据出发'] },
      { id: 'SN-h10', text: '你更容易预见趋势还是记录现状？', options: ['预见趋势', '稍微倾向预见', '不确定', '稍微倾向记录', '记录现状'] },
      { id: 'SN-h11', text: '你更看重概念的深度还是应用的广度？', options: ['概念的深度', '稍微倾向深度', '不确定', '稍微倾向广度', '应用的广度'] },
      { id: 'SN-h12', text: '你倾向于理论框架构建还是具体数据收集？', options: ['理论框架构建', '稍微倾向框架', '不确定', '稍微倾向收集', '具体数据收集'] },
      { id: 'SN-h13', text: '你更容易发现潜在可能性还是实际限制？', options: ['潜在可能性', '稍微倾向可能', '不确定', '稍微倾向限制', '实际限制'] },
      { id: 'SN-h14', text: '你更看重模式识别还是细节把握？', options: ['模式识别', '稍微倾向模式', '不确定', '稍微倾向细节', '细节把握'] },
      { id: 'SN-h15', text: '你倾向于寻找深层意义还是表层事实？', options: ['寻找深层意义', '稍微倾向意义', '不确定', '稍微倾向事实', '表层事实'] }
    ]
  },
  TF: {
    easy: [
      // 原有10题 + 新增15题
      { id: 'TF-e1', text: '做决定时，你更依赖逻辑分析还是内心感受？', options: ['逻辑分析', '稍微倾向逻辑', '不确定', '稍微倾向感受', '内心感受'] },
      { id: 'TF-e2', text: '当朋友遇到问题时，你更倾向给出解决方案还是情感支持？', options: ['给出解决方案', '稍微倾向方案', '不确定', '稍微倾向支持', '情感支持'] },
      { id: 'TF-e3', text: '你更看重公正还是和谐？', options: ['公正', '稍微倾向公正', '不确定', '稍微倾向和谐', '和谐'] },
      { id: 'TF-e4', text: '批评他人时，你更关注事实正确还是对方感受？', options: ['事实正确', '稍微倾向事实', '不确定', '稍微倾向感受', '对方感受'] },
      { id: 'TF-e5', text: '你更容易被逻辑论证还是情感故事打动？', options: ['逻辑论证', '稍微倾向逻辑', '不确定', '稍微倾向故事', '情感故事'] },
      { id: 'TF-e6', text: '面对冲突，你更倾向于：', options: ['理性分析，找出最优解', '分析利弊', '看情况', '考虑各方感受', '维护关系和谐'] },
      { id: 'TF-e7', text: '你更看重效率还是人情？', options: ['效率', '稍微倾向效率', '不确定', '稍微倾向人情', '人情'] },
      { id: 'TF-e8', text: '评价一个决定时，你更看重：', options: ['是否合理高效', '是否合乎逻辑', '都可以', '是否考虑他人感受', '是否让人满意'] },
      { id: 'TF-e9', text: '当同事犯错时，你会：', options: ['指出问题，分析原因', '说明问题所在', '看情况', '委婉提醒', '考虑到对方的感受'] },
      { id: 'TF-e10', text: '你更喜欢哪种反馈方式？', options: ['直接的、有逻辑的建议', '具体可行的建议', '都可以', '温和的建议', '顾及感受的反馈'] },
      // 新增easy题目 e11-e25
      { id: 'TF-e11', text: '朋友向你倾诉烦恼，你更倾向于？', options: ['分析问题，给出建议', '先分析再安慰', '看情况', '先安慰再分析', '倾听和安慰'] },
      { id: 'TF-e12', text: '你更看重结果正确还是过程让人舒适？', options: ['结果正确', '稍微倾向结果', '不确定', '稍微倾向过程', '过程让人舒适'] },
      { id: 'TF-e13', text: '面对两难选择，你更依赖？', options: ['逻辑推理', '稍微倾向逻辑', '不确定', '稍微倾向感受', '内心感受'] },
      { id: 'TF-e14', text: '你更喜欢哪种沟通风格？', options: ['直接明确', '稍微倾向直接', '不确定', '稍微倾向委婉', '委婉温和'] },
      { id: 'TF-e15', text: '当他人情绪激动时，你会？', options: ['理性分析，让他冷静', '分析原因', '看情况', '先理解情绪', '耐心倾听和安慰'] },
      { id: 'TF-e16', text: '你更看重能力还是善意？', options: ['能力', '稍微倾向能力', '不确定', '稍微倾向善意', '善意'] },
      { id: 'TF-e17', text: '面对批评，你更在意？', options: ['批评是否有道理', '道理和态度都看', '不确定', '稍微在意态度', '批评的态度和方式'] },
      { id: 'TF-e18', text: '做决定时，你更倾向于？', options: ['列出利弊权衡', '利弊和感受都看', '不确定', '稍微倾向感受', '听从内心感受'] },
      { id: 'TF-e19', text: '你更喜欢哪种领导风格？', options: ['目标导向，任务明确', '效率和关系兼顾', '都可以', '关心员工感受', '温暖支持型'] },
      { id: 'TF-e20', text: '面对分歧，你更可能？', options: ['坚持正确立场', '坚持立场但温和表达', '看情况', '寻求折中方案', '优先维护关系'] },
      { id: 'TF-e21', text: '你更容易注意到？', options: ['逻辑漏洞', '稍微倾向逻辑', '不确定', '稍微倾向情绪', '他人的情绪变化'] },
      { id: 'TF-e22', text: '评价他人时，你更看重？', options: ['能力和成就', '能力为主', '不确定', '稍微倾向品格', '品格和为人'] },
      { id: 'TF-e23', text: '面对争议话题，你更倾向？', options: ['基于事实理性讨论', '理性讨论为主', '看情况', '稍微考虑感受', '避免伤害他人感受'] },
      { id: 'TF-e24', text: '你更看重客观标准还是主观体验？', options: ['客观标准', '稍微倾向客观', '不确定', '稍微倾向主观', '主观体验'] },
      { id: 'TF-e25', text: '你更倾向于？', options: ['追求效率和正确', '效率和感受兼顾', '不确定', '稍微倾向感受', '追求和谐和温暖'] }
    ],
    medium: [
      // 原有10题 + 新增15题
      { id: 'TF-m1', text: '你认为原则比关系重要还是关系比原则重要？', options: ['原则更重要', '稍微倾向原则', '不确定', '稍微倾向关系', '关系更重要'] },
      { id: 'TF-m2', text: '做重要决定时，你更看重客观标准还是个人价值？', options: ['客观标准', '稍微倾向客观', '不确定', '稍微倾向个人', '个人价值'] },
      { id: 'TF-m3', text: '你更容易被批评还是赞美所影响？', options: ['批评让我改进', '稍微倾向批评', '不确定', '稍微倾向赞美', '赞美激励我'] },
      { id: 'TF-m4', text: '你更看重真相还是感情？', options: ['真相', '稍微倾向真相', '不确定', '稍微倾向感情', '感情'] },
      { id: 'TF-m5', text: '你认为坦率直言还是委婉表达更好？', options: ['坦率直言', '稍微倾向坦率', '不确定', '稍微倾向委婉', '委婉表达'] },
      { id: 'TF-m6', text: '面对他人的错误，你更可能：', options: ['指出问题并分析原因', '说明问题所在', '看情况', '委婉提醒', '考虑到对方感受'] },
      { id: 'TF-m7', text: '你认为理性还是感性更能解决问题？', options: ['理性', '稍微倾向理性', '不确定', '稍微倾向感性', '感性'] },
      { id: 'TF-m8', text: '评价一个人时，你更看重：', options: ['能力和成就', '逻辑和理性', '两者都重要', '品德和善良', '对人的关怀'] },
      { id: 'TF-m9', text: '你更认同哪种观点？', options: ['事实胜于雄辩', '逻辑是关键', '两者都重要', '人心比事实重要', '情感驱动行动'] },
      { id: 'TF-m10', text: '面对分歧，你更倾向于：', options: ['分析各方论据', '权衡利弊', '看情况', '理解各方立场', '寻求共识和和谐'] },
      // 新增medium题目 m11-m25
      { id: 'TF-m11', text: '你更倾向于逻辑说服还是情感打动？', options: ['逻辑说服', '稍微倾向逻辑', '不确定', '稍微倾向情感', '情感打动'] },
      { id: 'TF-m12', text: '面对压力，你更依赖理性应对还是情感调节？', options: ['理性应对', '稍微倾向理性', '不确定', '稍微倾向情感', '情感调节'] },
      { id: 'TF-m13', text: '你更看重公平一致还是因人而异？', options: ['公平一致', '稍微倾向公平', '不确定', '稍微倾向因人而异', '因人而异'] },
      { id: 'TF-m14', text: '在做判断时，你更依赖数据分析还是直觉感受？', options: ['数据分析', '稍微倾向数据', '不确定', '稍微倾向直觉', '直觉感受'] },
      { id: 'TF-m15', text: '你更看重任务完成还是人际氛围？', options: ['任务完成', '稍微倾向任务', '不确定', '稍微倾向氛围', '人际氛围'] },
      { id: 'TF-m16', text: '面对冲突，你更倾向于解决问题还是安抚情绪？', options: ['解决问题', '稍微倾向解决', '不确定', '稍微倾向安抚', '安抚情绪'] },
      { id: 'TF-m17', text: '你更容易被逻辑漏洞还是情感需求触动？', options: ['逻辑漏洞', '稍微倾向逻辑', '不确定', '稍微倾向情感', '情感需求'] },
      { id: 'TF-m18', text: '你更看重客观评价还是主观理解？', options: ['客观评价', '稍微倾向客观', '不确定', '稍微倾向主观', '主观理解'] },
      { id: 'TF-m19', text: '面对他人的请求，你更倾向于？', options: ['评估合理性后决定', '理性评估', '不确定', '稍微倾向感受', '考虑对方感受后决定'] },
      { id: 'TF-m20', text: '你更看重职业能力还是人际关系？', options: ['职业能力', '稍微倾向能力', '不确定', '稍微倾向关系', '人际关系'] },
      { id: 'TF-m21', text: '你更容易坚持立场还是迁就他人？', options: ['坚持立场', '稍微倾向坚持', '不确定', '稍微倾向迁就', '迁就他人'] },
      { id: 'TF-m22', text: '你更看重结果正确还是关系和谐？', options: ['结果正确', '稍微倾向结果', '不确定', '稍微倾向关系', '关系和谐'] },
      { id: 'TF-m23', text: '你更倾向于理性讨论还是情感交流？', options: ['理性讨论', '稍微倾向理性', '不确定', '稍微倾向情感', '情感交流'] },
      { id: 'TF-m24', text: '面对错误，你更倾向于纠正还是包容？', options: ['纠正错误', '稍微倾向纠正', '不确定', '稍微倾向包容', '包容理解'] },
      { id: 'TF-m25', text: '你更看重逻辑一致性还是情感共鸣？', options: ['逻辑一致性', '稍微倾向逻辑', '不确定', '稍微倾向情感', '情感共鸣'] }
    ],
    hard: [
      // 原有5题 + 新增10题
      { id: 'TF-h1', text: '你认为公平分配还是按需分配更合理？', options: ['公平分配', '稍微倾向公平', '不确定', '稍微倾向按需', '按需分配'] },
      { id: 'TF-h2', text: '你更看重结果还是过程？', options: ['结果', '稍微倾向结果', '不确定', '稍微倾向过程', '过程'] },
      { id: 'TF-h3', text: '你认为批评应该直接还是委婉？', options: ['直接', '稍微倾向直接', '不确定', '稍微倾向委婉', '委婉'] },
      { id: 'TF-h4', text: '你更相信理性判断还是直觉感受？', options: ['理性判断', '稍微倾向理性', '不确定', '稍微倾向直觉', '直觉感受'] },
      { id: 'TF-h5', text: '你更看重个人成就还是他人福祉？', options: ['个人成就', '稍微倾向成就', '不确定', '稍微倾向他人', '他人福祉'] },
      // 新增hard题目 h6-h15
      { id: 'TF-h6', text: '面对团队分歧，你更倾向于坚持正确方案还是照顾各方感受？', options: ['坚持正确方案', '稍微倾向坚持', '不确定', '稍微倾向照顾', '照顾各方感受'] },
      { id: 'TF-h7', text: '你认为效率和人际关系哪个更重要？', options: ['效率更重要', '稍微倾向效率', '不确定', '稍微倾向关系', '人际关系更重要'] },
      { id: 'TF-h8', text: '面对他人情绪化表达，你更倾向于理性分析还是情感回应？', options: ['理性分析', '稍微倾向理性', '不确定', '稍微倾向情感', '情感回应'] },
      { id: 'TF-h9', text: '你更看重客观真相还是主观感受？', options: ['客观真相', '稍微倾向真相', '不确定', '稍微倾向感受', '主观感受'] },
      { id: 'TF-h10', text: '你更倾向于坚持原则还是灵活处理？', options: ['坚持原则', '稍微倾向原则', '不确定', '稍微倾向灵活', '灵活处理'] },
      { id: 'TF-h11', text: '面对道德困境，你更依赖理性推理还是情感直觉？', options: ['理性推理', '稍微倾向理性', '不确定', '稍微倾向情感', '情感直觉'] },
      { id: 'TF-h12', text: '你认为正直比和谐重要还是和谐比正直重要？', options: ['正直更重要', '稍微倾向正直', '不确定', '稍微倾向和谐', '和谐更重要'] },
      { id: 'TF-h13', text: '你更看重逻辑严谨还是情感真挚？', options: ['逻辑严谨', '稍微倾向逻辑', '不确定', '稍微倾向情感', '情感真挚'] },
      { id: 'TF-h14', text: '面对他人需求，你更倾向于评估合理性还是直接响应？', options: ['评估合理性', '稍微倾向评估', '不确定', '稍微倾向响应', '直接响应'] },
      { id: 'TF-h15', text: '你更看重决策正确还是决策过程中的尊重？', options: ['决策正确', '稍微倾向正确', '不确定', '稍微倾向尊重', '决策过程中的尊重'] }
    ]
  },
  JP: {
    easy: [
      // 原有10题 + 新增15题
      { id: 'JP-e1', text: '你更喜欢提前计划还是随性而为？', options: ['提前计划', '稍微倾向计划', '不确定', '稍微倾向随性', '随性而为'] },
      { id: 'JP-e2', text: '你更看重完成任务还是享受过程？', options: ['完成任务', '稍微倾向完成', '不确定', '稍微倾向享受', '享受过程'] },
      { id: 'JP-e3', text: '你更喜欢有序的生活还是充满惊喜的生活？', options: ['有序的生活', '稍微倾向有序', '不确定', '稍微倾向惊喜', '充满惊喜'] },
      { id: 'JP-e4', text: '你的工作方式更像是有条不紊还是灵活应变？', options: ['有条不紊', '稍微倾向有条不紊', '不确定', '稍微倾向灵活', '灵活应变'] },
      { id: 'JP-e5', text: '你更看重规则还是自由？', options: ['规则', '稍微倾向规则', '不确定', '稍微倾向自由', '自由'] },
      { id: 'JP-e6', text: '安排旅行时，你更倾向于：', options: ['详细规划行程', '大致安排', '看情况', '只定大致方向', '随心所欲'] },
      { id: 'JP-e7', text: '你更喜欢哪种工作节奏？', options: ['稳定有序的进度', '有计划推进', '都可以', '灵活调整', '随状态变化'] },
      { id: 'JP-e8', text: '面对待办事项，你通常：', options: ['按计划逐一完成', '有顺序完成', '看情况', '灵活安排', '想到什么做什么'] },
      { id: 'JP-e9', text: '你更认同哪种生活态度？', options: ['凡事预则立', '计划很重要', '两者结合', '人生需要惊喜', '活在当下'] },
      { id: 'JP-e10', text: '对于周末安排，你更可能：', options: ['提前计划好', '大致规划', '看情况', '临时决定', '随心所欲'] },
      // 新增easy题目 e11-e25
      { id: 'JP-e11', text: '你更喜欢明确的时间表还是灵活的安排？', options: ['明确的时间表', '稍微倾向明确', '不确定', '稍微倾向灵活', '灵活的安排'] },
      { id: 'JP-e12', text: '面对deadline，你通常会？', options: ['提前完成', '稍微提前', '看情况', '接近deadline完成', '最后一刻完成'] },
      { id: 'JP-e13', text: '你更喜欢哪种工作模式？', options: ['有明确目标和步骤', '有目标但灵活执行', '都可以', '随灵感工作', '随心所欲地工作'] },
      { id: 'JP-e14', text: '你对突发事件的反应是？', options: ['按预案处理', '稍微倾向预案', '不确定', '稍微倾向随机应变', '随机应变'] },
      { id: 'JP-e15', text: '你更倾向于？', options: ['制定详细计划', '简单规划', '看情况', '边做边想', '随性决定'] },
      { id: 'JP-e16', text: '你更喜欢哪种约会方式？', options: ['提前预约确定时间', '提前大致确定', '都可以', '临时约也可以', '随时相约'] },
      { id: 'JP-e17', text: '面对选择，你更倾向于？', options: ['快速做出决定', '较快决定', '看情况', '慢慢考虑', '拖延到最后'] },
      { id: 'JP-e18', text: '你更喜欢哪种学习方式？', options: ['按计划系统学习', '有计划但灵活调整', '都可以', '随兴趣探索', '自由探索学习'] },
      { id: 'JP-e19', text: '你更看重按时完成还是质量优先？', options: ['按时完成', '稍微倾向按时', '不确定', '稍微倾向质量', '质量优先'] },
      { id: 'JP-e20', text: '面对多任务，你更倾向于？', options: ['按顺序逐一完成', '优先级排序完成', '看情况', '根据兴趣切换', '随心所欲处理'] },
      { id: 'JP-e21', text: '你更喜欢哪种假期规划？', options: ['详细规划行程', '大致安排活动', '都可以', '只定主要活动', '完全自由探索'] },
      { id: 'JP-e22', text: '你更倾向于？', options: ['今日事今日毕', '尽量今日完成', '看情况', '有些事可以延后', '顺其自然'] },
      { id: 'JP-e23', text: '你更喜欢哪种会议风格？', options: ['有议程和时间限制', '有议程但灵活', '都可以', '自由讨论', '随意交谈'] },
      { id: 'JP-e24', text: '面对规则，你更倾向于？', options: ['严格遵守规则', '尽量遵守', '看情况', '规则可灵活运用', '不拘泥于规则'] },
      { id: 'JP-e25', text: '你更喜欢？', options: ['确定性', '稍微倾向确定', '不确定', '稍微倾向可能', '可能性'] }
    ],
    medium: [
      // 原有10题 + 新增15题
      { id: 'JP-m1', text: '你认为明确的目标还是开放的可能性更有价值？', options: ['明确的目标', '稍微倾向明确', '不确定', '稍微倾向开放', '开放的可能性'] },
      { id: 'JP-m2', text: '你更喜欢确定的结果还是探索的机会？', options: ['确定的结果', '稍微倾向确定', '不确定', '稍微倾向探索', '探索的机会'] },
      { id: 'JP-m3', text: '你更看重执行计划还是适应变化？', options: ['执行计划', '稍微倾向执行', '不确定', '稍微倾向适应', '适应变化'] },
      { id: 'JP-m4', text: '你认为果断决策还是深思熟虑更好？', options: ['果断决策', '稍微倾向果断', '不确定', '稍微倾向深思', '深思熟虑'] },
      { id: 'JP-m5', text: '你更容易按计划行事还是随机应变？', options: ['按计划行事', '稍微倾向计划', '不确定', '稍微倾向随机', '随机应变'] },
      { id: 'JP-m6', text: '面对变化，你更倾向于：', options: ['按原计划执行', '调整计划', '看情况', '灵活应对', '顺势而为'] },
      { id: 'JP-m7', text: '你更看重完成deadline还是保持灵活？', options: ['完成deadline', '稍微倾向deadline', '不确定', '稍微倾向灵活', '保持灵活'] },
      { id: 'JP-m8', text: '对于决定，你更倾向：', options: ['尽早做出决定', '及时决定', '看情况', '再考虑一下', '保留选择余地'] },
      { id: 'JP-m9', text: '你更喜欢哪种工作方式？', options: ['按计划稳步推进', '有序进行', '都可以', '灵活调整', '随灵感行动'] },
      { id: 'JP-m10', text: '你更认同哪种说法？', options: ['计划是成功的基础', '计划有帮助', '两者都重要', '变化比计划重要', '灵活才是关键'] },
      // 新增medium题目 m11-m25
      { id: 'JP-m11', text: '面对不确定的未来，你更倾向于？', options: ['制定应对方案', '有大致准备', '看情况', '相信随机应变', '顺其自然'] },
      { id: 'JP-m12', text: '你更看重决策速度还是决策质量？', options: ['决策速度', '稍微倾向速度', '不确定', '稍微倾向质量', '决策质量'] },
      { id: 'JP-m13', text: '面对问题，你更倾向于？', options: ['立即解决', '较快解决', '看情况', '慢慢处理', '等待自然解决'] },
      { id: 'JP-m14', text: '你更喜欢哪种项目管理方式？', options: ['详细计划里程碑', '大致规划节点', '看情况', '灵活调整进度', '随状态推进'] },
      { id: 'JP-m15', text: '你更倾向于？', options: ['锁定目标不改变', '目标明确但灵活调整', '不确定', '稍微倾向调整', '随时调整目标'] },
      { id: 'JP-m16', text: '面对新信息，你会？', options: ['按原计划继续', '评估后调整', '看情况', '根据新信息调整', '随时改变方向'] },
      { id: 'JP-m17', text: '你更看重承诺还是灵活性？', options: ['承诺', '稍微倾向承诺', '不确定', '稍微倾向灵活', '灵活性'] },
      { id: 'JP-m18', text: '面对多个选项，你更倾向于？', options: ['快速选定一个', '较快选择', '看情况', '慢慢权衡', '保持开放选择'] },
      { id: 'JP-m19', text: '你更喜欢哪种进度管理？', options: ['严格按时间表', '有时间表但灵活', '看情况', '根据状态调整', '完全自由安排'] },
      { id: 'JP-m20', text: '面对意外中断，你会？', options: ['尽快恢复原计划', '调整后继续', '看情况', '顺势改变方向', '接受新的可能性'] },
      { id: 'JP-m21', text: '你更倾向于？', options: ['今天完成明天的计划', '大致安排明天', '看情况', '有些提前有些延后', '不提前计划'] },
      { id: 'JP-m22', text: '面对复杂任务，你更倾向于？', options: ['分解成小步骤完成', '分步骤但灵活', '看情况', '根据状态推进', '随心处理'] },
      { id: 'JP-m23', text: '你更看重最终结果还是探索过程？', options: ['最终结果', '稍微倾向结果', '不确定', '稍微倾向过程', '探索过程'] },
      { id: 'JP-m24', text: '你更喜欢哪种决策方式？', options: ['快速决策并执行', '决策后灵活执行', '看情况', '慢慢探索选项', '等待时机决定'] },
      { id: 'JP-m25', text: '面对期限，你更倾向于？', options: ['严格遵守期限', '尽量遵守期限', '看情况', '期限可适当调整', '灵活处理期限'] }
    ],
    hard: [
      // 原有5题 + 新增10题
      { id: 'JP-h1', text: '你更看重做出明确决定还是保留选择余地？', options: ['做出明确决定', '稍微倾向明确', '不确定', '稍微倾向保留', '保留选择余地'] },
      { id: 'JP-h2', text: '当项目接近尾声，你会严格执行计划还是允许调整？', options: ['严格执行计划', '稍微倾向执行', '不确定', '稍微倾向调整', '允许调整'] },
      { id: 'JP-h3', text: '你认为规则应该严格遵守还是根据情况灵活运用？', options: ['严格遵守', '稍微倾向遵守', '不确定', '稍微倾向灵活', '灵活运用'] },
      { id: 'JP-h4', text: '完成任务的方式，你更看重结果达标还是过程完美？', options: ['结果达标', '稍微倾向结果', '不确定', '稍微倾向过程', '过程完美'] },
      { id: 'JP-h5', text: '你认为人生的意义在于达成目标还是体验过程？', options: ['达成目标', '稍微倾向目标', '不确定', '稍微倾向体验', '体验过程'] },
      // 新增hard题目 h6-h15
      { id: 'JP-h6', text: '面对不确定性，你更倾向于制定预案还是接受随机？', options: ['制定预案', '稍微倾向预案', '不确定', '稍微倾向随机', '接受随机'] },
      { id: 'JP-h7', text: '你更看重决策的确定性还是决策的灵活性？', options: ['决策的确定性', '稍微倾向确定', '不确定', '稍微倾向灵活', '决策的灵活性'] },
      { id: 'JP-h8', text: '面对时间压力，你更倾向于坚持计划还是顺势调整？', options: ['坚持计划', '稍微倾向坚持', '不确定', '稍微倾向调整', '顺势调整'] },
      { id: 'JP-h9', text: '你更看重承诺兑现还是灵活变通？', options: ['承诺兑现', '稍微倾向承诺', '不确定', '稍微倾向变通', '灵活变通'] },
      { id: 'JP-h10', text: '面对复杂决策，你更倾向于系统分析还是直觉判断？', options: ['系统分析', '稍微倾向分析', '不确定', '稍微倾向直觉', '直觉判断'] },
      { id: 'JP-h11', text: '你更看重最终完成还是沿途探索？', options: ['最终完成', '稍微倾向完成', '不确定', '稍微倾向探索', '沿途探索'] },
      { id: 'JP-h12', text: '面对变化环境，你更倾向于坚守原方向还是灵活转向？', options: ['坚守原方向', '稍微倾向坚守', '不确定', '稍微倾向转向', '灵活转向'] },
      { id: 'JP-h13', text: '你更看重明确结论还是开放讨论？', options: ['明确结论', '稍微倾向结论', '不确定', '稍微倾向讨论', '开放讨论'] },
      { id: 'JP-h14', text: '面对既定方案，你更倾向于严格执行还是适时调整？', options: ['严格执行', '稍微倾向执行', '不确定', '稍微倾向调整', '适时调整'] },
      { id: 'JP-h15', text: '你更看重目标达成还是可能性探索？', options: ['目标达成', '稍微倾向目标', '不确定', '稍微倾向探索', '可能性探索'] }
    ]
  }
};

const VERSIONS = {
  quick: { name: '快速版', description: '24题', questionsPerDimension: { EI: 6, SN: 6, TF: 6, JP: 6 }, totalQuestions: 24, aiCallInterval: 6, timeEstimate: '5分钟' },
  standard: { name: '标准版', description: '60题', questionsPerDimension: { EI: 15, SN: 15, TF: 15, JP: 15 }, totalQuestions: 60, aiCallInterval: 5, timeEstimate: '10分钟' },
  professional: { name: '专业版', description: '93题', questionsPerDimension: { EI: 23, SN: 24, TF: 23, JP: 23 }, totalQuestions: 93, aiCallInterval: 8, timeEstimate: '15分钟' },
  advanced: { name: '进阶版', description: '160题', questionsPerDimension: { EI: 40, SN: 40, TF: 40, JP: 40 }, totalQuestions: 160, aiCallInterval: 12, timeEstimate: '25分钟' },
  complete: { name: '完整版', description: '200题', questionsPerDimension: { EI: 50, SN: 50, TF: 50, JP: 50 }, totalQuestions: 200, aiCallInterval: 15, timeEstimate: '35分钟' }
};

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

// ==================== 辅助函数 ====================

function jsonResponse(data) {
  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}

function getDimensions() {
  return ['EI', 'SN', 'TF', 'JP'];
}

function getVersionInfo(version) {
  return VERSIONS[version];
}

function getAllVersions() {
  return Object.keys(VERSIONS).map(key => ({ id: key, ...VERSIONS[key] }));
}

function getQuestion(dimension, difficulty, usedIds = []) {
  const pool = questions[dimension]?.[difficulty];
  if (!pool) return null;
  const available = pool.filter(q => !usedIds.includes(q.id));
  if (available.length === 0) return null;
  return available[Math.floor(Math.random() * available.length)];
}

// 尝试所有难度级别获取题目（避免单一难度用尽导致报错）
function getQuestionWithFallback(dimension, preferredDifficulty, usedIds = []) {
  const difficulties = ['medium', 'easy', 'hard'];

  // 优先尝试推荐的难度
  const orderedDifficulties = [preferredDifficulty, ...difficulties.filter(d => d !== preferredDifficulty)];

  for (const diff of orderedDifficulties) {
    const question = getQuestion(dimension, diff, usedIds);
    if (question) {
      return { question, difficulty: diff };
    }
  }

  return null;
}

function getCoreTraits(type) {
  return personalityTraits[type] || '独特人格组合';
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

返回JSON：{"EI":{"score":${dimensionStats.EI.percentage},"tendency":"${dimensionStats.EI.tendency}"},"SN":{"score":${dimensionStats.SN.percentage},"tendency":"${dimensionStats.SN.tendency}"},"TF":{"score":${dimensionStats.TF.percentage},"tendency":"${dimensionStats.TF.tendency}"},"JP":{"score":${dimensionStats.JP.percentage},"tendency":"${dimensionStats.JP.tendency}"},"finalType":"${finalType}","confidence":85,"description":"请用第一人称我写一段350-450字的生动小故事来展现${finalType}人格的综合特征，字数必须达标。绝对禁止：使用任何人物名字、任何开头套话如你是一个典型的、分维度讲述如在外向方面、任何MBTI术语。必须做到：全文用我开头讲述，比如周末我总是、工作中我喜欢、和朋友相处时我习惯；内容丰富有趣，用至少3个具体生活场景自然展现四个维度的综合特点，像讲一个完整有趣的人物故事让读者看完就想认识这样的人；结尾一句话点出这种人格最迷人的独特魅力"}`;
}

function buildDeepAnalysisPrompt(personality) {
  const type = personality.finalType;
  const typeNames = {
    'INTJ': '建筑师', 'INTP': '逻辑学家', 'ENTJ': '指挥官', 'ENTP': '辩论家',
    'INFJ': '提倡者', 'INFP': '调停者', 'ENFJ': '主人公', 'ENFP': '竞选者',
    'ISTJ': '物流师', 'ISFJ': '守卫者', 'ESTJ': '总经理', 'ESFJ': '执政官',
    'ISTP': '鉴赏家', 'ISFP': '探险家', 'ESTP': '企业家', 'ESFP': '表演者'
  };

  return `你是MBTI职业规划顾问。为${type}型人格推荐职业方向。

人格特点：${type}（${typeNames[type]}型）
维度倾向：${personality.EI.tendency}${personality.EI.score}% ${personality.SN.tendency}${personality.SN.score}% ${personality.TF.tendency}${personality.TF.score}% ${personality.JP.tendency}${personality.JP.score}%

任务要求：
1. 推荐2个最适合的行业领域，说明每个行业为什么适合${type}型人格
2. 推荐4个具体职业，每个职业给出匹配度百分比和中等长度匹配理由（20-30字）
3. 社交方面：优势2条、挑战2条、建议2条

输出要求：
只返回纯JSON，不要任何额外文字。
所有字符串值不要包含双引号或换行符。

返回格式示例：
{"industries":[{"name":"科技互联网","reason":"重视创新与逻辑思维适合INTJ分析能力"},{"name":"金融投资","reason":"需要理性决策和长期规划匹配INTJ特质"}],"careers":[{"name":"数据分析师","score":92,"reason":"需要深度分析能力和逻辑思维非常匹配"},{"name":"产品经理","score":85,"reason":"战略规划能力强善于把控全局方向"},{"name":"战略顾问","score":88,"reason":"擅长系统性思考能为企业提供长远方案"},{"name":"研究科学家","score":90,"reason":"专注深入钻研适合INTJ追求完美特质"}],"social":{"strengths":["善于倾听理解他人需求","做事有条理让人信任"],"challenges":["不太擅长社交场合","容易给人冷漠印象"],"tips":["主动分享想法增加亲和力","参加小型聚会练习社交"]}}`;
}

// ==================== AI调用 ====================

async function callAI(apiKey, prompt, maxTokens = 300) {
  const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'glm-4-flash',
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

// ==================== Pages Functions入口 ====================

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const path = url.pathname;

  // CORS处理
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
    // GET /api/mbti/versions - 获取版本列表
    if (path.includes('/versions') && request.method === 'GET') {
      return jsonResponse(getAllVersions());
    }

    // POST /api/mbti/start - 开始测试（只返回第一题，不创建session）
    if (path.includes('/start') && request.method === 'POST') {
      const body = await request.json();
      const version = body.version || 'standard';
      const versionInfo = getVersionInfo(version);

      if (!versionInfo) {
        return jsonResponse({ error: '无效的版本' });
      }

      const dimensions = getDimensions();
      const questionsPerDimension = versionInfo.questionsPerDimension;

      const firstDimension = selectRandomDimension([], questionsPerDimension, dimensions);
      const firstResult = getQuestionWithFallback(firstDimension, 'medium');

      // 返回第一题信息，前端自行存储
      return jsonResponse({
        version: versionInfo,
        dimension: firstDimension,
        question: firstResult?.question,
        questionsPerDimension,
        totalQuestions: versionInfo.totalQuestions,
        aiCallInterval: versionInfo.aiCallInterval,
        progress: { current: 1, total: versionInfo.totalQuestions }
      });
    }

    // POST /api/mbti/answer - 提交答案（接收完整历史数据）
    if (path.includes('/answer') && request.method === 'POST') {
      const body = await request.json();
      const {
        history,           // 完整历史记录
        currentDimension,  // 当前维度
        currentQuestion,   // 当前题目
        version,           // 版本信息
        choiceIndex,       // 本次选择
        choiceText         // 本次选择文本
      } = body;

      if (!history || !Array.isArray(history)) {
        return jsonResponse({ error: '缺少历史数据' });
      }

      const versionInfo = getVersionInfo(version) || VERSIONS.standard;
      const questionsPerDimension = versionInfo.questionsPerDimension;
      const dimensions = getDimensions();

      // 计算倾向分数
      const tendencyScore = 2 - choiceIndex;

      // 添加本次回答到历史（前端需要更新localStorage）
      const newEntry = {
        question: currentQuestion.text,
        choice: choiceText,
        choiceIndex,
        tendencyScore,
        dimension: currentDimension,
        questionId: currentQuestion.id,
        difficulty: currentQuestion.difficulty || 'medium'
      };

      // 获取已用题目ID
      const usedQuestionIds = history.map(h => h.questionId);
      usedQuestionIds.push(currentQuestion.id);

      // 更新后的历史
      const updatedHistory = [...history, newEntry];
      const totalAnswersCount = updatedHistory.length;

      // AI分析（每aiCallInterval题）
      let aiRecommendation = null;
      const answersInDimension = updatedHistory.filter(h => h.dimension === currentDimension);
      const dimensionTendencySum = answersInDimension.reduce((sum, h) => sum + h.tendencyScore, 0);

      if (totalAnswersCount > 0 && totalAnswersCount % versionInfo.aiCallInterval === 0) {
        try {
          const apiKey = env.ZHIPU_API_KEY;
          if (apiKey) {
            const prompt = buildAnalysisPrompt(answersInDimension, currentDimension, dimensionTendencySum);
            const aiResponse = await callAI(apiKey, prompt);
            aiRecommendation = parseAIJSON(aiResponse);
          }
        } catch (error) {
          aiRecommendation = { nextDifficulty: 'medium', nextTopic: '继续当前维度' };
        }
      }

      // 检查是否所有维度完成
      const allDimensionsCompleted = dimensions.every(dim => {
        const count = updatedHistory.filter(h => h.dimension === dim).length;
        return count >= questionsPerDimension[dim];
      });

      if (allDimensionsCompleted) {
        try {
          const apiKey = env.ZHIPU_API_KEY;
          if (!apiKey) {
            return jsonResponse({ error: 'API密钥未配置' });
          }
          const finalPrompt = buildFinalPrompt(updatedHistory, questionsPerDimension);
          const finalResult = await callAI(apiKey, finalPrompt, 500);
          const personality = parseAIJSON(finalResult);

          return jsonResponse({
            completed: true,
            personality,
            history: updatedHistory,
            version: versionInfo
          });
        } catch (error) {
          return jsonResponse({ error: '分析失败: ' + error.message });
        }
      }

      // 获取下一题
      const preferredDifficulty = aiRecommendation?.nextDifficulty || 'medium';
      const nextDimension = selectRandomDimension(updatedHistory, questionsPerDimension, dimensions);

      if (!nextDimension) {
        // 所有维度完成
        try {
          const apiKey = env.ZHIPU_API_KEY;
          if (!apiKey) {
            return jsonResponse({ error: 'API密钥未配置' });
          }
          const finalPrompt = buildFinalPrompt(updatedHistory, questionsPerDimension);
          const finalResult = await callAI(apiKey, finalPrompt, 500);
          const personality = parseAIJSON(finalResult);

          return jsonResponse({
            completed: true,
            personality,
            history: updatedHistory,
            version: versionInfo
          });
        } catch (error) {
          return jsonResponse({ error: '分析失败: ' + error.message });
        }
      }

      // 使用fallback机制尝试所有难度
      const result = getQuestionWithFallback(nextDimension, preferredDifficulty, usedQuestionIds);

      if (!result) {
        // 当前维度题目用尽，尝试其他维度
        const otherDimensions = dimensions.filter(dim => {
          const count = updatedHistory.filter(h => h.dimension === dim).length;
          return count < questionsPerDimension[dim];
        });

        for (const altDimension of otherDimensions) {
          const altResult = getQuestionWithFallback(altDimension, 'medium', usedQuestionIds);
          if (altResult) {
            return jsonResponse({
              dimension: altDimension,
              question: altResult.question,
              aiRecommendation,
              history: updatedHistory,
              usedQuestionIds,
              progress: { current: totalAnswersCount + 1, total: versionInfo.totalQuestions }
            });
          }
        }

        // 真的所有题目用尽
        return jsonResponse({ error: '题库已用尽，请重新开始测试' });
      }

      return jsonResponse({
        dimension: nextDimension,
        question: result.question,
        aiRecommendation,
        history: updatedHistory,
        usedQuestionIds,
        progress: { current: totalAnswersCount + 1, total: versionInfo.totalQuestions }
      });
    }

    // POST /api/mbti/deep-analysis - 深度分析
    if (path.includes('/deep-analysis') && request.method === 'POST') {
      const body = await request.json();
      const { personality } = body;

      if (!personality) {
        return jsonResponse({ success: false, error: '缺少人格数据' });
      }

      try {
        const apiKey = env.ZHIPU_API_KEY;

        if (!apiKey) {
          return jsonResponse({ success: false, error: 'API密钥未配置' });
        }

        const deepPrompt = buildDeepAnalysisPrompt(personality);
        const deepResult = await callAI(apiKey, deepPrompt, 4000);
        const deepAnalysis = parseAIJSON(deepResult);

        return jsonResponse({ success: true, deepAnalysis });
      } catch (error) {
        return jsonResponse({ success: false, error: error.message });
      }
    }

    // 默认响应
    return jsonResponse({ error: '未知路由' });

  } catch (error) {
    return jsonResponse({ error: error.message });
  }
}