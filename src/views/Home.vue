<template>
  <div class="home">
    <!-- Hero Section -->
    <el-container class="hero-section">
      <el-header height="80px">
        <NavBar />
      </el-header>
      <el-main>
        <div class="hero-content">
          <h1 class="hero-title">程式碼教學平台</h1>
          <p class="hero-subtitle">學習現代化前端開發技術</p>
          <div class="hero-buttons">
            <el-button type="primary" size="large" @click="$router.push('/tutorials')">
              <el-icon><Document /></el-icon>
              開始學習
            </el-button>
            <el-button size="large" @click="$router.push('/about')">
              <el-icon><InfoFilled /></el-icon>
              了解更多
            </el-button>
          </div>
        </div>
      </el-main>
    </el-container>

    <!-- Features Section -->
    <el-container class="features-section">
      <el-main>
        <h2 class="section-title">為什麼選擇我們</h2>
        <el-row :gutter="20">
          <el-col :xs="24" :sm="8" v-for="feature in features" :key="feature.id">
            <el-card class="feature-card" shadow="hover">
              <template #header>
                <div class="feature-header">
                  <el-icon size="32" :color="feature.color">
                    <component :is="feature.icon" />
                  </el-icon>
                  <h3>{{ feature.title }}</h3>
                </div>
              </template>
              <p>{{ feature.description }}</p>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>

    <!-- Latest Tutorials Section -->
    <el-container class="tutorials-section">
      <el-main>
        <h2 class="section-title">最新教學</h2>
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12" :md="8" v-for="tutorial in latestTutorials" :key="tutorial.id">
            <el-card class="tutorial-card" shadow="hover" @click="$router.push(`/tutorial/${tutorial.id}`)">
              <img :src="tutorial.image" class="tutorial-image" />
              <div class="tutorial-content">
                <h3>{{ tutorial.title }}</h3>
                <p>{{ tutorial.description }}</p>
                <div class="tutorial-meta">
                  <el-tag :type="tutorial.level === '初級' ? 'success' : tutorial.level === '中級' ? 'warning' : 'danger'">
                    {{ tutorial.level }}
                  </el-tag>
                  <span class="tutorial-duration">{{ tutorial.duration }}</span>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <div class="view-all-btn">
          <el-button type="primary" @click="$router.push('/tutorials')">查看所有教學</el-button>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import NavBar from '../components/NavBar.vue'

const features = ref([
  {
    id: 1,
    title: '現代化技術',
    description: '學習最新的前端開發技術，包括 Vue 3、Vite 和 Element Plus',
    icon: 'CodePen',
    color: '#409EFF'
  },
  {
    id: 2,
    title: '實踐導向',
    description: '通過實際項目練習，掌握真實開發場景中的技能',
    icon: 'Tools',
    color: '#67C23A'
  },
  {
    id: 3,
    title: '專業指導',
    description: '由經驗豐富的開發者精心設計的課程內容',
    icon: 'Star',
    color: '#E6A23C'
  }
])

const latestTutorials = ref([
  {
    id: 1,
    title: 'Vue 3 基礎入門',
    description: '從零開始學習 Vue 3 的核心概念和 Composition API',
    image: 'https://via.placeholder.com/300x200?text=Vue+3',
    level: '初級',
    duration: '2小時'
  },
  {
    id: 2,
    title: 'Vite 構建工具詳解',
    description: '深入了解 Vite 的特性和配置，提升開發效率',
    image: 'https://via.placeholder.com/300x200?text=Vite',
    level: '中級',
    duration: '1.5小時'
  },
  {
    id: 3,
    title: 'Element Plus 組件庫',
    description: '掌握 Element Plus 組件的使用和自定義',
    image: 'https://via.placeholder.com/300x200?text=Element+Plus',
    level: '初級',
    duration: '3小時'
  }
])
</script>

<style scoped>
.home {
  min-height: 100vh;
}

.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  min-height: 80vh;
}

.hero-content {
  text-align: center;
  padding: 60px 20px;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: bold;
  margin-bottom: 20px;
  background: linear-gradient(45deg, #fff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-subtitle {
  font-size: 1.5rem;
  margin-bottom: 40px;
  opacity: 0.9;
}

.hero-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.features-section, .tutorials-section {
  padding: 80px 0;
}

.features-section {
  background-color: #f8f9fa;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 50px;
  color: #303133;
}

.feature-card {
  margin-bottom: 20px;
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.feature-header h3 {
  margin: 0;
  font-size: 1.3rem;
  color: #303133;
}

.tutorial-card {
  margin-bottom: 20px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.tutorial-card:hover {
  transform: translateY(-5px);
}

.tutorial-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 15px;
}

.tutorial-content h3 {
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: #303133;
}

.tutorial-content p {
  color: #606266;
  margin-bottom: 15px;
  line-height: 1.6;
}

.tutorial-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tutorial-duration {
  color: #909399;
  font-size: 0.9rem;
}

.view-all-btn {
  text-align: center;
  margin-top: 40px;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.2rem;
  }
  
  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .section-title {
    font-size: 2rem;
  }
}
</style>
