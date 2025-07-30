<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup>
// 這是主應用組件，使用 router-view 來顯示不同的頁面
</script>

<style>
/* 全域樣式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微軟雅黑', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  min-height: 100vh;
  background-color: #f8f9fa;
}

/* 響應式圖片 */
img {
  max-width: 100%;
  height: auto;
}

/* 鏈接樣式 */
a {
  color: #409EFF;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

/* 滾動條樣式 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* 深色模式樣式 */
.dark {
  background-color: #1a1a1a;
  color: #e6e6e6;
}

.dark #app {
  background-color: #1a1a1a;
}

/* Element Plus 深色模式覆蓋 */
.dark .el-card {
  background-color: #2d2d2d;
  border-color: #404040;
}

.dark .el-card__header {
  border-bottom-color: #404040;
}

.dark .el-input__inner {
  background-color: #404040;
  border-color: #606060;
  color: #e6e6e6;
}

.dark .el-button--primary {
  background-color: #409EFF;
  border-color: #409EFF;
}

/* 動畫效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 工具類 */
.text-center {
  text-align: center;
}

.text-left {
  text-align: left;
}

.text-right {
  text-align: right;
}

.mb-10 {
  margin-bottom: 10px;
}

.mb-20 {
  margin-bottom: 20px;
}

.mb-30 {
  margin-bottom: 30px;
}

.mt-10 {
  margin-top: 10px;
}

.mt-20 {
  margin-top: 20px;
}

.mt-30 {
  margin-top: 30px;
}
</style>
