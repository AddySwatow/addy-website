/**
 * Mood Gravity - Main Entry Point
 * 主入口：初始化所有模块并启动应用
 */

(function() {
    'use strict';

    // 应用状态
    const App = {
        isInitialized: false,
        container: null,

        /**
         * 初始化应用
         */
        init() {
            console.log('Mood Gravity initializing...');

            // 获取渲染容器
            this.container = document.getElementById('canvas-container');
            if (!this.container) {
                console.error('Canvas container not found');
                return;
            }

            // 设置容器样式
            this._setupContainer();

            // 加载依赖库
            this._loadDependencies()
                .then(() => {
                    // 初始化各模块
                    this._initModules();
                    // 启动应用
                    this._start();
                })
                .catch(error => {
                    console.error('Failed to load dependencies:', error);
                });
        },

        /**
         * 设置容器样式
         * @private
         */
        _setupContainer() {
            const container = this.container;
            container.style.width = '100vw';
            container.style.height = '100vh';
            container.style.position = 'fixed';
            container.style.top = '0';
            container.style.left = '0';
            container.style.overflow = 'hidden';
        },

        /**
         * 加载依赖库（Three.js 和 Matter.js）
         * @private
         */
        _loadDependencies() {
            return new Promise((resolve, reject) => {
                // Three.js
                const threeScript = document.createElement('script');
                threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
                threeScript.onload = () => console.log('Three.js loaded');

                // Matter.js
                const matterScript = document.createElement('script');
                matterScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.19.0/matter.min.js';
                matterScript.onload = () => console.log('Matter.js loaded');

                // 依次加载
                threeScript.onload = () => {
                    document.head.appendChild(matterScript);
                    matterScript.onload = resolve;
                    matterScript.onerror = reject;
                };
                threeScript.onerror = reject;

                document.head.appendChild(threeScript);
            });
        },

        /**
         * 初始化各模块
         * @private
         */
        _initModules() {
            // 1. 初始化粒子系统
            ParticleSystem.init(this.container);

            // 2. 初始化交互控制器
            InteractionController.init(this.container);

            this.isInitialized = true;
            console.log('All modules initialized');
        },

        /**
         * 启动应用
         * @private
         */
        _start() {
            // 启动粒子系统渲染循环
            ParticleSystem.start();

            console.log('情绪引力场已启动');
        },

        /**
         * 销毁应用
         */
        destroy() {
            if (!this.isInitialized) return;

            InteractionController.destroy();
            ParticleSystem.destroy();

            this.isInitialized = false;
            console.log('Mood Gravity destroyed');
        }
    };

    // DOM加载完成后启动应用
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => App.init());
    } else {
        App.init();
    }

    // 导出App对象供外部访问
    window.MoodGravityApp = App;

})();