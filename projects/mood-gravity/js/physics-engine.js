/**
 * Mood Gravity - Physics Engine
 * Matter.js物理引擎封装：管理粒子物理行为和力场交互
 */

const PhysicsEngine = {
    // Matter.js引擎实例
    engine: null,
    world: null,
    runner: null,

    // 粒子物理体列表
    bodies: [],

    // 边界墙壁列表
    boundaries: [],

    // 力场参数
    forceField: {
        position: { x: 0, y: 0 },
        mode: 'normal', // 'normal', 'blackhole', 'explosion'
        strength: 0,
        radius: 75  // 推开半径减少一半（原150）
    },

    // 配置参数
    config: {
        worldWidth: window.innerWidth * 1.3,   // 扩展130%
        worldHeight: window.innerHeight * 1.3, // 扩展130%
        friction: 0.1,
        frictionAir: 0.005,
        restitution: 0.8 // 弹性系数
    },

    /**
     * 初始化物理引擎
     * @param {Object} options - 配置选项
     */
    init(options = {}) {
        // 合并配置
        Object.assign(this.config, options);

        // 创建Matter.js引擎
        this.engine = Matter.Engine.create({
            gravity: { x: 0, y: 0 } // 无重力环境
        });
        this.world = this.engine.world;

        // 创建边界墙壁（防止粒子逃逸）
        this._createBoundaries();

        // 启动物理引擎
        this.runner = Matter.Runner.create();
        Matter.Runner.run(this.runner, this.engine);

        console.log('Physics engine initialized');
    },

    /**
     * 创建世界边界墙壁
     * @private
     */
    _createBoundaries() {
        const { worldWidth, worldHeight } = this.config;
        const wallThickness = 50;

        this.boundaries = [
            // 顶墙
            Matter.Bodies.rectangle(worldWidth / 2, -wallThickness / 2,
                worldWidth + wallThickness * 2, wallThickness,
                { isStatic: true, label: 'boundary', friction: 0, restitution: 1 }),
            // 底墙
            Matter.Bodies.rectangle(worldWidth / 2, worldHeight + wallThickness / 2,
                worldWidth + wallThickness * 2, wallThickness,
                { isStatic: true, label: 'boundary', friction: 0, restitution: 1 }),
            // 左墙
            Matter.Bodies.rectangle(-wallThickness / 2, worldHeight / 2,
                wallThickness, worldHeight + wallThickness * 2,
                { isStatic: true, label: 'boundary', friction: 0, restitution: 1 }),
            // 右墙
            Matter.Bodies.rectangle(worldWidth + wallThickness / 2, worldHeight / 2,
                wallThickness, worldHeight + wallThickness * 2,
                { isStatic: true, label: 'boundary', friction: 0, restitution: 1 })
        ];

        Matter.World.add(this.world, this.boundaries);
    },

    /**
     * 创建词汇粒子物理体
     * @param {Object} wordData - 词汇数据（来自WordDatabase）
     * @param {number} x - 初始X坐标
     * @param {number} y - 初始Y坐标
     * @returns {Object} Matter.js物理体
     */
    createParticleBody(wordData, x, y) {
        const { size, mass } = wordData;

        // 创建圆形物理体
        const body = Matter.Bodies.circle(x, y, size / 2, {
            mass: mass,
            friction: this.config.friction,
            frictionAir: this.config.frictionAir,
            restitution: this.config.restitution,
            label: wordData.text,
            // 存储额外数据
            plugin: {
                wordType: wordData.type,
                wordColor: wordData.color,
                vibration: wordData.vibration,
                originalSize: size
            }
        });

        // 添加到世界
        Matter.World.add(this.world, body);
        this.bodies.push(body);

        return body;
    },

    /**
     * 批量创建粒子物理体
     * @param {Array} wordList - 词汇列表（来自WordDatabase.generateWordList）
     * @returns {Array} 物理体数组
     */
    createParticleBodies(wordList) {
        const bodies = [];
        const { worldWidth, worldHeight } = this.config;

        wordList.forEach((wordData, index) => {
            // 随机初始位置（避开边界）
            const margin = 100;
            const x = margin + Math.random() * (worldWidth - margin * 2);
            const y = margin + Math.random() * (worldHeight - margin * 2);

            const body = this.createParticleBody(wordData, x, y);
            bodies.push(body);
        });

        return bodies;
    },

    /**
     * 更新力场位置（跟随鼠标）
     * @param {number} x - 鼠标X坐标
     * @param {number} y - 鼠标Y坐标
     */
    updateForceFieldPosition(x, y) {
        this.forceField.position = { x, y };
    },

    /**
     * 设置力场模式
     * @param {string} mode - 'normal', 'blackhole', 'explosion'
     * @param {number} strength - 力场强度
     */
    setForceFieldMode(mode, strength = 0) {
        this.forceField.mode = mode;
        this.forceField.strength = strength;
    },

    /**
     * 应用力场效果到所有粒子
     * 在每帧渲染前调用
     * @param {boolean} isMouseDown - 鼠标是否按下
     */
    applyForceField(isMouseDown = false) {
        const { position, mode, strength, radius } = this.forceField;
        const { worldWidth, worldHeight } = this.config;

        // 优化：循环开始时获取一次时间，避免每帧多次调用 Date.now()
        const currentTime = Date.now() * 0.001;

        this.bodies.forEach(body => {
            // 1. 自然漂移运动（所有模式下都有）
            this._applyNaturalDrift(body, currentTime);

            // 2. 边界约束：确保粒子不会跑出屏幕
            const margin = 50;
            const particleRadius = body.plugin?.originalSize / 2 || 10;

            if (body.position.x < margin + particleRadius) {
                Matter.Body.setPosition(body, { x: margin + particleRadius, y: body.position.y });
                Matter.Body.setVelocity(body, { x: Math.abs(body.velocity.x) * 0.5, y: body.velocity.y });
            } else if (body.position.x > worldWidth - margin - particleRadius) {
                Matter.Body.setPosition(body, { x: worldWidth - margin - particleRadius, y: body.position.y });
                Matter.Body.setVelocity(body, { x: -Math.abs(body.velocity.x) * 0.5, y: body.velocity.y });
            }

            if (body.position.y < margin + particleRadius) {
                Matter.Body.setPosition(body, { x: body.position.x, y: margin + particleRadius });
                Matter.Body.setVelocity(body, { x: body.velocity.x, y: Math.abs(body.velocity.y) * 0.5 });
            } else if (body.position.y > worldHeight - margin - particleRadius) {
                Matter.Body.setPosition(body, { x: body.position.x, y: worldHeight - margin - particleRadius });
                Matter.Body.setVelocity(body, { x: body.velocity.x, y: -Math.abs(body.velocity.y) * 0.5 });
            }

            // 3. 计算粒子到力场中心的距离
            const dx = position.x - body.position.x;
            const dy = position.y - body.position.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // 4. 根据模式应用不同的力场效果
            if (mode === 'normal') {
                // 正常模式：鼠标移动时产生排斥力
                if (distance < radius && !isMouseDown) {
                    const repelStrength = 0.001;  // 提高3倍，响应更快
                    const angle = Math.atan2(dy, dx);
                    const forceMagnitude = repelStrength * (1 - distance / radius);

                    Matter.Body.applyForce(body, body.position, {
                        x: -Math.cos(angle) * forceMagnitude * body.mass,
                        y: -Math.sin(angle) * forceMagnitude * body.mass
                    });
                }
            } else {
                // 黑洞模式
                switch (mode) {
                    case 'blackhole':
                        // 吸引力：向鼠标汇聚
                        if (distance < 5) {  // 聚拢半径改为5px
                            // 非常接近时，轻微减速让粒子聚拢在鼠标周围
                            Matter.Body.setVelocity(body, {
                                x: body.velocity.x * 0.9,
                                y: body.velocity.y * 0.9
                            });
                        } else {
                            // 正常吸引力
                            const attractionStrength = strength * 0.001;
                            const angle = Math.atan2(dy, dx);

                            Matter.Body.applyForce(body, body.position, {
                                x: Math.cos(angle) * attractionStrength * body.mass,
                                y: Math.sin(angle) * attractionStrength * body.mass
                            });
                        }
                        break;

                    case 'explosion':
                        // 爆发模式：不在这里施加力，由 triggerExplosion() 统一处理
                        break;
                }
            }
        });
    },

    /**
     * 应用自然漂移运动
     * @private
     */
    _applyNaturalDrift(body, time) {
        // 每个粒子有自己独特的漂移方向和速度
        // 使用粒子位置作为种子，生成稳定的漂移方向
        const seedX = body.position.x * 0.01;
        const seedY = body.position.y * 0.01;

        // 使用正弦函数生成平滑的漂移运动
        const driftX = Math.sin(time + seedX) * Math.cos(time * 0.7 + seedY) * 0.00002;
        const driftY = Math.cos(time + seedY) * Math.sin(time * 0.5 + seedX) * 0.00002;

        Matter.Body.applyForce(body, body.position, {
            x: driftX * body.mass,
            y: driftY * body.mass
        });
    },

    /**
     * 触发爆发模式
     * @param {number} intensity - 爆发强度
     */
    triggerExplosion(intensity = 50) {
        const { position } = this.forceField;

        this.bodies.forEach(body => {
            // 计算从中心到粒子的方向
            const dx = body.position.x - position.x;
            const dy = body.position.y - position.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx);

            // 爆发力：距离越近，爆炸越强（降低50%初始速度）
            const forceMagnitude = intensity * 0.5 * (1 - Math.min(distance / 300, 1));

            const forceX = Math.cos(angle) * forceMagnitude;
            const forceY = Math.sin(angle) * forceMagnitude;

            Matter.Body.applyForce(body, body.position, {
                x: forceX * body.mass,
                y: forceY * body.mass
            });
        });
    },

    /**
     * 获取所有粒子的物理状态
     * @returns {Array} 状态数组
     */
    getParticleStates() {
        return this.bodies.map(body => ({
            x: body.position.x,
            y: body.position.y,
            vx: body.velocity.x,
            vy: body.velocity.y,
            angle: body.angle,
            label: body.label,
            plugin: body.plugin
        }));
    },

    /**
     * 获取物理引擎统计数据
     * @returns {Object} 统计数据
     */
    getStatistics() {
        const velocities = this.bodies.map(b =>
            Math.sqrt(b.velocity.x ** 2 + b.velocity.y ** 2)
        );
        const avgVelocity = velocities.reduce((a, b) => a + b, 0) / velocities.length;
        const maxVelocity = Math.max(...velocities);

        return {
            particleCount: this.bodies.length,
            avgVelocity: avgVelocity.toFixed(2),
            maxVelocity: maxVelocity.toFixed(2),
            forceFieldStrength: this.forceField.strength.toFixed(2),
            forceFieldMode: this.forceField.mode
        };
    },

    /**
     * 更新世界尺寸（响应窗口变化）
     * @param {number} width - 新宽度
     * @param {number} height - 新高度
     */
    updateWorldSize(width, height) {
        this.config.worldWidth = width;
        this.config.worldHeight = height;

        // 移除旧边界
        Matter.World.remove(this.world, this.boundaries);

        // 创建新边界
        this._createBoundaries();
    },

    /**
     * 销毁物理引擎
     */
    destroy() {
        if (this.runner) {
            Matter.Runner.stop(this.runner);
        }
        if (this.engine) {
            Matter.Engine.clear(this.engine);
        }
        this.bodies = [];
    }
};

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PhysicsEngine;
} else {
    window.PhysicsEngine = PhysicsEngine;
}