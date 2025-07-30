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

        <!-- 教學列表 -->
        <el-row :gutter="20" class="tutorials-grid">
          <el-col 
            :xs="24" :sm="12" :lg="8" 
            v-for="tutorial in filteredTutorials" 
            :key="tutorial.id"
          >
            <el-card class="tutorial-card" shadow="hover" @click="viewTutorial(tutorial.id)">
              <div class="tutorial-image-container">
                <img :src="tutorial.image" class="tutorial-image" :alt="tutorial.title" />
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
                      {{ tutorial.lessons }} 課
                    </span>
                  </div>
                </div>
                
                <div class="tutorial-stats">
                  <div class="tutorial-rating">
                    <el-rate v-model="tutorial.rating" disabled show-score />
                  </div>
                  <div class="tutorial-students">
                    <el-icon><User /></el-icon>
                    {{ tutorial.students }} 學習者
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

const router = useRouter()

const selectedCategory = ref('all')
const selectedLevel = ref('all')
const searchKeyword = ref('')

const tutorials = ref([
  {
    id: 1,
    title: 'Vue 3 基礎入門',
    description: '從零開始學習 Vue 3 的核心概念，包括響應式數據、組件開發和 Composition API',
    image: 'https://via.placeholder.com/400x250?text=Vue+3',
    category: 'Vue.js',
    level: '初級',
    duration: '2小時',
    lessons: 8,
    rating: 4.8,
    students: 1250
  },
  {
    id: 2,
    title: 'Vite 構建工具詳解',
    description: '深入了解 Vite 的特性和配置，學習如何優化開發環境和構建流程',
    image: 'https://via.placeholder.com/400x250?text=Vite',
    category: '工具',
    level: '中級',
    duration: '1.5小時',
    lessons: 6,
    rating: 4.6,
    students: 890
  },
  {
    id: 3,
    title: 'Element Plus 組件庫',
    description: '掌握 Element Plus 組件的使用技巧，學習如何自定義主題和組件',
    image: 'https://via.placeholder.com/400x250?text=Element+Plus',
    category: 'Vue.js',
    level: '初級',
    duration: '3小時',
    lessons: 12,
    rating: 4.7,
    students: 2100
  },
  {
    id: 4,
    title: 'JavaScript ES6+ 進階',
    description: '深入學習現代 JavaScript 特性，包括異步編程、模組化和新語法',
    image: 'https://via.placeholder.com/400x250?text=JavaScript',
    category: 'JavaScript',
    level: '中級',
    duration: '4小時',
    lessons: 15,
    rating: 4.9,
    students: 3200
  },
  {
    id: 5,
    title: 'CSS Grid 與 Flexbox',
    description: '掌握現代 CSS 布局技術，創建響應式和靈活的網頁布局',
    image: 'https://via.placeholder.com/400x250?text=CSS+Layout',
    category: 'CSS',
    level: '中級',
    duration: '2.5小時',
    lessons: 10,
    rating: 4.5,
    students: 1800
  },
  {
    id: 6,
    title: 'Vue Router 4 路由管理',
    description: '學習 Vue Router 4 的新特性，實現單頁應用的路由管理',
    image: 'https://via.placeholder.com/400x250?text=Vue+Router',
    category: 'Vue.js',
    level: '高級',
    duration: '2小時',
    lessons: 8,
    rating: 4.6,
    students: 950
  }
])

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
