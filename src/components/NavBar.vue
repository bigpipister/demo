<template>
  <el-menu
    :default-active="activeIndex"
    mode="horizontal"
    class="navbar"
    :ellipsis="false"
    @select="handleSelect"
  >
    <!-- Logo -->
    <div class="navbar-brand" @click="$router.push('/')">
      <el-icon size="32" color="#409EFF"><CodePen /></el-icon>
      <span class="brand-text">程式碼教學</span>
    </div>

    <!-- 主要導航 -->
    <div class="navbar-nav">
      <el-menu-item index="/" class="nav-item">
        <el-icon><HomeFilled /></el-icon>
        <span>首頁</span>
      </el-menu-item>
      <el-menu-item index="/tutorials" class="nav-item">
        <el-icon><Document /></el-icon>
        <span>教學課程</span>
      </el-menu-item>
      <el-menu-item index="/about" class="nav-item">
        <el-icon><InfoFilled /></el-icon>
        <span>關於我們</span>
      </el-menu-item>
    </div>

    <!-- 右側操作區 -->
    <div class="navbar-actions">
      <!-- 搜尋框 -->
      <el-input
        v-model="searchKeyword"
        placeholder="搜尋課程..."
        class="search-input"
        clearable
        @keyup.enter="handleSearch"
      >
        <template #prefix>
          <el-icon><Search /></el-icon>
        </template>
      </el-input>

      <!-- 主題切換 -->
      <el-button 
        :icon="isDark ? Sunny : Moon" 
        circle 
        @click="toggleTheme"
        class="theme-toggle"
      />

      <!-- 使用者選單 -->
      <el-dropdown class="user-dropdown" @command="handleCommand">
        <div class="user-avatar">
          <el-avatar :size="32" :src="userInfo.avatar">
            <el-icon><User /></el-icon>
          </el-avatar>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="profile">
              <el-icon><User /></el-icon>
              個人資料
            </el-dropdown-item>
            <el-dropdown-item command="courses">
              <el-icon><Document /></el-icon>
              我的課程
            </el-dropdown-item>
            <el-dropdown-item command="settings">
              <el-icon><Setting /></el-icon>
              設定
            </el-dropdown-item>
            <el-dropdown-item divided command="logout">
              <el-icon><SwitchButton /></el-icon>
              登出
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <!-- 移動端選單按鈕 -->
      <el-button 
        :icon="Menu" 
        class="mobile-menu-btn"
        @click="showMobileMenu = true"
      />
    </div>

    <!-- 移動端選單抽屜 -->
    <el-drawer
      v-model="showMobileMenu"
      title="選單"
      direction="rtl"
      size="280px"
      class="mobile-drawer"
    >
      <el-menu
        :default-active="activeIndex"
        mode="vertical"
        @select="handleMobileSelect"
      >
        <el-menu-item index="/">
          <el-icon><HomeFilled /></el-icon>
          <span>首頁</span>
        </el-menu-item>
        <el-menu-item index="/tutorials">
          <el-icon><Document /></el-icon>
          <span>教學課程</span>
        </el-menu-item>
        <el-menu-item index="/about">
          <el-icon><InfoFilled /></el-icon>
          <span>關於我們</span>
        </el-menu-item>
        
        <el-divider />
        
        <el-menu-item index="profile">
          <el-icon><User /></el-icon>
          <span>個人資料</span>
        </el-menu-item>
        <el-menu-item index="courses">
          <el-icon><Document /></el-icon>
          <span>我的課程</span>
        </el-menu-item>
        <el-menu-item index="settings">
          <el-icon><Setting /></el-icon>
          <span>設定</span>
        </el-menu-item>
      </el-menu>
      
      <div class="mobile-actions">
        <el-button @click="toggleTheme" style="width: 100%;">
          <el-icon>
            <component :is="isDark ? 'Sunny' : 'Moon'" />
          </el-icon>
          {{ isDark ? '切換到淺色模式' : '切換到深色模式' }}
        </el-button>
      </div>
    </el-drawer>
  </el-menu>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const searchKeyword = ref('')
const showMobileMenu = ref(false)
const isDark = ref(false)

const userInfo = ref({
  name: '使用者',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&auto=format&face=center'
})

// 當前活躍的選單項
const activeIndex = computed(() => {
  return route.path
})

// 處理選單選擇
const handleSelect = (key) => {
  if (key.startsWith('/')) {
    router.push(key)
  }
}

// 處理移動端選單選擇
const handleMobileSelect = (key) => {
  showMobileMenu.value = false
  if (key.startsWith('/')) {
    router.push(key)
  } else {
    handleCommand(key)
  }
}

// 處理搜尋
const handleSearch = () => {
  if (searchKeyword.value.trim()) {
    router.push({
      path: '/tutorials',
      query: { search: searchKeyword.value.trim() }
    })
  }
}

// 處理使用者選單命令
const handleCommand = (command) => {
  switch (command) {
    case 'profile':
      console.log('前往個人資料')
      break
    case 'courses':
      console.log('前往我的課程')
      break
    case 'settings':
      console.log('前往設定')
      break
    case 'logout':
      console.log('登出')
      break
  }
}

// 切換主題
const toggleTheme = () => {
  isDark.value = !isDark.value
  // 這裡可以實作主題切換邏輯
  document.documentElement.classList.toggle('dark', isDark.value)
}

// 檢查是否為移動端
const checkMobile = () => {
  return window.innerWidth <= 768
}

onMounted(() => {
  // 檢查本地儲存的主題設定
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark') {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
})
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background: white;
  border-bottom: 1px solid #e6e6e6;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  margin-right: 40px;
  flex-shrink: 0;
}

.brand-text {
  font-size: 1.2rem;
  font-weight: bold;
  color: #303133;
}

.navbar-nav {
  display: flex;
  flex: 1;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.navbar-actions {
  display: flex;
  align-items: center;
  gap: 15px;
  flex-shrink: 0;
}

.search-input {
  width: 250px;
}

.theme-toggle {
  border: none;
  background: transparent;
}

.user-dropdown {
  cursor: pointer;
}

.user-avatar {
  display: flex;
  align-items: center;
}

.mobile-menu-btn {
  display: none;
  border: none;
  background: transparent;
}

.mobile-actions {
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
}

/* 移動端樣式 */
@media (max-width: 768px) {
  .navbar {
    padding: 0 15px;
  }
  
  .navbar-nav {
    display: none;
  }
  
  .search-input {
    display: none;
  }
  
  .theme-toggle {
    display: none;
  }
  
  .mobile-menu-btn {
    display: flex;
  }
  
  .brand-text {
    display: none;
  }
}

@media (max-width: 480px) {
  .navbar {
    padding: 0 10px;
  }
  
  .navbar-brand {
    margin-right: 15px;
  }
  
  .search-input {
    width: 200px;
  }
}

/* 深色模式 */
:global(.dark) .navbar {
  background: #1f1f1f;
  border-bottom-color: #333;
}

:global(.dark) .brand-text {
  color: #e6e6e6;
}

/* Element Plus 選單項目的深色模式覆蓋 */
:global(.dark) .el-menu--horizontal .el-menu-item {
  color: #e6e6e6;
}

:global(.dark) .el-menu--horizontal .el-menu-item:hover {
  background-color: #333;
}

:global(.dark) .el-menu--horizontal .el-menu-item.is-active {
  color: #409EFF;
  border-bottom-color: #409EFF;
}
</style>

<style>
/* 全域樣式調整 */
.el-menu--horizontal {
  border-bottom: none !important;
}

.el-menu--horizontal .el-menu-item {
  height: 60px;
  line-height: 60px;
  border-bottom: 2px solid transparent;
}

.el-menu--horizontal .el-menu-item:hover {
  background-color: #f5f7fa;
}

.el-menu--horizontal .el-menu-item.is-active {
  color: #409EFF;
  border-bottom-color: #409EFF;
}

/* 抽屜樣式調整 */
.mobile-drawer .el-drawer__body {
  padding: 0;
}

.mobile-drawer .el-menu {
  border-right: none;
}

.mobile-drawer .el-menu-item {
  height: 50px;
  line-height: 50px;
}
</style>
