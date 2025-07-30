# 🗄️ 完整資料庫設置指南

這個專案已經整合了 **Supabase** 作為主要資料庫解決方案，並提供多種免費資料庫選擇。

## 🎯 推薦選擇：Supabase

### 為什麼選擇 Supabase？
- ✅ **完全免費** - 免費版本提供 500MB 存儲空間，每月 5GB 傳輸量
- ✅ **PostgreSQL** - 功能強大的開源關聯式資料庫
- ✅ **即時 API** - 自動生成 RESTful API 和 GraphQL
- ✅ **內建認證** - 支援多種登入方式
- ✅ **Row Level Security** - 企業級安全性
- ✅ **即時訂閱** - WebSocket 支援
- ✅ **簡單易用** - 友好的 Dashboard 介面

### 🚀 快速設置 Supabase

#### 1. 創建 Supabase 專案
1. 前往 [Supabase 官網](https://supabase.com/)
2. 點擊 "Start your project" 
3. 使用 GitHub 登入
4. 點擊 "New project"
5. 選擇組織並填寫專案詳情：
   - **Name**: `vue-tutorial-site`
   - **Database Password**: 創建強密碼（請記住）
   - **Region**: 選擇最接近的區域
6. 點擊 "Create new project"

#### 2. 獲取 API 密鑰
1. 進入專案 Dashboard
2. 點擊左側 "Settings" → "API"
3. 複製以下資訊：
   - **Project URL** (VITE_SUPABASE_URL)
   - **anon public** key (VITE_SUPABASE_ANON_KEY)

#### 3. 設置環境變數

**本地開發：**
在專案根目錄創建 `.env.local` 檔案：
```env
VITE_SUPABASE_URL=你的_Project_URL
VITE_SUPABASE_ANON_KEY=你的_anon_public_key
```

**Vercel 部署：**
1. 登入 [Vercel Dashboard](https://vercel.com/dashboard)
2. 選擇你的專案
3. 進入 "Settings" → "Environment Variables"
4. 添加變數：
   - `VITE_SUPABASE_URL` = 你的 Project URL
   - `VITE_SUPABASE_ANON_KEY` = 你的 anon public key

#### 4. 創建資料庫表格
1. 在 Supabase Dashboard 點擊 "SQL Editor"
2. 點擊 "New query"
3. 複製並執行 `database/supabase-schema.sql` 中的 SQL 指令
4. 點擊 "Run" 執行腳本

#### 5. 測試連線
```bash
npm run dev
```
打開瀏覽器前往 `http://localhost:5173`，檢查教學課程是否正確載入。

---

## 📋 其他免費資料庫選擇

### 1. PlanetScale
- **優點**: MySQL 相容、分支功能、無連線限制
- **免費額度**: 10GB 存儲、100 million reads/月
- **適用**: 需要 MySQL 或複雜分支工作流程

### 2. Railway
- **優點**: 簡單部署、支援多種資料庫
- **免費額度**: $5 月度額度
- **適用**: 全端部署解決方案

### 3. MongoDB Atlas
- **優點**: NoSQL、靈活 schema、雲端託管
- **免費額度**: 512MB 存儲
- **適用**: 需要 NoSQL 或文檔數據庫

### 4. FaunaDB
- **優點**: 無伺服器、ACID 交易、全球分佈
- **免費額度**: 100K transactions/月
- **適用**: 需要強一致性的全球應用

---

## 🔧 專案架構說明

### 檔案結構
```
src/
├── services/
│   ├── supabase.js     # Supabase 數據庫操作
│   └── api.js          # API 抽象層（Supabase + 備用數據）
├── views/
│   ├── Tutorials.vue   # 教學列表（已整合 API）
│   └── Home.vue        # 首頁
└── components/
    └── NavBar.vue      # 導航列
```

### 資料流程
1. **前端頁面** → 調用 `api.js`
2. **api.js** → 優先使用 `supabase.js`
3. **supabase.js** → 連接 Supabase 資料庫
4. **錯誤處理** → 降級使用本地備用數據

### 功能特色
- ✅ **自動降級**: Supabase 不可用時自動使用備用數據
- ✅ **篩選搜尋**: 支援分類、難度、關鍵字篩選
- ✅ **用戶認證**: 內建登入註冊功能
- ✅ **進度追蹤**: 記錄學習進度
- ✅ **評價系統**: 課程評分和評論
- ✅ **響應式設計**: 支援各種設備

---

## 🚀 下一步

1. **選擇資料庫服務**（推薦 Supabase）
2. **設置環境變數**
3. **創建資料庫表格**
4. **測試功能**
5. **部署到 Vercel**

### 額外功能擴展
- 🔐 **用戶認證系統**
- 💳 **課程付費功能**
- 📊 **學習分析面板**
- 🎥 **影片串流整合**
- 📱 **手機 App 開發**

---

## 🆘 需要協助？

如果您在設置過程中遇到任何問題，請提供錯誤訊息，我將協助您解決！

現在就開始設置您的資料庫吧！ 🎉
