# 🚀 Vercel API ### 1. API 端點結構

**基礎 URL**: `https://demo-iota-nine-24.vercel.app/api/supabase/`

```
/api/supabase/
├── tutorials.js      # 教學課程 CRUD 操作
├── auth.js          # 用戶認證相關
└── user-data.js     # 用戶進度和評價
```
這個專案現在使用 **Vercel API** 作為中間層來存取 Supabase 資料庫，提供更好的安全性和控制性。

## 🏗️ 架構說明

```
前端 Vue App → Vercel API 端點 → Supabase 資料庫
```

### 優點
- ✅ **安全性**: API keys 只在伺服器端暴露
- ✅ **控制性**: 可以在 API 層添加驗證、限流等功能
- ✅ **一致性**: 統一的錯誤處理和回應格式
- ✅ **擴展性**: 容易添加快取、日誌等功能

## 📁 API 端點結構

```
/api/supabase/
├── tutorials.js      # 教學課程 CRUD 操作
├── auth.js          # 用戶認證相關
└── user-data.js     # 用戶進度和評價
```

## 🔧 API 端點說明

### 1. 教學課程 API (`/api/supabase/tutorials`)

**GET** - 獲取教學列表
```
GET https://demo-iota-nine-24.vercel.app/api/supabase/tutorials?category=Vue.js&level=初級&search=關鍵字
```

**GET** - 獲取單個教學
```
GET https://demo-iota-nine-24.vercel.app/api/supabase/tutorials?id=1
```

**POST** - 創建新教學（需要管理員權限）
```json
POST https://demo-iota-nine-24.vercel.app/api/supabase/tutorials
{
  "title": "新課程",
  "description": "課程描述",
  "category": "Vue.js"
}
```

### 2. 認證 API (`/api/supabase/auth`)

**POST** - 用戶註冊
```json
POST /api/supabase/auth?action=signup
{
  "email": "user@example.com",
  "password": "password123",
  "userData": { "full_name": "使用者名稱" }
}
```

**POST** - 用戶登入
```json
POST /api/supabase/auth?action=signin
{
  "email": "user@example.com",
  "password": "password123"
}
```

**GET** - 獲取當前用戶
```
GET /api/supabase/auth?action=user
Authorization: Bearer <token>
```

### 3. 用戶數據 API (`/api/supabase/user-data`)

**GET** - 獲取學習進度
```
GET /api/supabase/user-data?type=progress&userId=123
```

**POST** - 更新學習進度
```json
POST /api/supabase/user-data?type=progress
{
  "userId": "123",
  "lessonId": "456",
  "completed": true
}
```

**GET** - 獲取課程評價
```
GET /api/supabase/user-data?type=reviews&tutorialId=1
```

**POST** - 提交課程評價
```json
POST /api/supabase/user-data?type=reviews
{
  "tutorialId": "1",
  "userId": "123",
  "rating": 5,
  "comment": "很棒的課程！"
}
```

## ⚙️ 環境設置

### 1. 環境變數設置

**本地開發** - 創建 `.env.local`:
```env
VITE_SUPABASE_URL=你的_supabase_project_url
VITE_SUPABASE_ANON_KEY=你的_supabase_anon_key
VITE_VERCEL_URL=你的_vercel_domain
```

**Vercel 部署** - 在 Vercel Dashboard 設置:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_VERCEL_URL`

### 2. 本地開發

由於使用了 API 代理，您需要：

1. **啟動前端**:
```bash
npm run dev
```

2. **API 會自動代理到 Vercel 或本地 API**

### 3. 部署到 Vercel

```bash
git add .
git commit -m "update: migrate to Vercel API architecture"
git push origin main
```

Vercel 會自動部署 API 端點和前端應用。

## 🔒 安全考量

### API 端點安全性
- ✅ CORS 設置
- ✅ 輸入驗證
- ✅ 錯誤處理
- ✅ Rate limiting（可擴展）
- ✅ 認證 token 檢查

### 資料庫安全性
- ✅ Row Level Security (RLS)
- ✅ 用戶數據隔離
- ✅ 敏感資料保護

## 🚀 下一步擴展

這個架構支援輕鬆添加：

### 1. 快取層
```javascript
// 在 API 端點添加 Redis 快取
const cachedData = await redis.get(cacheKey)
if (cachedData) return JSON.parse(cachedData)
```

### 2. 限流保護
```javascript
// 添加 rate limiting
import rateLimit from 'express-rate-limit'
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 分鐘
  max: 100 // 限制每 IP 100 次請求
})
```

### 3. 日誌監控
```javascript
// 添加請求日誌
console.log(`API Request: ${method} ${endpoint}`, { userId, timestamp })
```

### 4. 資料驗證
```javascript
// 使用 Joi 或 Zod 進行資料驗證
const schema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required()
})
```

## 🆘 故障排除

### 常見問題

1. **API 連接失敗**
   - 檢查 `VITE_VERCEL_URL` 設置
   - 確認 Vercel 部署成功

2. **認證問題**
   - 檢查 token 是否正確存儲
   - 確認 Supabase 配置

3. **CORS 錯誤**
   - 檢查 API 端點的 CORS 設置
   - 確認請求標頭正確

現在您的應用已經使用 Vercel API 架構了！ 🎉
