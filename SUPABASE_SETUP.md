# 🔧 Supabase 快速設置指南

您的 Supabase 專案已配置好連線 URL，現在需要完成以下步驟：

## 📍 您的 Supabase 資訊
- **Project URL**: `https://qsljizkshpbvfotcarjn.supabase.co`
- **Database URL**: `postgresql://postgres:KLi7sxepKAYeXomU@db.qsljizkshpbvfotcarjn.supabase.co:5432/postgres`

## 🚀 快速設置步驟

### 1. 獲取 Anon Key
1. 前往 [Supabase Dashboard](https://supabase.com/dashboard)
2. 選擇您的專案 (qsljizkshpbvfotcarjn)
3. 點擊左側 "Settings" → "API"
4. 複製 **anon public** key

### 2. 設置本地環境變數
更新 `.env.local` 文件：
```env
VITE_SUPABASE_URL=https://qsljizkshpbvfotcarjn.supabase.co
VITE_SUPABASE_ANON_KEY=你複製的_anon_key
VITE_VERCEL_URL=
```

### 3. 建立資料庫表格
1. 在 Supabase Dashboard 點擊 "SQL Editor"
2. 點擊 "New query"
3. 複製並執行 `database/supabase-schema.sql` 中的 SQL
4. 點擊 "Run" 執行

### 4. 設置 Vercel 環境變數
在 [Vercel Dashboard](https://vercel.com/dashboard) 中設置：
- `VITE_SUPABASE_URL` = `https://qsljizkshpbvfotcarjn.supabase.co`
- `VITE_SUPABASE_ANON_KEY` = 您的 anon key
- `VITE_VERCEL_URL` = `demo-iota-nine-24.vercel.app`

### 5. 測試連線
```bash
npm run dev
```

訪問 `http://localhost:5173` 檢查教學課程是否正確載入。

**部署後的網站**: https://demo-iota-nine-24.vercel.app

## ✅ 已清理的內容

- ✅ 移除 `@planetscale/database` 套件
- ✅ 刪除 MySQL 格式的 schema 文件
- ✅ 清理所有 PlanetScale 相關程式碼
- ✅ 更新環境變數配置
- ✅ 統一使用 Supabase 架構

## 🔍 下一步

1. **完成環境變數設置**
2. **執行資料庫 schema**
3. **測試 API 功能**
4. **部署到 Vercel**

您的專案現在完全使用 Supabase 了！ 🎉
