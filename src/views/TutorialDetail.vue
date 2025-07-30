<template>
  <div class="tutorial-detail">
    <NavBar />
    
    <el-container v-if="tutorial" class="tutorial-container">
      <!-- 教學標題區域 -->
      <el-header height="auto">
        <div class="tutorial-hero">
          <div class="tutorial-hero-content">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
              <el-breadcrumb-item :to="{ path: '/tutorials' }">教學課程</el-breadcrumb-item>
              <el-breadcrumb-item>{{ tutorial.title }}</el-breadcrumb-item>
            </el-breadcrumb>
            
            <h1 class="tutorial-title">{{ tutorial.title }}</h1>
            <p class="tutorial-description">{{ tutorial.description }}</p>
            
            <div class="tutorial-meta">
              <el-tag :type="getLevelType(tutorial.level)" size="large">
                {{ tutorial.level }}
              </el-tag>
              <span class="tutorial-duration">
                <el-icon><Clock /></el-icon>
                {{ tutorial.duration }}
              </span>
              <span class="tutorial-lessons">
                <el-icon><Document /></el-icon>
                {{ tutorial.lessons }} 課
              </span>
              <div class="tutorial-rating">
                <el-rate v-model="tutorial.rating" disabled show-score />
              </div>
            </div>
          </div>
          
          <div class="tutorial-hero-image">
            <img :src="tutorial.image" :alt="tutorial.title" />
          </div>
        </div>
      </el-header>
      
      <el-main>
        <el-row :gutter="20">
          <!-- 課程內容 -->
          <el-col :xs="24" :lg="16">
            <el-card class="content-card" shadow="never">
              <template #header>
                <div class="card-header">
                  <h2>課程內容</h2>
                  <el-button type="primary" @click="startLearning">開始學習</el-button>
                </div>
              </template>
              
              <div class="course-curriculum">
                <el-collapse v-model="activeChapters" accordion>
                  <el-collapse-item 
                    v-for="chapter in tutorial.chapters" 
                    :key="chapter.id"
                    :title="chapter.title"
                    :name="chapter.id"
                  >
                    <template #title>
                      <div class="chapter-title">
                        <el-icon><FolderOpened /></el-icon>
                        <span>{{ chapter.title }}</span>
                        <el-tag size="small">{{ chapter.lessons.length }} 課</el-tag>
                      </div>
                    </template>
                    
                    <div class="chapter-content">
                      <div 
                        v-for="lesson in chapter.lessons" 
                        :key="lesson.id"
                        class="lesson-item"
                        @click="playLesson(lesson)"
                      >
                        <div class="lesson-info">
                          <el-icon>
                            <VideoPlay v-if="lesson.type === 'video'" />
                            <Document v-else-if="lesson.type === 'text'" />
                            <EditPen v-else />
                          </el-icon>
                          <span class="lesson-title">{{ lesson.title }}</span>
                          <span class="lesson-duration">{{ lesson.duration }}</span>
                        </div>
                        <div class="lesson-status">
                          <el-icon v-if="lesson.completed" color="#67C23A"><Check /></el-icon>
                          <el-icon v-else color="#C0C4CC"><Clock /></el-icon>
                        </div>
                      </div>
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </el-card>
            
            <!-- 課程說明 -->
            <el-card class="description-card" shadow="never">
              <template #header>
                <h2>課程說明</h2>
              </template>
              
              <div class="course-description">
                <h3>你將學到什麼</h3>
                <ul class="learning-objectives">
                  <li v-for="objective in tutorial.objectives" :key="objective">
                    <el-icon color="#67C23A"><Check /></el-icon>
                    {{ objective }}
                  </li>
                </ul>
                
                <h3>課程要求</h3>
                <ul class="requirements">
                  <li v-for="requirement in tutorial.requirements" :key="requirement">
                    {{ requirement }}
                  </li>
                </ul>
              </div>
            </el-card>
          </el-col>
          
          <!-- 側邊欄 -->
          <el-col :xs="24" :lg="8">
            <!-- 講師信息 -->
            <el-card class="instructor-card" shadow="never">
              <template #header>
                <h3>講師</h3>
              </template>
              
              <div class="instructor-info">
                <el-avatar :size="60" :src="tutorial.instructor.avatar" />
                <div class="instructor-details">
                  <h4>{{ tutorial.instructor.name }}</h4>
                  <p>{{ tutorial.instructor.title }}</p>
                  <div class="instructor-stats">
                    <div class="stat">
                      <strong>{{ tutorial.instructor.students }}</strong>
                      <span>學生</span>
                    </div>
                    <div class="stat">
                      <strong>{{ tutorial.instructor.courses }}</strong>
                      <span>課程</span>
                    </div>
                    <div class="stat">
                      <strong>{{ tutorial.instructor.rating }}</strong>
                      <span>評分</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <p class="instructor-bio">{{ tutorial.instructor.bio }}</p>
            </el-card>
            
            <!-- 相關課程 -->
            <el-card class="related-courses" shadow="never">
              <template #header>
                <h3>相關課程</h3>
              </template>
              
              <div class="related-course-list">
                <div 
                  v-for="course in relatedCourses" 
                  :key="course.id"
                  class="related-course-item"
                  @click="$router.push(`/tutorial/${course.id}`)"
                >
                  <img :src="course.image" :alt="course.title" />
                  <div class="course-info">
                    <h5>{{ course.title }}</h5>
                    <div class="course-meta">
                      <el-tag :type="getLevelType(course.level)" size="small">
                        {{ course.level }}
                      </el-tag>
                      <span>{{ course.duration }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
    
    <!-- 課程未找到 -->
    <el-container v-else class="not-found">
      <el-main>
        <el-empty description="課程未找到">
          <el-button type="primary" @click="$router.push('/tutorials')">
            返回課程列表
          </el-button>
        </el-empty>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import NavBar from '../components/NavBar.vue'
import { getEnvInfo } from '../utils/envTest.js'

const route = useRoute()
const router = useRouter()

const props = defineProps({
  id: String
})

const activeChapters = ref(['1'])

// 模擬教學數據
const tutorials = ref([
  {
    id: 1,
    title: 'Vue 3 基礎入門',
    description: '從零開始學習 Vue 3 的核心概念，包括響應式數據、組件開發和 Composition API。通過實際項目練習，掌握現代前端開發技能。',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=300&fit=crop&auto=format',
    level: '初級',
    duration: '2小時',
    lessons: 8,
    rating: 4.8,
    objectives: [
      '理解 Vue 3 的核心概念和特性',
      '掌握 Composition API 的使用方法',
      '學會創建和管理 Vue 組件',
      '了解響應式數據的工作原理',
      '能夠構建簡單的 Vue 3 應用'
    ],
    requirements: [
      '基礎的 HTML、CSS 和 JavaScript 知識',
      '了解 ES6+ 語法',
      '有基本的編程經驗'
    ],
    instructor: {
      name: '張小明',
      title: '資深前端工程師',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&auto=format&face=center',
      bio: '擁有 8 年前端開發經驗，專精於 Vue.js 生態系統，曾在多家知名互聯網公司擔任技術主管。',
      students: 12500,
      courses: 15,
      rating: 4.9
    },
    chapters: [
      {
        id: '1',
        title: 'Vue 3 介紹與環境設置',
        lessons: [
          {
            id: '1-1',
            title: 'Vue 3 新特性概覽',
            duration: '10分鐘',
            type: 'video',
            completed: false
          },
          {
            id: '1-2',
            title: '開發環境設置',
            duration: '15分鐘',
            type: 'video',
            completed: false
          },
          {
            id: '1-3',
            title: '創建第一個 Vue 3 應用',
            duration: '20分鐘',
            type: 'video',
            completed: false
          }
        ]
      },
      {
        id: '2',
        title: 'Composition API 基礎',
        lessons: [
          {
            id: '2-1',
            title: 'setup 函數介紹',
            duration: '18分鐘',
            type: 'video',
            completed: false
          },
          {
            id: '2-2',
            title: 'ref 和 reactive',
            duration: '25分鐘',
            type: 'video',
            completed: false
          },
          {
            id: '2-3',
            title: '實作練習：計數器應用',
            duration: '30分鐘',
            type: 'practice',
            completed: false
          }
        ]
      },
      {
        id: '3',
        title: '組件開發',
        lessons: [
          {
            id: '3-1',
            title: '組件基礎與 Props',
            duration: '22分鐘',
            type: 'video',
            completed: false
          },
          {
            id: '3-2',
            title: '事件處理與 Emit',
            duration: '20分鐘',
            type: 'video',
            completed: false
          }
        ]
      }
    ]
  }
])

const relatedCourses = ref([
  {
    id: 2,
    title: 'Vite 構建工具詳解',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=100&h=60&fit=crop&auto=format',
    level: '中級',
    duration: '1.5小時'
  },
  {
    id: 3,
    title: 'Element Plus 組件庫',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=100&h=60&fit=crop&auto=format',
    level: '初級',
    duration: '3小時'
  }
])

const tutorial = computed(() => {
  const id = parseInt(props.id || route.params.id)
  return tutorials.value.find(t => t.id === id)
})

const getLevelType = (level) => {
  const types = {
    '初級': 'success',
    '中級': 'warning',
    '高級': 'danger'
  }
  return types[level] || 'info'
}

const startLearning = () => {
  // 這裡可以實作開始學習的邏輯，例如跳轉到第一課
  if (tutorial.value && tutorial.value.chapters.length > 0) {
    const firstLesson = tutorial.value.chapters[0].lessons[0]
    playLesson(firstLesson)
  }
}

const playLesson = (lesson) => {
  // 這裡可以實作播放課程的邏輯
  console.log('播放課程:', lesson.title)
  
  // 🔍 環境變數測試 - 查看構建時注入的值
  console.log('環境變數測試:', getEnvInfo())
  
  // 可以跳轉到課程播放頁面或顯示課程內容
}
</script>

<style scoped>
.tutorial-detail {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.tutorial-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.tutorial-hero {
  display: flex;
  gap: 40px;
  padding: 40px 0;
  align-items: center;
}

.tutorial-hero-content {
  flex: 1;
}

.tutorial-hero-image {
  flex: 0 0 300px;
}

.tutorial-hero-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
}

.tutorial-title {
  font-size: 2.5rem;
  color: #303133;
  margin: 20px 0 15px;
  line-height: 1.3;
}

.tutorial-description {
  font-size: 1.1rem;
  color: #606266;
  line-height: 1.6;
  margin-bottom: 25px;
}

.tutorial-meta {
  display: flex;
  gap: 20px;
  align-items: center;
  flex-wrap: wrap;
}

.tutorial-meta span {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #909399;
}

.content-card, .description-card, .instructor-card, .related-courses {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chapter-title {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
}

.chapter-content {
  padding: 10px 0;
}

.lesson-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border: 1px solid #f0f0f0;
  border-radius: 6px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.lesson-item:hover {
  background-color: #f8f9fa;
}

.lesson-info {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.lesson-title {
  flex: 1;
  color: #303133;
}

.lesson-duration {
  color: #909399;
  font-size: 0.9rem;
}

.learning-objectives, .requirements {
  padding-left: 0;
}

.learning-objectives li {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  list-style: none;
}

.requirements li {
  margin-bottom: 8px;
  padding-left: 15px;
  position: relative;
}

.requirements li:before {
  content: '•';
  position: absolute;
  left: 0;
  color: #409EFF;
}

.instructor-info {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
}

.instructor-details h4 {
  margin: 0 0 5px;
  color: #303133;
}

.instructor-details p {
  margin: 0 0 10px;
  color: #606266;
  font-size: 0.9rem;
}

.instructor-stats {
  display: flex;
  gap: 15px;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.85rem;
}

.stat strong {
  color: #303133;
  font-size: 1rem;
}

.stat span {
  color: #909399;
}

.instructor-bio {
  color: #606266;
  line-height: 1.6;
  font-size: 0.9rem;
}

.related-course-item {
  display: flex;
  gap: 12px;
  padding: 12px;
  border: 1px solid #f0f0f0;
  border-radius: 6px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.related-course-item:hover {
  background-color: #f8f9fa;
}

.related-course-item img {
  width: 80px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
}

.course-info {
  flex: 1;
}

.course-info h5 {
  margin: 0 0 8px;
  color: #303133;
  font-size: 0.95rem;
  line-height: 1.3;
}

.course-meta {
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: 0.85rem;
}

.course-meta span {
  color: #909399;
}

.not-found {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 768px) {
  .tutorial-hero {
    flex-direction: column;
    text-align: center;
  }
  
  .tutorial-hero-image {
    flex: none;
    width: 100%;
  }
  
  .tutorial-title {
    font-size: 2rem;
  }
  
  .tutorial-meta {
    justify-content: center;
  }
  
  .card-header {
    flex-direction: column;
    gap: 15px;
    align-items: stretch;
  }
  
  .instructor-info {
    flex-direction: column;
    text-align: center;
  }
  
  .instructor-stats {
    justify-content: center;
  }
}
</style>
