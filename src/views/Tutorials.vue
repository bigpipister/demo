<template>
  <div class="tutorials">
    <NavBar />
    
    <el-container class="tutorials-container">
      <el-header height="120px">
        <div class="page-header">
          <h1>程式碼教學</h1>
          <p>選擇您感興趣的教學課程，開始您的學習之旅</p>
        </div>
      </el-header>
      
      <el-main>
        <!-- 篩選器 -->
        <el-card class="filter-card" shadow="never">
          <el-row :gutter="20" align="middle">
            <el-col :xs="24" :sm="8" :md="6">
              <el-select v-model="selectedCategory" placeholder="選擇分類" @change="filterTutorials">
                <el-option label="全部" value="all" />
                <el-option label="Vue.js" value="vue" />
                <el-option label="JavaScript" value="javascript" />
                <el-option label="CSS" value="css" />
                <el-option label="工具" value="tools" />
              </el-select>
            </el-col>
            <el-col :xs="24" :sm="8" :md="6">
              <el-select v-model="selectedLevel" placeholder="選擇難度" @change="filterTutorials">
                <el-option label="全部" value="all" />
                <el-option label="初級" value="beginner" />
                <el-option label="中級" value="intermediate" />
                <el-option label="高級" value="advanced" />
              </el-select>
            </el-col>
            <el-col :xs="24" :sm="8" :md="12">
              <el-input
                v-model="searchKeyword"
                placeholder="搜尋教學..."
                @input="filterTutorials"
                clearable
              >
                <template #prefix>
                  <el-icon><Search /></el-icon>
                </template>
              </el-input>
            </el-col>
          </el-row>
        </el-card>

        <!-- 載入狀態 -->
        <el-row v-if="loading" :gutter="20" class="tutorials-grid">
          <el-col :xs="24" :sm="12" :lg="8" v-for="n in 6" :key="n">
            <el-skeleton animated>
              <template #template>
                <el-skeleton-item variant="image" style="width: 100%; height: 200px" />
                <div style="padding: 20px">
                  <el-skeleton-item variant="h3" style="width: 50%" />
                  <el-skeleton-item variant="text" style="margin-top: 10px" />
                  <el-skeleton-item variant="text" style="margin-top: 10px; width: 30%" />
                </div>
              </template>
            </el-skeleton>
          </el-col>
        </el-row>

        <!-- 錯誤狀態 -->
        <el-alert
          v-if="error && !loading"
          :title="error"
          type="error"
          show-icon
          style="margin-bottom: 20px"
        />

        <!-- 教學列表 -->
        <el-row :gutter="20" class="tutorials-grid" v-if="!loading">
          <el-col 
            :xs="24" :sm="12" :lg="8" 
            v-for="tutorial in filteredTutorials" 
            :key="tutorial.id"
          >
            <el-card class="tutorial-card" shadow="hover" @click="viewTutorial(tutorial.id)">
              <div class="tutorial-image-container">
                <img :src="tutorial.image_url || tutorial.image" class="tutorial-image" :alt="tutorial.title" />
                <div class="tutorial-overlay">
                  <el-button type="primary" round>
                    <el-icon><VideoPlay /></el-icon>
                    開始學習
                  </el-button>
                </div>
              </div>
              
              <div class="tutorial-content">
                <h3>{{ tutorial.title }}</h3>
                <p>{{ tutorial.description }}</p>
                
                <div class="tutorial-meta">
                  <div class="tutorial-tags">
                    <el-tag :type="getLevelType(tutorial.level)" size="small">
                      {{ tutorial.level }}
                    </el-tag>
                    <el-tag type="info" size="small">{{ tutorial.category }}</el-tag>
                  </div>
                  
                  <div class="tutorial-info">
                    <span class="tutorial-duration">
                      <el-icon><Clock /></el-icon>
                      {{ tutorial.duration }}
                    </span>
                    <span class="tutorial-lessons">
                      <el-icon><Document /></el-icon>
                      {{ tutorial.lessons_count || tutorial.lessons }} 課
                    </span>
                  </div>
                </div>
                
                <div class="tutorial-stats">
                  <div class="tutorial-rating">
                    <el-rate v-model="tutorial.rating" disabled show-score />
                  </div>
                  <div class="tutorial-students">
                    <el-icon><User /></el-icon>
                    {{ tutorial.students_count || tutorial.students }} 學習者
                  </div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>

        <!-- 無結果提示 -->
        <el-empty v-if="filteredTutorials.length === 0" description="沒有找到符合條件的教學">
          <el-button type="primary" @click="resetFilters">重置篩選</el-button>
        </el-empty>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '../components/NavBar.vue'
import apiService from '../services/api.js'

const router = useRouter()

const selectedCategory = ref('all')
const selectedLevel = ref('all')
const searchKeyword = ref('')
const tutorials = ref([])
const loading = ref(false)
const error = ref(null)

// 從資料庫載入教學數據
const loadTutorials = async () => {
  loading.value = true
  error.value = null
  
  try {
    const data = await apiService.getTutorials()
    tutorials.value = data
  } catch (err) {
    error.value = '載入課程失敗，請稍後再試'
    console.error('Failed to load tutorials:', err)
    // 使用備用數據
    tutorials.value = getBackupTutorials()
  } finally {
    loading.value = false
  }
}

// 備用數據（如果 API 失敗）
const getBackupTutorials = () => [
  {
    id: 1,
    title: 'Vue 3 基礎入門',
    description: '從零開始學習 Vue 3 的核心概念，包括響應式數據、組件開發和 Composition API',
    image_url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop&auto=format',
    category: 'Vue.js',
    level: '初級',
    duration: '2小時',
    lessons_count: 8,
    rating: 4.8,
    students_count: 1250
  },
  {
    id: 2,
    title: 'Vite 構建工具詳解',
    description: '深入了解 Vite 的特性和配置，學習如何優化開發環境和構建流程',
    image_url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=250&fit=crop&auto=format',
    category: '工具',
    level: '中級',
    duration: '1.5小時',
    lessons_count: 6,
    rating: 4.6,
    students_count: 890
  },
  {
    id: 3,
    title: 'Element Plus 組件庫',
    description: '掌握 Element Plus 組件的使用技巧，學習如何自定義主題和組件',
    image_url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop&auto=format',
    category: 'Vue.js',
    level: '初級',
    duration: '3小時',
    lessons_count: 12,
    rating: 4.7,
    students_count: 2100
  }
]

const filteredTutorials = computed(() => {
  let result = tutorials.value

  // 分類篩選
  if (selectedCategory.value !== 'all') {
    result = result.filter(tutorial => 
      tutorial.category.toLowerCase() === selectedCategory.value.toLowerCase()
    )
  }

  // 難度篩選
  if (selectedLevel.value !== 'all') {
    const levelMap = {
      'beginner': '初級',
      'intermediate': '中級',
      'advanced': '高級'
    }
    result = result.filter(tutorial => 
      tutorial.level === levelMap[selectedLevel.value]
    )
  }

  // 關鍵字搜尋
  if (searchKeyword.value) {
    result = result.filter(tutorial =>
      tutorial.title.toLowerCase().includes(searchKeyword.value.toLowerCase()) ||
      tutorial.description.toLowerCase().includes(searchKeyword.value.toLowerCase())
    )
  }

  return result
})

const getLevelType = (level) => {
  const types = {
    '初級': 'success',
    '中級': 'warning',
    '高級': 'danger'
  }
  return types[level] || 'info'
}

const filterTutorials = () => {
  // 觸發計算屬性重新計算
}

const resetFilters = () => {
  selectedCategory.value = 'all'
  selectedLevel.value = 'all'
  searchKeyword.value = ''
}

const viewTutorial = (id) => {
  router.push(`/tutorial/${id}`)
}

// 組件掛載時載入數據
onMounted(() => {
  loadTutorials()
})
</script>

<style scoped>
.tutorials {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.tutorials-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.page-header {
  text-align: center;
  padding: 40px 0 20px;
}

.page-header h1 {
  font-size: 2.5rem;
  color: #303133;
  margin-bottom: 10px;
}

.page-header p {
  font-size: 1.1rem;
  color: #606266;
}

.filter-card {
  margin-bottom: 30px;
}

.tutorials-grid {
  margin-top: 20px;
}

.tutorial-card {
  margin-bottom: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
}

.tutorial-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.tutorial-image-container {
  position: relative;
  overflow: hidden;
}

.tutorial-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.tutorial-card:hover .tutorial-image {
  transform: scale(1.05);
}

.tutorial-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.tutorial-card:hover .tutorial-overlay {
  opacity: 1;
}

.tutorial-content {
  padding: 20px;
}

.tutorial-content h3 {
  font-size: 1.3rem;
  margin-bottom: 10px;
  color: #303133;
  line-height: 1.4;
}

.tutorial-content p {
  color: #606266;
  margin-bottom: 15px;
  line-height: 1.6;
  height: 48px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.tutorial-meta {
  margin-bottom: 15px;
}

.tutorial-tags {
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
}

.tutorial-info {
  display: flex;
  gap: 15px;
  color: #909399;
  font-size: 0.9rem;
}

.tutorial-info span {
  display: flex;
  align-items: center;
  gap: 4px;
}

.tutorial-stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #f0f0f0;
  padding-top: 15px;
}

.tutorial-rating :deep(.el-rate__text) {
  font-size: 0.85rem;
}

.tutorial-students {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #909399;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .tutorials-container {
    padding: 0 10px;
  }
  
  .page-header h1 {
    font-size: 2rem;
  }
  
  .filter-card .el-row {
    gap: 10px;
  }
  
  .filter-card .el-col {
    margin-bottom: 10px;
  }
}
</style>
