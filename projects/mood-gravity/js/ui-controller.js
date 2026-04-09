/**
 * Mood Gravity - UI Controller
 * UI控制器：管理导航栏、模式面板、数据卡片的显示与交互
 */

const UIController = {
    // 状态
    state: {
        isInitialized: false,
        leftPanelVisible: true,
        rightPanelVisible: true,
        topNavVisible: true,
        currentMode: 'normal'
    },

    // DOM元素引用
    elements: {
        topNav: null,
        leftPanel: null,
        rightCard: null,
        modeButtons: null,
        settingsButton: null,
        toggleButtons: null,
        statsDisplay: null
    },

    // 统计数据
    stats: {
        particleCount: 0,
        avgVelocity: 0,
        maxVelocity: 0,
        mode: 'normal',
        transitionProgress: '0%'
    },

    /**
     * 初始化UI控制器
     */
    init() {
        this._cacheElements();
        this._bindEvents();
        this._createToggleButtons();

        this.state.isInitialized = true;
        console.log('UI controller initialized');
    },

    /**
     * 缓存DOM元素引用
     * @private
     */
    _cacheElements() {
        this.elements.topNav = document.getElementById('top-nav');
        this.elements.leftPanel = document.getElementById('left-panel');
        this.elements.rightCard = document.getElementById('stats-card');
        this.elements.modeButtons = document.querySelectorAll('.mode-btn');
        this.elements.settingsButton = document.getElementById('settings-btn');
        this.elements.statsDisplay = {
            particleCount: document.getElementById('stat-particles'),
            avgVelocity: document.getElementById('stat-velocity'),
            mode: document.getElementById('stat-mode'),
            stability: document.getElementById('stat-stability'),
            stabilityBar: document.getElementById('stat-stability-bar')
        };
    },

    /**
     * 绑定事件监听器
     * @private
     */
    _bindEvents() {
        // 模式切换按钮
        this.elements.modeButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const mode = btn.dataset.mode;
                this._handleModeChange(mode);
            });
        });

        // 设置按钮
        if (this.elements.settingsButton) {
            this.elements.settingsButton.addEventListener('click', () => {
                this._toggleRightPanel();
            });
        }

        // 重新校准按钮
        const recalibrateBtn = document.getElementById('recalibrate-btn');
        if (recalibrateBtn) {
            recalibrateBtn.addEventListener('click', () => {
                if (ParticleSystem && ParticleSystem.state.isInitialized) {
                    ParticleSystem.resetParticles();
                }
            });
        }
    },

    /**
     * 创建面板切换按钮
     * @private
     */
    _createToggleButtons() {
        // 左侧面板切换按钮
        const leftToggle = document.createElement('button');
        leftToggle.id = 'left-panel-toggle';
        leftToggle.className = 'panel-toggle left-toggle';
        leftToggle.innerHTML = `<span class="material-symbols-outlined">menu</span>`;
        leftToggle.addEventListener('click', () => this._toggleLeftPanel());
        document.body.appendChild(leftToggle);
        this.elements.leftToggle = leftToggle;

        // 右侧面板切换按钮（在设置按钮旁边）
        // 使用现有的设置按钮
    },

    /**
     * 处理模式切换
     * @private
     */
    _handleModeChange(mode) {
        this.state.currentMode = mode;

        // 更新按钮状态
        this.elements.modeButtons.forEach(btn => {
            const isActive = btn.dataset.mode === mode;
            btn.classList.toggle('active', isActive);

            // 更新图标颜色
            const icon = btn.querySelector('.material-symbols-outlined');
            if (icon) {
                icon.style.color = isActive ? '#5f5e5e' : '#babaae';
            }

            // 更新文字颜色
            const text = btn.querySelector('.mode-text');
            if (text) {
                text.style.color = isActive ? '#5f5e5e' : '#babaae';
            }
        });

        // 通知粒子系统切换模式
        // 注意：这里的点击切换与长按触发是两种交互方式
        // 点击切换主要用于调试/演示
        if (ParticleSystem && ParticleSystem.state.isInitialized) {
            if (mode === 'normal') {
                ParticleSystem._setMode('normal');
            } else if (mode === 'blackhole') {
                ParticleSystem._setMode('blackhole');
            } else if (mode === 'explosion') {
                ParticleSystem._setMode('explosion');
            }
        }
    },

    /**
     * 切换左侧面板显示
     * @private
     */
    _toggleLeftPanel() {
        this.state.leftPanelVisible = !this.state.leftPanelVisible;

        if (this.elements.leftPanel) {
            this.elements.leftPanel.classList.toggle('hidden', !this.state.leftPanelVisible);
        }

        // 更新切换按钮图标
        if (this.elements.leftToggle) {
            const icon = this.elements.leftToggle.querySelector('.material-symbols-outlined');
            if (icon) {
                icon.textContent = this.state.leftPanelVisible ? 'menu' : 'menu_open';
            }
        }
    },

    /**
     * 切换右侧面板显示
     * @private
     */
    _toggleRightPanel() {
        this.state.rightPanelVisible = !this.state.rightPanelVisible;

        if (this.elements.rightCard) {
            this.elements.rightCard.classList.toggle('hidden', !this.state.rightPanelVisible);
        }
    },

    /**
     * 切换顶部导航显示
     */
    toggleTopNav() {
        this.state.topNavVisible = !this.state.topNavVisible;

        if (this.elements.topNav) {
            this.elements.topNav.classList.toggle('hidden', !this.state.topNavVisible);
        }
    },

    /**
     * 更新统计数据显示
     * @param {Object} stats - 统计数据对象
     */
    updateStats(stats) {
        this.stats = stats;

        // 更新DOM显示
        if (this.elements.statsDisplay.particleCount) {
            this.elements.statsDisplay.particleCount.textContent = stats.particleCount || 500;
        }

        if (this.elements.statsDisplay.avgVelocity) {
            this.elements.statsDisplay.avgVelocity.textContent =
                parseFloat(stats.avgVelocity || 0).toFixed(2);
        }

        if (this.elements.statsDisplay.mode) {
            this.elements.statsDisplay.mode.textContent =
                this._formatMode(stats.mode || 'normal');
        }

        // 计算稳定性（基于平均速度）
        const stability = Math.max(0, 100 - (parseFloat(stats.avgVelocity) * 10));
        if (this.elements.statsDisplay.stability) {
            this.elements.statsDisplay.stability.textContent =
                Math.round(stability) + '%';
        }

        if (this.elements.statsDisplay.stabilityBar) {
            this.elements.statsDisplay.stabilityBar.style.width =
                stability + '%';
        }
    },

    /**
     * 格式化模式名称
     * @private
     */
    _formatMode(mode) {
        const modeNames = {
            'normal': '常规',
            'blackhole': '黑洞',
            'explosion': '爆发'
        };
        return modeNames[mode] || mode;
    },

    /**
     * 更新光晕强度指示
     * @param {number} strength - 引力强度（0-1）
     */
    updateGlowStrength(strength) {
        // 可以在右侧卡片中添加一个光晕强度指示器
        const glowIndicator = document.getElementById('glow-strength');
        if (glowIndicator) {
            glowIndicator.textContent = Math.round(strength * 100) + '%';
        }
    },

    /**
     * 显示提示信息
     * @param {string} message - 提示信息
     * @param {number} duration - 显示时长（毫秒）
     */
    showToast(message, duration = 2000) {
        const toast = document.createElement('div');
        toast.className = 'toast-message';
        toast.textContent = message;

        document.body.appendChild(toast);

        // 动画显示
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        // 自动消失
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    },

    /**
     * 销毁UI控制器
     */
    destroy() {
        // 移除事件监听
        this.elements.modeButtons.forEach(btn => {
            btn.removeEventListener('click', this._handleModeChange);
        });

        if (this.elements.settingsButton) {
            this.elements.settingsButton.removeEventListener('click', this._toggleRightPanel);
        }

        if (this.elements.leftToggle) {
            this.elements.leftToggle.remove();
        }

        this.state.isInitialized = false;
    }
};

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UIController;
} else {
    window.UIController = UIController;
}