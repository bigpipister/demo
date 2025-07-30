# 部署指南

本文件說明如何將專案部署到 Vercel 並設置 GitHub Actions 自動部署。

## 📋 準備工作

### 1. GitHub 倉庫設置
1. 在 GitHub 上創建一個新倉庫
2. 將本地代碼推送到 GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### 2. Vercel 帳號設置
1. 前往 [Vercel](https://vercel.com) 註冊帳號
2. 連接您的 GitHub 帳號

## 🚀 自動部署設置

### 方法一：Vercel Dashboard（推薦）
1. 登入 Vercel Dashboard
2. 點擊 "Add New Project"
3. 選擇您的 GitHub 倉庫
4. Vercel 會自動檢測到這是一個 Vite 專案
5. 點擊 "Deploy" 開始部署

### 方法二：GitHub Actions 自動部署

#### 步驟 1: 獲取 Vercel 設置資訊
在 Vercel 項目設置中獲取以下資訊：

1. **Vercel Token**: 
   - 前往 Vercel Dashboard → Settings → Tokens
   - 創建一個新的 Token

2. **Organization ID**:
   - 在項目設置中找到 "Organization ID"

3. **Project ID**:
   - 在項目設置中找到 "Project ID"

#### 步驟 2: 設置 GitHub Secrets
在 GitHub 倉庫中設置以下 Secrets：

1. 前往 GitHub 倉庫 → Settings → Secrets and variables → Actions
2. 添加以下 Repository secrets：
   - `VERCEL_TOKEN`: 您的 Vercel Token
   - `VERCEL_ORG_ID`: 您的 Organization ID  
   - `VERCEL_PROJECT_ID`: 您的 Project ID

#### 步驟 3: 觸發部署
推送代碼到 `main` 或 `master` 分支將自動觸發部署：

```bash
git add .
git commit -m "Add deployment configuration"
git push origin main
```

## 📁 專案文件說明

### `.github/workflows/deploy.yml`
GitHub Actions 工作流程文件，負責自動化部署流程：
- 在代碼推送時觸發
- 安裝依賴並構建專案
- 部署到 Vercel

### `vercel.json`
Vercel 配置文件：
- 指定構建設置
- 配置路由規則（支援 SPA 路由）
- 設置輸出目錄

## 🔧 部署配置

### 環境變數
如果專案需要環境變數，在 Vercel Dashboard 中設置：
1. 前往項目設置 → Environment Variables
2. 添加所需的環境變數

### 自定義域名
在 Vercel Dashboard 中可以：
1. 前往項目設置 → Domains
2. 添加自定義域名
3. 配置 DNS 設置

## 🐛 常見問題

### 1. 路由 404 錯誤
確保 `vercel.json` 中包含了 SPA 路由配置：
```json
{
  "routes": [
    { "handle": "filesystem" },
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
```

### 2. 構建失敗
檢查 `package.json` 中的 scripts：
```json
{
  "scripts": {
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

### 3. GitHub Actions 失敗
確保在 GitHub Secrets 中正確設置了：
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

## 📊 部署狀態監控

### Vercel Dashboard
- 查看部署歷史
- 監控性能指標
- 檢查日誌

### GitHub Actions
- 查看工作流程狀態
- 檢查構建日誌
- 監控部署時間

## 🔄 更新部署

每次推送到 main 分支都會觸發自動部署：

```bash
# 進行代碼更改
git add .
git commit -m "Update: 描述您的更改"
git push origin main
```

部署完成後，您可以在 Vercel Dashboard 中查看新的部署URL。

## 📞 支援

如果在部署過程中遇到問題：
1. 檢查 Vercel 部署日誌
2. 查看 GitHub Actions 執行日誌  
3. 參考 [Vercel 文檔](https://vercel.com/docs)
4. 參考 [GitHub Actions 文檔](https://docs.github.com/en/actions)
