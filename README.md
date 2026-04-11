# Addy's Personal Website

> 无为照见，有为自现。朝拭心镜，夕拾微光。

## 🌐 访问地址

**主站**: [https://addy-website.pages.dev](https://addy-website.pages.dev)

## 📁 项目结构

addy-website/
├── index.html              # 主页
├── images/                 # 图片资源
│   ├── Hero.png
│   ├── 1.png
│   ├── jarvis-preview.png
│   ├── mood-gravity.png
│   └── shooter.png
├── data/
│   └── thoughts.js         # 随想数据
└── projects/               # 作品项目
├── jarvis/             # J.A.R.V.I.S. 全息地球
├── mood-gravity/       # 情绪引力场
└── shooter/            # 弹弓射击小游戏 (Godot 4.6)

## 🎮 作品列表

| 作品 | 技术栈 | 简介 |
|------|--------|------|
| **J.A.R.V.I.S. 全息地球** | Three.js + MediaPipe | AI + 手势交互的全息地球展示 |
| **情绪引力场** | Matter.js + Canvas | 情绪释放 + 3D粒子物理可视化 |
| **弹弓射击小游戏** | Godot 4.6 + GDScript | 黑白灰手绘风格的物理射击游戏 |

## 🎯 Shooter - 弹弓射击小游戏

一个用 **Godot 4.6** 开发的弹弓射击游戏：

- 🕹️ **5种游戏模式**：经典、计时挑战、精准狙击、移动目标、障碍物
- 🔊 **实时合成音效**：使用 AudioStreamGenerator 生成音效
- 📦 **物理碎屑系统**：基于 P=mv 动量守恒
- 🎨 **手绘风格**：Line2D 抖动 + 粗线条
- 🌐 **Web 导出**：浏览器直接运行

## 🛠 技术栈

| 类别 | 技术 |
|------|------|
| 前端 | HTML5 / CSS3 / JavaScript |
| 3D渲染 | Three.js |
| 物理引擎 | Matter.js |
| 手势识别 | MediaPipe |
| 游戏引擎 | Godot 4.6 (GDScript) |
| 部署 | Cloudflare Pages |
| 大文件 | Git LFS |

## 📦 Git LFS

本项目使用 Git LFS 管理大型文件（如 `.wasm` 游戏引擎文件）。

```bash
git lfs install
git clone https://github.com/AddySwatow/addy-website.git
📝 更新日志
时间	更新内容
2026-04	添加 Shooter 弹弓射击游戏
2026-04	网站初始化部署
👤 作者
Addy

GitHub: @AddySwatow
⭐ 如果喜欢，欢迎 Star！

© 2026 Addy. All rights reserved.


