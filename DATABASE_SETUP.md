# 資料庫整合指南

## 🗄️ 資料庫架構說明

### 主要資料表
- `tutorials` - 教學課程
- `tutorial_chapters` - 課程章節
- `tutorial_lessons` - 課程課時
- `instructors` - 講師資訊
- `users` - 用戶資料
- `user_progress` - 學習進度
- `tutorial_reviews` - 課程評價

### API 端點
- `GET /api/tutorials` - 獲取所有課程
- `GET /api/tutorials?id=1` - 獲取特定課程
- `POST /api/tutorials` - 創建新課程
- `PUT /api/tutorials?id=1` - 更新課程
- `DELETE /api/tutorials?id=1` - 刪除課程

## 🚀 快速開始

### 1. 設置資料庫
```bash
# 選擇資料庫服務（Supabase 推薦）
# 執行 database/schema.sql 創建表格
# 獲取 DATABASE_URL
```

### 2. 配置環境變數
```bash
# 在 Vercel Dashboard 設置
DATABASE_URL=your_connection_string
JWT_SECRET=your_jwt_secret
```

### 3. 部署
```bash
git add .
git commit -m "Add database integration"
git push origin main
```

## 🔄 開發工作流

### 本地開發
1. 複製 `.env.example` 為 `.env.local`
2. 填入本地資料庫連線資訊
3. 執行 `npm run dev`

### 生產部署
1. 在 Vercel 設置環境變數
2. 推送代碼自動部署
3. 在 Vercel Functions 中運行 API

## 🛠️ 擴展功能

可以輕鬆添加：
- 用戶認證系統
- 購物車和付款
- 課程評論系統
- 學習進度追蹤
- 講師管理後台
- 課程搜尋和推薦
