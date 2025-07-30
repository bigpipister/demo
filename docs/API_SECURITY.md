# API 安全配置指南

## 🔒 安全特性

### 1. API 密鑰認證
- 所有 API 請求都需要提供有效的 API 密鑰
- 密鑰通過 `x-api-key` header 或 `apikey` query 參數傳遞

### 2. 速率限制
- **教學 API**: 每分鐘最多 100 次請求
- **認證 API**: 每分鐘最多 20 次請求  
- **用戶數據 API**: 每分鐘最多 50 次請求

### 3. CORS 保護
- 只允許指定域名訪問：
  - `https://demo-iota-nine-24.vercel.app`
  - `http://localhost:5174`
  - `http://localhost:3000`

### 4. 環境變數保護
- 敏感信息存儲在環境變數中
- 生產環境和開發環境分離

## 🛠️ Vercel 環境變數設置

在 Vercel Dashboard 中設置以下環境變數：

```bash
# API 安全密鑰（請生成複雜的隨機字串）
API_SECRET_KEY=your-super-secret-api-key-here

# Supabase 配置
SUPABASE_URL=https://qsljizkshpbvfotcarjn.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
```

## 🔑 API 密鑰生成

建議使用以下方式生成安全的 API 密鑰：

```javascript
// Node.js
const crypto = require('crypto');
const apiKey = crypto.randomBytes(32).toString('hex');
console.log(apiKey);
```

```bash
# Linux/Mac
openssl rand -hex 32
```

## 📝 使用方式

### 前端調用示例

```javascript
// 在請求中包含 API 密鑰
const response = await fetch('/api/supabase/tutorials', {
  headers: {
    'x-api-key': 'your-api-key',
    'Content-Type': 'application/json'
  }
});
```

### cURL 測試示例

```bash
# 測試 API 端點
curl -X GET "https://demo-iota-nine-24.vercel.app/api/supabase/tutorials" \
  -H "x-api-key: your-api-key" \
  -H "Content-Type: application/json"
```

## ⚠️ 重要提醒

1. **不要將 API 密鑰提交到 Git**
2. **定期更換 API 密鑰**
3. **監控 API 使用情況**
4. **為不同環境使用不同的密鑰**

## 🚨 安全響應碼

- `401 Unauthorized`: API 密鑰無效或缺失
- `429 Too Many Requests`: 超過速率限制
- `403 Forbidden`: CORS 錯誤或域名不允許
