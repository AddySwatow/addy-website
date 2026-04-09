/**
 * Mood Gravity - Interaction Controller
 * 交互控制：处理鼠标/触摸事件，长按检测，力场控制
 */

const InteractionController = {
    // 状态
    state: {
        isInitialized: false,
        isHolding: false,
        holdStartTime: 0,
        mousePosition: { x: 0, y: 0 },
        lastMousePosition: { x: 0, y: 0 },
        mouseVelocity: { x: 0, y: 0 },
        typingInterval: null
    },

    // 配置
    config: {
        holdThreshold: 500,    // 长按阈值（毫秒）
        longPressDelay: 300,   // 长按判定延迟
        mouseInfluenceRadius: 200,
        touchEnabled: true,
        holdIndicatorEnabled: true
    },

    // DOM元素引用
    elements: {
        container: null,
        holdIndicator: null
    },

    /**
     * 初始化交互控制器
     * @param {HTMLElement} container - 交互区域容器
     */
    init(container) {
        this.elements.container = container;

        // 创建长按指示器
        this._createHoldIndicator();

        // 绑定事件
        this._bindEvents();

        this.state.isInitialized = true;
        console.log('Interaction controller initialized');
    },

    /**
     * 创建长按指示器（底部提示）
     * @private
     */
    _createHoldIndicator() {
        // 检查是否已存在
        const existing = document.querySelector('.hold-indicator');
        if (existing) {
            this.elements.holdIndicator = existing;
            return;
        }
    },

    /**
     * 绑定事件监听器
     * @private
     */
    _bindEvents() {
        const container = this.elements.container;

        // 鼠标事件
        container.addEventListener('mousemove', this._onMouseMove.bind(this));
        container.addEventListener('mousedown', this._onMouseDown.bind(this));
        container.addEventListener('mouseup', this._onMouseUp.bind(this));
        container.addEventListener('mouseleave', this._onMouseLeave.bind(this));

        // 触摸事件（移动设备）
        if (this.config.touchEnabled) {
            container.addEventListener('touchstart', this._onTouchStart.bind(this));
            container.addEventListener('touchmove', this._onTouchMove.bind(this));
            container.addEventListener('touchend', this._onTouchEnd.bind(this));
        }

        // 窗口大小变化
        window.addEventListener('resize', this._onResize.bind(this));

        // 禁用默认右键菜单
        container.addEventListener('contextmenu', e => e.preventDefault());

        // 重置按钮事件
        setTimeout(() => {
            const resetBtn = document.getElementById('reset-btn');
            if (resetBtn) {
                resetBtn.addEventListener('click', () => {
                    console.log('Reset button clicked');
                    if (typeof ParticleSystem !== 'undefined' && ParticleSystem.resetUniverse) {
                        ParticleSystem.resetUniverse();
                    } else {
                        console.error('ParticleSystem not available');
                    }
                });
            }
        }, 500);
    },

    /**
     * 鼠标移动事件处理
     * @private
     */
    _onMouseMove(event) {
        const rect = this.elements.container.getBoundingClientRect();

        this.state.mousePosition = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };

        // 计算鼠标速度
        this.state.mouseVelocity = {
            x: this.state.mousePosition.x - this.state.lastMousePosition.x,
            y: this.state.mousePosition.y - this.state.lastMousePosition.y
        };

        this.state.lastMousePosition = { ...this.state.mousePosition };

        // 更新粒子系统的力场位置
        if (ParticleSystem && ParticleSystem.state.isInitialized) {
            ParticleSystem.updateForceFieldPosition(
                this.state.mousePosition.x,
                this.state.mousePosition.y
            );
            ParticleSystem.updateCursorGlow(
                this.state.mousePosition.x,
                this.state.mousePosition.y
            );
        }
    },

    /**
     * 鼠标按下事件处理
     * @private
     */
    _onMouseDown(event) {
        // 只响应左键
        if (event.button !== 0) return;

        this.state.isHolding = true;
        this.state.holdStartTime = Date.now();

        // 通知粒子系统开始长按
        if (ParticleSystem && ParticleSystem.state.isInitialized) {
            ParticleSystem.onHoldStart();
        }

        // 显示长按进度指示器
        this._showHoldProgress();
    },

    /**
     * 鼠标松开事件处理
     * @private
     */
    _onMouseUp(event) {
        if (!this.state.isHolding) return;

        this.state.isHolding = false;

        // 通知粒子系统结束长按
        if (ParticleSystem && ParticleSystem.state.isInitialized) {
            ParticleSystem.onHoldEnd();
        }

        // 隐藏长按进度指示器
        this._hideHoldProgress();
    },

    /**
     * 鼠标离开事件处理
     * @private
     */
    _onMouseLeave(event) {
        if (this.state.isHolding) {
            this._onMouseUp(event);
        }
    },

    /**
     * 触摸开始事件处理
     * @private
     */
    _onTouchStart(event) {
        const touch = event.touches[0];
        const rect = this.elements.container.getBoundingClientRect();

        this.state.mousePosition = {
            x: touch.clientX - rect.left,
            y: touch.clientY - rect.top
        };

        this.state.isHolding = true;
        this.state.holdStartTime = Date.now();

        if (ParticleSystem && ParticleSystem.state.isInitialized) {
            ParticleSystem.updateForceFieldPosition(
                this.state.mousePosition.x,
                this.state.mousePosition.y
            );
            ParticleSystem.onHoldStart();
        }

        this._showHoldProgress();
    },

    /**
     * 触摸移动事件处理
     * @private
     */
    _onTouchMove(event) {
        const touch = event.touches[0];
        const rect = this.elements.container.getBoundingClientRect();

        this.state.mousePosition = {
            x: touch.clientX - rect.left,
            y: touch.clientY - rect.top
        };

        if (ParticleSystem && ParticleSystem.state.isInitialized) {
            ParticleSystem.updateForceFieldPosition(
                this.state.mousePosition.x,
                this.state.mousePosition.y
            );
            ParticleSystem.updateCursorGlow(
                this.state.mousePosition.x,
                this.state.mousePosition.y
            );
        }
    },

    /**
     * 触摸结束事件处理
     * @private
     */
    _onTouchEnd(event) {
        this.state.isHolding = false;

        if (ParticleSystem && ParticleSystem.state.isInitialized) {
            ParticleSystem.onHoldEnd();
        }

        this._hideHoldProgress();
    },

    /**
     * 窗口大小变化事件处理
     * @private
     */
    _onResize(event) {
        const width = window.innerWidth;
        const height = window.innerHeight;

        if (ParticleSystem && ParticleSystem.state.isInitialized) {
            ParticleSystem.updateWorldSize(width, height);
        }
    },

    /**
     * 显示长按进度指示器
     * @private
     */
    _showHoldProgress() {
        const indicator = document.querySelector('.hold-indicator');
        if (!indicator) return;

        indicator.classList.add('active');
        const progressLine = indicator.querySelector('.progress-line');

        // 清除之前的动画
        progressLine.style.animation = 'none';
        progressLine.offsetHeight; // 触发重绘
        progressLine.style.animation = `hold-progress ${this.config.holdThreshold}ms linear forwards`;

        // 启动打字机效果
        this._startTypingAnimation();
    },

    /**
     * 启动打字机动画效果
     * @private
     */
    _startTypingAnimation() {
        const typingText = document.querySelector('.typing-text');
        if (!typingText) return;

        const message = "黑洞启动吸附中...准备爆破...";
        let index = 0;

        // 清除之前的定时器
        if (this.state.typingInterval) {
            clearInterval(this.state.typingInterval);
        }

        typingText.textContent = '';

        this.state.typingInterval = setInterval(() => {
            if (index < message.length) {
                typingText.textContent += message[index];
                index++;
            } else {
                // 重新开始
                typingText.textContent = '';
                index = 0;
            }

            // 如果不再按住，停止动画
            if (!this.state.isHolding) {
                clearInterval(this.state.typingInterval);
                typingText.textContent = '';
            }
        }, 150); // 打字速度
    },

    /**
     * 隐藏长按进度指示器
     * @private
     */
    _hideHoldProgress() {
        const indicator = document.querySelector('.hold-indicator');
        if (!indicator) return;

        indicator.classList.remove('active');
        const progressLine = indicator.querySelector('.progress-line');
        progressLine.style.animation = 'none';

        // 停止打字机动画
        if (this.state.typingInterval) {
            clearInterval(this.state.typingInterval);
            this.state.typingInterval = null;
        }

        const typingText = indicator.querySelector('.typing-text');
        if (typingText) {
            typingText.textContent = '';
        }
    },

    /**
     * 获取当前鼠标位置
     * @returns {Object} 鼠标位置
     */
    getMousePosition() {
        return this.state.mousePosition;
    },

    /**
     * 获取当前长按状态
     * @returns {Object} 长按状态
     */
    getHoldState() {
        return {
            isHolding: this.state.isHolding,
            holdDuration: this.state.isHolding ?
                Date.now() - this.state.holdStartTime : 0,
            progress: this.state.isHolding ?
                Math.min((Date.now() - this.state.holdStartTime) / this.config.holdThreshold, 1) : 0
        };
    },

    /**
     * 销毁交互控制器
     */
    destroy() {
        // 移除事件监听
        const container = this.elements.container;
        if (container) {
            container.removeEventListener('mousemove', this._onMouseMove);
            container.removeEventListener('mousedown', this._onMouseDown);
            container.removeEventListener('mouseup', this._onMouseUp);
            container.removeEventListener('mouseleave', this._onMouseLeave);
            container.removeEventListener('touchstart', this._onTouchStart);
            container.removeEventListener('touchmove', this._onTouchMove);
            container.removeEventListener('touchend', this._onTouchEnd);
        }

        window.removeEventListener('resize', this._onResize);

        // 移除指示器
        if (this.elements.holdIndicator) {
            this.elements.holdIndicator.remove();
        }

        this.state.isInitialized = false;
    }
};

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = InteractionController;
} else {
    window.InteractionController = InteractionController;
}