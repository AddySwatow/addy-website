/**
 * Mood Gravity - Renderer
 * Three.js渲染器封装：管理3D球体粒子渲染和光晕效果
 */

const Renderer = {
    // Three.js核心组件
    scene: null,
    camera: null,
    renderer: null,

    // 粒子 meshes
    particles: [],

    // 鼠标光晕
    cursorGlow: null,

    // 配置参数
    config: {
        backgroundColor: 0xfffcf6, // 奶油白
        cameraZ: 1000,
        sphereDetail: 32, // 球体细节程度
        glowSize: 400,
        worldWidth: window.innerWidth,
        worldHeight: window.innerHeight,
        // 光晕颜色梯度（与黑白灰粒子配色协调）
        glowColors: {
            normal: 0x3d3d3d,    // 正常模式：深灰
            blackhole: 0x1a1a1a  // 黑洞模式：黑色
        },
        // 缓存的光晕纹理
        cachedGlowTextures: {
            normal: null,
            blackhole: null
        }
    },

    /**
     * 初始化渲染器
     * @param {HTMLElement} container - 渲染容器DOM元素
     */
    init(container) {
        const width = container.clientWidth * 1.3;   // 扩展130%
        const height = container.clientHeight * 1.3; // 扩展130%

        // 存储世界尺寸
        this.config.worldWidth = width;
        this.config.worldHeight = height;

        // 创建场景
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(this.config.backgroundColor);

        // 创建相机（正交相机，适合2D布局的3D效果）
        this.camera = new THREE.OrthographicCamera(
            -width / 2, width / 2,
            height / 2, -height / 2,
            0.1, 2000
        );
        this.camera.position.z = this.config.cameraZ;

        // 创建WebGL渲染器
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(this.renderer.domElement);

        // 创建光源
        this._createLights();

        // 创建鼠标光晕
        this._createCursorGlow();

        console.log('Renderer initialized');
    },

    /**
     * 创建光源
     * @private
     */
    _createLights() {
        // 环境光：整体照明
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        // 主光源：从右上方向
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(500, 500, 1000);
        this.scene.add(directionalLight);

        // 辅助光源：从左下方向（增加立体感）
        const secondaryLight = new THREE.DirectionalLight(0xffffff, 0.3);
        secondaryLight.position.set(-300, -300, 500);
        this.scene.add(secondaryLight);
    },

    /**
     * 创建鼠标光晕
     * @private
     */
    _createCursorGlow() {
        // 使用Sprite创建圆形光晕
        const glowTexture = this._createGlowTexture();
        const glowMaterial = new THREE.SpriteMaterial({
            map: glowTexture,
            transparent: true,
            opacity: 0.3,
            depthTest: false
        });

        this.cursorGlow = new THREE.Sprite(glowMaterial);
        this.cursorGlow.scale.set(this.config.glowSize, this.config.glowSize, 1);
        this.cursorGlow.position.set(0, 0, 10); // 置于最上层

        this.scene.add(this.cursorGlow);
    },

    /**
     * 创建光晕纹理（带缓存）
     * @private
     */
    _createGlowTexture(color = this.config.glowColors.normal) {
        // 确定缓存key
        let cacheKey = null;
        if (color === this.config.glowColors.normal) {
            cacheKey = 'normal';
        } else if (color === this.config.glowColors.blackhole) {
            cacheKey = 'blackhole';
        }

        // 检查缓存
        if (cacheKey && this.config.cachedGlowTextures[cacheKey]) {
            return this.config.cachedGlowTextures[cacheKey];
        }

        // 创建新纹理
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;

        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = canvas.width / 2;

        // 创建径向渐变
        const gradient = ctx.createRadialGradient(
            centerX, centerY, 0,
            centerX, centerY, radius
        );

        // 转换颜色为CSS格式
        const colorHex = '#' + color.toString(16).padStart(6, '0');
        gradient.addColorStop(0, colorHex + 'aa'); // 中心较亮
        gradient.addColorStop(0.5, colorHex + '44'); // 中间半透明
        gradient.addColorStop(1, colorHex + '00');  // 边缘透明

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.fill();

        const texture = new THREE.CanvasTexture(canvas);

        // 存入缓存
        if (cacheKey) {
            this.config.cachedGlowTextures[cacheKey] = texture;
        }

        return texture;
    },

    /**
     * 创建词汇粒子3D对象
     * @param {Object} wordData - 词汇数据
     * @param {Object} physicsBody - 对应的物理体（用于位置同步）
     * @returns {THREE.Group} 3D粒子组
     */
    createParticle(wordData, physicsBody) {
        const { text, type, color, size } = wordData;

        // 创建组对象（包含球体和文字）
        const group = new THREE.Group();

        // 1. 创建3D球体
        const sphereGeometry = new THREE.SphereGeometry(
            size / 2,
            this.config.sphereDetail,
            this.config.sphereDetail
        );

        // 球体材质：半透明，带光泽效果
        const sphereMaterial = new THREE.MeshStandardMaterial({
            color: color,
            transparent: true,
            opacity: type === 'positive' ? 0.3 : (type === 'negative' ? 0.7 : 0.5),
            roughness: 0.5,
            metalness: 0.1,
            depthWrite: false
        });

        const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
        group.add(sphereMesh);

        // 2. 创建文字标签（使用Sprite）
        const textSprite = this._createTextSprite(text, size, type);
        textSprite.position.z = size / 2 + 5; // 文字置于球体前方
        group.add(textSprite);

        // 3. 存储引用数据
        group.userData = {
            physicsBody: physicsBody,
            wordData: wordData,
            sphereMesh: sphereMesh,
            textSprite: textSprite,
            originalOpacity: type === 'positive' ? 0.3 : (type === 'negative' ? 0.7 : 0.5)
        };

        // 初始位置（从物理体同步）
        this._syncPositionFromPhysics(group);

        this.scene.add(group);
        this.particles.push(group);

        return group;
    },

    /**
     * 创建文字Sprite
     * @private
     */
    _createTextSprite(text, size, type) {
        const canvas = document.createElement('canvas');
        const canvasSize = Math.max(256, size * 2);
        canvas.width = canvasSize;
        canvas.height = canvasSize;

        const ctx = canvas.getContext('2d');

        // 设置字体
        const fontSize = Math.floor(size * 2.5);
        ctx.font = `bold ${fontSize}px "Noto Serif SC", "Noto Serif", serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // 文字颜色跟随粒子颜色
        let textColor;
        switch (type) {
            case 'negative':
                textColor = '#1a1a1a'; // 黑色
                break;
            case 'positive':
                textColor = '#4a4a4a'; // 灰色
                break;
            case 'neutral':
                textColor = '#2d2d2d'; // 黑灰色
                break;
            default:
                textColor = '#1a1a1a';
        }

        // 绘制文字（带阴影增加清晰度）
        ctx.shadowColor = 'rgba(255, 252, 246, 0.8)';
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
        ctx.fillStyle = textColor;
        ctx.fillText(text, canvasSize / 2, canvasSize / 2);

        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;

        const material = new THREE.SpriteMaterial({
            map: texture,
            transparent: true,
            depthTest: false
        });

        const sprite = new THREE.Sprite(material);
        sprite.scale.set(canvasSize / 2, canvasSize / 2, 1);

        return sprite;
    },

    /**
     * 批量创建粒子
     * @param {Array} wordList - 词汇列表
     * @param {Array} physicsBodies - 物理体列表
     */
    createParticles(wordList, physicsBodies) {
        wordList.forEach((wordData, index) => {
            this.createParticle(wordData, physicsBodies[index]);
        });
    },

    /**
     * 从物理体同步位置到3D对象
     * @private
     */
    _syncPositionFromPhysics(group) {
        const body = group.userData.physicsBody;
        if (!body) return;

        // Matter.js坐标转换到Three.js坐标
        // Matter: 左上为原点，Y向下
        // Three: 中心为原点，Y向上
        const { worldWidth, worldHeight } = this.config;

        group.position.x = body.position.x - worldWidth / 2;
        group.position.y = -body.position.y + worldHeight / 2;

        // Z轴：根据粒子类型微调（增加层次感）
        const zOffset = group.userData.wordData.type === 'positive' ? -10 :
                        group.userData.wordData.type === 'negative' ? 10 : 0;
        group.position.z = zOffset;
    },

    /**
     * 更新所有粒子位置（每帧调用）
     */
    updateParticles() {
        this.particles.forEach(group => {
            this._syncPositionFromPhysics(group);

            // 负面词震动效果
            if (group.userData.wordData.type === 'negative') {
                const vibrationOffset = Math.sin(Date.now() * 0.01) * 2;
                group.position.x += vibrationOffset;
                group.position.y += vibrationOffset * 0.5;
            }
        });
    },

    /**
     * 更新光晕位置和颜色
     * @param {number} x - 鼠标X坐标（屏幕坐标）
     * @param {number} y - 鼠标Y坐标（屏幕坐标）
     * @param {number} strength - 引力强度（0-1）
     * @param {string} mode - 当前模式
     */
    updateCursorGlow(x, y, strength, mode) {
        const { worldWidth, worldHeight } = this.config;

        // 转换坐标
        this.cursorGlow.position.x = x - worldWidth / 2;
        this.cursorGlow.position.y = -y + worldHeight / 2;

        // 根据模式决定颜色和大小
        const color = mode === 'blackhole' ?
            this.config.glowColors.blackhole :
            this.config.glowColors.normal;

        // 黑洞模式光晕更大更明显
        if (mode === 'blackhole') {
            this.cursorGlow.material.opacity = 0.6;
            this.cursorGlow.scale.set(
                this.config.glowSize * 1.8,
                this.config.glowSize * 1.8,
                1
            );
        } else {
            // 正常模式下光晕较小较淡
            this.cursorGlow.material.opacity = 0.15;
            this.cursorGlow.scale.set(
                this.config.glowSize * 0.8,
                this.config.glowSize * 0.8,
                1
            );
        }

        // 更新光晕纹理颜色
        this.cursorGlow.material.map = this._createGlowTexture(color);
    },

    /**
     * 渲染帧
     */
    render() {
        this.renderer.render(this.scene, this.camera);
    },

    /**
     * 更新渲染器尺寸
     * @param {number} width - 新宽度
     * @param {number} height - 新高度
     */
    updateSize(width, height) {
        // 更新相机
        this.camera.left = -width / 2;
        this.camera.right = width / 2;
        this.camera.top = height / 2;
        this.camera.bottom = -height / 2;
        this.camera.updateProjectionMatrix();

        // 更新渲染器
        this.renderer.setSize(width, height);
    },

    /**
     * 销毁渲染器
     */
    destroy() {
        // 清理粒子
        this.particles.forEach(group => {
            this.scene.remove(group);
            group.userData.sphereMesh.geometry.dispose();
            group.userData.sphereMesh.material.dispose();
            group.userData.textSprite.material.map.dispose();
            group.userData.textSprite.material.dispose();
        });

        // 清理光晕
        if (this.cursorGlow) {
            this.scene.remove(this.cursorGlow);
            this.cursorGlow.material.map.dispose();
            this.cursorGlow.material.dispose();
        }

        // 清理渲染器
        this.renderer.dispose();

        this.particles = [];
    }
};

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Renderer;
} else {
    window.Renderer = Renderer;
}