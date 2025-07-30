# 程式碼教學網站

一個使用 Vue 3 + Vite + Element Plus 構建的現代化程式碼教學平台。

## 🚀 技術棧

- **Vue 3** - 使用 Composition API 和 `<script setup>` 語法
- **Vite** - 快速的開發構建工具
- **Element Plus** - 基於 Vue 3 的組件庫
- **Vue Router 4** - 官方路由管理器
- **JavaScript ES6+** - 現代 JavaScript 語法

## ✨ 特色功能

- 🎨 **現代化 UI** - 使用 Element Plus 組件庫，界面美觀易用
- 📱 **響應式設計** - 完美適配桌面端和移動端
- 🔍 **課程搜尋** - 支援關鍵字搜尋和分類篩選
- 🎯 **課程管理** - 完整的課程列表和詳情頁面
- 🌙 **主題切換** - 支援淺色/深色模式切換
- 📊 **數據統計** - 顯示平台統計信息

## 📁 專案結構

```
src/
├── components/          # 可重用組件
│   └── NavBar.vue      # 導航欄組件
├── views/              # 頁面組件
│   ├── Home.vue        # 首頁
│   ├── Tutorials.vue   # 教學列表頁
│   ├── TutorialDetail.vue # 教學詳情頁
│   └── About.vue       # 關於頁面
├── router/             # 路由配置
│   └── index.js        # 路由設定
├── App.vue             # 根組件
├── main.js             # 應用入口
└── style.css           # 全域樣式
```

## 🛠️ 開發設置

### 安裝依賴

```bash
npm install
```

### 開發模式

```bash
npm run dev
```

### 構建生產版本

```bash
npm run build
```

### 預覽生產版本

```bash
npm run preview
```

## 📋 主要頁面

### 首頁 (/)
- Hero 區域展示平台特色
- 功能特點介紹
- 最新教學課程展示

### 教學課程 (/tutorials)
- 課程列表展示
- 分類和難度篩選
- 關鍵字搜尋功能
- 課程卡片設計

### 教學詳情 (/tutorial/:id)
- 課程詳細資訊
- 課程大綱和章節
- 講師介紹
- 相關課程推薦

### 關於我們 (/about)
- 平台介紹
- 團隊成員
- 技術棧展示
- 聯繫方式

## 🎨 組件說明

### NavBar 組件
- 響應式導航欄
- 課程搜尋功能
- 主題切換按鈕
- 使用者選單
- 移動端抽屜式選單

## 📱 響應式設計

專案採用響應式設計，支援以下斷點：
- 桌面端: ≥ 1200px
- 平板: 768px - 1199px
- 手機: < 768px

## 🌙 主題支援

支援淺色和深色兩種主題模式，用戶可通過導航欄的主題切換按鈕進行切換。

## 📦 依賴包

### 主要依賴
- `vue@^3.5.13` - Vue 3 框架
- `vue-router@^4.4.5` - Vue 路由
- `element-plus@^2.8.8` - UI 組件庫
- `@element-plus/icons-vue@^2.3.1` - Element Plus 圖標

### 開發依賴
- `vite@^6.0.1` - 構建工具
- `@vitejs/plugin-vue@^5.2.1` - Vue 插件

## 🚀 部署

### Vercel 部署
```bash
npm run build
vercel --prod
```

### Netlify 部署
```bash
npm run build
# 上傳 dist 目錄到 Netlify
```

### 傳統主機部署
```bash
npm run build
# 將 dist 目錄上傳到服務器
```

## 🤝 貢獻

歡迎提交 Pull Request 來改進這個專案。對於重大更改，請先開啟 Issue 討論您想要更改的內容。

## 📄 授權

[MIT License](LICENSE)

## 📞 聯繫

如有任何問題或建議，請通過以下方式聯繫：
- Email: contact@codelearning.com
- 網站: [程式碼教學平台](https://your-domain.com)
