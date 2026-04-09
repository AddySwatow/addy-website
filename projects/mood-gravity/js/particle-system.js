/**
 * Mood Gravity - Particle System
 * 粒子系统核心：协调物理引擎和渲染器，管理粒子生命周期
 */

const ParticleSystem = {
    // 子系统引用
    physics: null,  // PhysicsEngine
    renderer: null, // Renderer

    // 状态
    state: {
        isInitialized: false,
        isRunning: false,
        particleCount: 500,
        currentMode: 'normal', // 'normal', 'blackhole', 'explosion'
        holdStartTime: 0,
        holdDuration: 0,
        transitionProgress: 0,
        isMouseDown: false,  // 跟踪鼠标是否按下
        explosionTriggered: false,  // 爆发是否已触发，防止重复
        remainingParticles: 500,  // 剩余粒子数量
        isCleared: false,  // 是否已清空
        explosionCount: 0,  // 爆发次数计数
        fadingParticles: []  // 正在淡出的粒子列表
    },

    // 配置
    config: {
        particleCount: 500,
        holdThreshold: 500, // 长按阈值（毫秒）
        blackHoleStrength: 0.8,
        explosionStrength: 2.0,
        transitionDuration: 500 // 过渡动画时长（毫秒）
    },

    /**
     * 初始化粒子系统
     * @param {HTMLElement} container - 渲染容器
     */
    init(container) {
        // 计算扩展后的世界尺寸
        const worldWidth = container.clientWidth * 1.3;
        const worldHeight = container.clientHeight * 1.3;

        // 初始化物理引擎
        this.physics = PhysicsEngine;
        this.physics.init({
            worldWidth: worldWidth,
            worldHeight: worldHeight
        });

        // 初始化渲染器
        this.renderer = Renderer;
        this.renderer.init(container);

        // 生成词汇列表
        const wordList = WordDatabase.generateWordList(this.config.particleCount);

        // 创建物理体和3D粒子
        const physicsBodies = this.physics.createParticleBodies(wordList);
        this.renderer.createParticles(wordList, physicsBodies);

        // 初始化剩余粒子数量
        this.state.remainingParticles = this.config.particleCount;
        this.state.isCleared = false;

        // 标记初始化完成
        this.state.isInitialized = true;

        console.log(`Particle system initialized with ${this.config.particleCount} particles`);
    },

    /**
     * 启动渲染循环
     */
    start() {
        if (!this.state.isInitialized) {
            console.error('Particle system not initialized');
            return;
        }

        this.state.isRunning = true;
        this._animate();

        console.log('Particle system started');
    },

    /**
     * 停止渲染循环
     */
    stop() {
        this.state.isRunning = false;
        console.log('Particle system stopped');
    },

    /**
     * 主渲染循环
     * @private
     */
    _animate() {
        if (!this.state.isRunning) return;

        requestAnimationFrame(() => this._animate());

        // 1. 应用力场效果
        this._applyCurrentForceField();

        // 2. 更新粒子位置（从物理引擎同步到渲染器）
        this.renderer.updateParticles();

        // 3. 更新淡出粒子状态
        this._updateFadingParticles();

        // 4. 渲染帧
        this.renderer.render();
    },

    /**
     * 根据当前模式应用力场
     * @private
     */
    _applyCurrentForceField() {
        const { currentMode, holdDuration, transitionProgress, isMouseDown, explosionTriggered } = this.state;

        // 计算力场强度
        let strength = 0;

        if (currentMode === 'blackhole') {
            // 黑洞模式：强度随时间增长（过渡动画）
            strength = this.config.blackHoleStrength * transitionProgress;
        } else if (currentMode === 'explosion') {
            // 爆发模式：瞬间高强度
            strength = this.config.explosionStrength;
        }

        // 设置力场参数
        this.physics.setForceFieldMode(currentMode, strength);
        this.physics.applyForceField(isMouseDown);

        // 爆发模式：只触发一次
        if (currentMode === 'explosion' && !explosionTriggered) {
            this.state.explosionTriggered = true;
            this.state.explosionCount++;  // 增加爆发计数
            this.physics.triggerExplosion(this.config.explosionStrength * 10);

            // 延迟回归正常模式（给爆发效果一点时间）
            setTimeout(() => {
                this._setMode('normal');
            }, 100);

            // 延迟1秒后开始移除粒子（带淡出和破裂效果）
            setTimeout(() => {
                const removeCount = this._getRemoveCount();
                this._startFadeOutParticles(removeCount);
            }, 1000);
        }
    },

    /**
     * 根据爆发次数计算要移除的粒子数量
     * @returns {number} 要移除的数量
     * @private
     */
    _getRemoveCount() {
        const count = this.state.explosionCount;
        const remaining = this.state.remainingParticles;

        if (count <= 4) {
            return Math.min(100, remaining);
        } else if (count <= 6) {
            return Math.min(40, remaining);
        } else {
            return remaining; // 第7次全部消失
        }
    },

    /**
     * 开始粒子淡出和破裂效果
     * @param {number} count - 要移除的数量
     * @private
     */
    _startFadeOutParticles(count) {
        if (this.state.isCleared) return;

        const actualRemove = Math.min(count, this.state.remainingParticles);
        if (actualRemove <= 0) return;

        // 随机选择要移除的粒子（存储粒子对象引用而非索引）
        const particlesToRemove = [];
        const availableParticles = [...this.renderer.particles]; // 复制数组

        // 打乱顺序
        for (let i = availableParticles.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [availableParticles[i], availableParticles[j]] = [availableParticles[j], availableParticles[i]];
        }

        // 取前 actualRemove 个
        for (let i = 0; i < actualRemove && i < availableParticles.length; i++) {
            particlesToRemove.push(availableParticles[i]);
        }

        // 开始淡出效果（2秒）
        particlesToRemove.forEach(particle => {
            if (particle && !particle.userData.fading) {
                particle.userData.fading = true;
                particle.userData.fadeStartTime = Date.now();
                particle.userData.fadeDuration = 2000; // 2秒淡出
                particle.userData.burstStartTime = null;
                this.state.fadingParticles.push(particle); // 存储粒子对象引用
            }
        });

        console.log(`Starting fade out for ${particlesToRemove.length} particles, explosion #${this.state.explosionCount}`);
    },

    /**
     * 更新淡出粒子状态（每帧调用）
     * @private
     */
    _updateFadingParticles() {
        const now = Date.now();
        const toRemove = [];

        this.state.fadingParticles.forEach((particle, i) => {
            if (!particle || !particle.userData) {
                toRemove.push(i);
                return;
            }

            const fadeStart = particle.userData.fadeStartTime;
            const fadeDuration = particle.userData.fadeDuration;
            const elapsed = now - fadeStart;

            if (elapsed < fadeDuration) {
                // 淡出阶段（2秒）：逐渐透明
                const opacity = 1 - (elapsed / fadeDuration);
                this._setParticleOpacity(particle, opacity);
            } else if (particle.userData.burstStartTime === null) {
                // 淡出完成，开始破裂阶段（0.5秒）
                particle.userData.burstStartTime = now;
                this._startBurstEffect(particle);
            } else {
                // 破裂阶段
                const burstElapsed = now - particle.userData.burstStartTime;
                if (burstElapsed >= 500) {
                    // 破裂完成，标记移除
                    toRemove.push(i);
                    this._removeParticleCompletely(particle);
                } else {
                    // 更新破裂动画
                    this._updateBurstEffect(particle, burstElapsed / 500);
                }
            }
        });

        // 移除已完成的粒子（从后往前删除，避免索引问题）
        toRemove.sort((a, b) => b - a).forEach(i => {
            this.state.fadingParticles.splice(i, 1);
        });
    },

    /**
     * 设置粒子透明度
     * @private
     */
    _setParticleOpacity(particle, opacity) {
        const originalOpacity = particle.userData.originalOpacity || 0.5;
        if (particle.userData.sphereMesh) {
            particle.userData.sphereMesh.material.opacity = opacity * originalOpacity;
        }
        if (particle.userData.textSprite) {
            particle.userData.textSprite.material.opacity = opacity;
        }
    },

    /**
     * 开始破裂效果
     * @private
     */
    _startBurstEffect(particle) {
        // 快速放大效果
        particle.userData.originalScale = particle.scale.x;
        particle.userData.burstScale = 1;
    },

    /**
     * 更新破裂动画
     * @private
     */
    _updateBurstEffect(particle, progress) {
        // 泡泡破裂效果：快速放大然后消失
        const scale = 1 + progress * 2; // 放大到3倍
        particle.scale.set(scale, scale, scale);

        // 同时快速消失
        this._setParticleOpacity(particle, (1 - progress) * 0.5);
    },

    /**
     * 完全移除粒子
     * @private
     */
    _removeParticleCompletely(particle) {
        if (!particle) return;

        // 查找粒子在数组中的索引
        const rendererIndex = this.renderer.particles.indexOf(particle);
        if (rendererIndex === -1) return; // 粒子已被移除

        // 通过物理体引用查找对应的物理体索引
        const body = particle.userData.physicsBody;
        const physicsIndex = this.physics.bodies.indexOf(body);

        // 移除物理体
        if (physicsIndex !== -1 && body && this.physics.world) {
            Matter.World.remove(this.physics.world, body);
            this.physics.bodies.splice(physicsIndex, 1);
        }

        // 移除渲染对象
        if (this.renderer.scene) {
            this.renderer.scene.remove(particle);
            if (particle.userData.sphereMesh) {
                particle.userData.sphereMesh.geometry.dispose();
                particle.userData.sphereMesh.material.dispose();
            }
            if (particle.userData.textSprite) {
                particle.userData.textSprite.material.map.dispose();
                particle.userData.textSprite.material.dispose();
            }
        }

        // 使用 filter 移除粒子，避免索引错位问题
        this.renderer.particles = this.renderer.particles.filter(p => p !== particle);

        // 更新剩余粒子数量
        this.state.remainingParticles--;
        console.log(`Particle removed, ${this.state.remainingParticles} remaining`);

        // 检查是否全部清除
        if (this.state.remainingParticles <= 0) {
            this._showCongrats();
        }
    },

    /**
     * 显示恭喜画面
     * @private
     */
    _showCongrats() {
        this.state.isCleared = true;
        console.log('All particles cleared! Showing congratulations.');

        // 隐藏底部提示
        const holdIndicator = document.querySelector('.hold-indicator');
        if (holdIndicator) {
            holdIndicator.style.display = 'none';
        }

        // 显示恭喜画面
        const congratsOverlay = document.getElementById('congrats-overlay');
        if (congratsOverlay) {
            congratsOverlay.classList.add('show');
        }
    },

    /**
     * 重置情绪宇宙
     */
    resetUniverse() {
        console.log('Resetting universe...');

        // 隐藏恭喜画面
        const congratsOverlay = document.getElementById('congrats-overlay');
        if (congratsOverlay) {
            congratsOverlay.classList.remove('show');
        }

        // 显示底部提示
        const holdIndicator = document.querySelector('.hold-indicator');
        if (holdIndicator) {
            holdIndicator.style.display = 'flex';
        }

        // 停止当前运行
        this.state.isRunning = false;

        // 清理现有粒子
        if (this.physics && this.physics.bodies) {
            this.physics.bodies.forEach(body => {
                if (this.physics.world) {
                    Matter.World.remove(this.physics.world, body);
                }
            });
            this.physics.bodies = [];
        }

        if (this.renderer && this.renderer.particles) {
            this.renderer.particles.forEach(particle => {
                if (this.renderer.scene) {
                    this.renderer.scene.remove(particle);
                }
                if (particle.userData.sphereMesh) {
                    particle.userData.sphereMesh.geometry.dispose();
                    particle.userData.sphereMesh.material.dispose();
                }
                if (particle.userData.textSprite) {
                    particle.userData.textSprite.material.map.dispose();
                    particle.userData.textSprite.material.dispose();
                }
            });
            this.renderer.particles = [];
        }

        // 重置状态
        this.state.remainingParticles = this.config.particleCount;
        this.state.isCleared = false;
        this.state.explosionCount = 0;
        this.state.fadingParticles = [];
        this.state.currentMode = 'normal';
        this.state.isRunning = true;

        // 重新生成粒子
        const wordList = WordDatabase.generateWordList(this.config.particleCount);
        const physicsBodies = this.physics.createParticleBodies(wordList);
        this.renderer.createParticles(wordList, physicsBodies);

        console.log('Universe reset complete!');
    },

    /**
     * 设置当前模式
     * @param {string} mode - 'normal', 'blackhole', 'explosion'
     * @private
     */
    _setMode(mode) {
        this.state.currentMode = mode;

        // 回归正常模式时重置爆发标志
        if (mode === 'normal') {
            this.state.transitionProgress = 0;
            this.state.explosionTriggered = false;
        } else {
            // 启动过渡动画
            this.state.transitionProgress = 0;
            this._animateTransition(mode);
        }

        console.log(`Mode changed to: ${mode}`);
    },

    /**
     * 过渡动画
     * @private
     */
    _animateTransition(targetMode) {
        const startTime = Date.now();
        const duration = this.config.transitionDuration;

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // 使用ease-in-out曲线
            this.state.transitionProgress = progress < 0.5 ?
                2 * progress * progress :
                1 - Math.pow(-2 * progress + 2, 2) / 2;

            if (progress < 1 && this.state.currentMode === targetMode) {
                requestAnimationFrame(animate);
            }
        };

        animate();
    },

    /**
     * 处理长按开始
     */
    onHoldStart() {
        this.state.holdStartTime = Date.now();
        this.state.holdDuration = 0;
        this.state.isMouseDown = true;  // 标记鼠标按下

        // 立即进入黑洞模式
        this._setMode('blackhole');

        // 启动计时检测
        this._checkHoldDuration();
    },

    /**
     * 处理长按结束
     */
    onHoldEnd() {
        this.state.isMouseDown = false;  // 标记鼠标松开

        // 松开时触发爆发模式
        if (this.state.currentMode === 'blackhole') {
            this._setMode('explosion');
        } else {
            this._setMode('normal');
        }

        this.state.holdStartTime = 0;
        this.state.holdDuration = 0;
    },

    /**
     * 检测长按时长
     * @private
     */
    _checkHoldDuration() {
        if (this.state.holdStartTime === 0) return;

        this.state.holdDuration = Date.now() - this.state.holdStartTime;

        // 长按超过阈值，进入黑洞模式
        if (this.state.holdDuration >= this.config.holdThreshold &&
            this.state.currentMode === 'normal') {
            this._setMode('blackhole');
        }

        // 继续检测
        if (this.state.holdStartTime > 0) {
            requestAnimationFrame(() => this._checkHoldDuration());
        }
    },

    /**
     * 更新力场位置（跟随鼠标）
     * @param {number} x - 鼠标X坐标
     * @param {number} y - 鼠标Y坐标
     */
    updateForceFieldPosition(x, y) {
        this.physics.updateForceFieldPosition(x, y);
    },

    /**
     * 更新光晕效果
     * @param {number} x - 鼠标X坐标
     * @param {number} y - 鼠标Y坐标
     */
    updateCursorGlow(x, y) {
        const { currentMode, transitionProgress } = this.state;

        // 计算引力强度显示
        let strength = 0;
        if (currentMode === 'blackhole') {
            strength = transitionProgress;
        }

        this.renderer.updateCursorGlow(x, y, strength, currentMode);
    },

    /**
     * 获取统计数据
     * @returns {Object} 统计数据
     */
    getStatistics() {
        const physicsStats = this.physics.getStatistics();

        return {
            ...physicsStats,
            mode: this.state.currentMode,
            holdDuration: this.state.holdDuration,
            transitionProgress: Math.round(this.state.transitionProgress * 100) + '%'
        };
    },

    /**
     * 更新统计数据
     * @private
     */
    _updateStatistics() {
        // 统计数据已移除UI显示，仅保留内部计算
    },

    /**
     * 响应窗口大小变化
     * @param {number} width - 新宽度
     * @param {number} height - 新高度
     */
    updateWorldSize(width, height) {
        // 扩展130%
        this.physics.updateWorldSize(width * 1.3, height * 1.3);
        this.renderer.updateSize(width * 1.3, height * 1.3);
    },

    /**
     * 重置粒子位置（重新随机分布）
     */
    resetParticles() {
        const { worldWidth, worldHeight } = this.physics.config;
        const margin = 100;

        this.physics.bodies.forEach(body => {
            const x = margin + Math.random() * (worldWidth - margin * 2);
            const y = margin + Math.random() * (worldHeight - margin * 2);

            Matter.Body.setPosition(body, { x, y });
            Matter.Body.setVelocity(body, { x: 0, y: 0 });
        });

        this._setMode('normal');
        console.log('Particles reset');
    },

    /**
     * 销毁粒子系统
     */
    destroy() {
        this.stop();
        this.physics.destroy();
        this.renderer.destroy();
        this.state.isInitialized = false;

        console.log('Particle system destroyed');
    }
};

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ParticleSystem;
} else {
    window.ParticleSystem = ParticleSystem;
}