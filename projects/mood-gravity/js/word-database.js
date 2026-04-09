/**
 * Mood Gravity - Word Database
 * 词库数据模块：包含100个情绪词汇及其物理属性
 */

const WordDatabase = {
    // 词汇分类
    categories: {
        negative: {
            // 负面词：质量重（0.8-1.0），移动缓慢，震动效果
            words: [
                "烦躁", "郁闷", "愤怒", "憋屈", "绝望", "消沉", "空虚",
                "孤单", "恐慌", "懦弱", "自负", "妒忌", "憎恶", "鄙视",
                "麻木", "极端", "抵触", "退缩", "矛盾", "羞耻", "懊悔",
                "惋惜", "无力", "多疑", "戒备", "尖酸", "牢骚", "哀愁",
                "焦躁", "忐忑"
            ],
            massRange: { min: 0.8, max: 1.0 },
            color: 0x1a1a1a, // 黑色
            baseSize: 22,
            vibration: true
        },
        positive: {
            // 正面词：质量轻（0.3-0.5），弹跳灵动，漂浮效果
            words: [
                "焦虑", "难过", "生气", "心酸", "沮丧", "颓废", "倦怠",
                "寂寞", "困惑", "恐惧", "自卑", "傲慢", "怨恨", "厌恶",
                "轻蔑", "迟钝", "浮躁", "任性", "迟疑", "尴尬", "悔恨",
                "无奈", "脆弱", "猜忌", "敌意", "抱怨", "烦躁", "忧闷",
                "忧心"
            ],
            massRange: { min: 0.3, max: 0.5 },
            color: 0x4a4a4a, // 灰色
            baseSize: 14,
            vibration: false
        },
        neutral: {
            // 中性词：质量中等（0.5-0.7），漂浮效果
            words: [
                "压抑", "悲伤", "暴躁", "心寒", "低落", "疲惫", "心累",
                "孤独", "茫然", "胆怯", "嫉妒", "痛恨", "反感", "嫌弃",
                "冷漠", "固执", "轻狂", "叛逆", "抗拒", "犹豫", "纠结",
                "难堪", "愧疚", "内疚", "自责", "遗憾", "无助", "敏感",
                "怀疑", "刻薄", "埋怨", "气恼", "愁苦"
            ],
            massRange: { min: 0.5, max: 0.7 },
            color: 0x2d2d2d, // 黑灰色
            baseSize: 18,
            vibration: false
        }
    },

    /**
     * 获取随机词汇及其属性
     * @returns {Object} 包含词汇文字、情绪类型、质量、颜色、大小
     */
    getRandomWord() {
        const types = ['negative', 'positive', 'neutral'];
        const weights = [0.25, 0.25, 0.5]; // 负面25%、正面25%、中性50%

        // 按权重随机选择类型
        const type = this._weightedRandom(types, weights);
        const category = this.categories[type];

        // 随机选择该类型中的一个词
        const word = category.words[Math.floor(Math.random() * category.words.length)];

        // 随机生成质量值
        const mass = category.massRange.min +
            Math.random() * (category.massRange.max - category.massRange.min);

        // 随机生成大小（基于基础大小±20%）
        const size = category.baseSize * (0.8 + Math.random() * 0.4);

        return {
            text: word,
            type: type,
            mass: mass,
            color: category.color,
            size: size,
            vibration: category.vibration
        };
    },

    /**
     * 获取所有词汇列表（用于生成500个粒子）
     * @param {number} count - 需要的词汇数量
     * @returns {Array} 词汇属性数组
     */
    generateWordList(count) {
        const words = [];
        for (let i = 0; i < count; i++) {
            words.push(this.getRandomWord());
        }
        return words;
    },

    /**
     * 获取词汇的颜色
     * @param {string} word - 词汇文字
     * @returns {number} 颜色值（十六进制）
     */
    getWordColor(word) {
        for (const [type, category] of Object.entries(this.categories)) {
            if (category.words.includes(word)) {
                return category.color;
            }
        }
        return this.categories.neutral.color; // 默认中性色
    },

    /**
     * 获取词汇的质量
     * @param {string} word - 词汇文字
     * @returns {number} 质量值
     */
    getWordMass(word) {
        for (const [type, category] of Object.entries(this.categories)) {
            if (category.words.includes(word)) {
                return category.massRange.min +
                    Math.random() * (category.massRange.max - category.massRange.min);
            }
        }
        return 0.6; // 默认质量
    },

    /**
     * 权重随机算法
     * @private
     */
    _weightedRandom(items, weights) {
        const total = weights.reduce((a, b) => a + b, 0);
        let random = Math.random() * total;

        for (let i = 0; i < items.length; i++) {
            random -= weights[i];
            if (random <= 0) {
                return items[i];
            }
        }
        return items[items.length - 1];
    }
};

// 导出模块（兼容ES Module和全局变量）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WordDatabase;
} else {
    window.WordDatabase = WordDatabase;
}