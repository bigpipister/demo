<template>
  <div class="about">
    <NavBar />
    
    <el-container class="about-container">
      <!-- Hero Section -->
      <el-header height="auto">
        <div class="about-hero">
          <h1>關於我們</h1>
          <p>致力於提供高品質的程式碼教學，讓每個人都能掌握現代前端開發技能</p>
        </div>
      </el-header>
      
      <el-main>
        <!-- 使命願景 -->
        <el-row :gutter="40" class="mission-section">
          <el-col :xs="24" :md="12">
            <el-card class="mission-card" shadow="hover">
              <template #header>
                <div class="card-header">
                  <el-icon size="32" color="#409EFF"><Target /></el-icon>
                  <h2>我們的使命</h2>
                </div>
              </template>
              <p>
                我們致力於打破技術學習的壁壘，通過精心設計的課程和實踐項目，
                讓每個對編程感興趣的人都能夠輕鬆入門並精通現代前端開發技術。
              </p>
            </el-card>
          </el-col>
          
          <el-col :xs="24" :md="12">
            <el-card class="vision-card" shadow="hover">
              <template #header>
                <div class="card-header">
                  <el-icon size="32" color="#67C23A"><View /></el-icon>
                  <h2>我們的願景</h2>
                </div>
              </template>
              <p>
                成為華語地區最受信賴的程式碼教學平台，培養更多優秀的前端開發者，
                推動整個行業的技術進步和創新發展。
              </p>
            </el-card>
          </el-col>
        </el-row>
        
        <!-- 核心價值 -->
        <div class="values-section">
          <h2 class="section-title">核心價值</h2>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="8" v-for="value in coreValues" :key="value.id">
              <div class="value-item">
                <div class="value-icon">
                  <el-icon size="40" :color="value.color">
                    <component :is="value.icon" />
                  </el-icon>
                </div>
                <h3>{{ value.title }}</h3>
                <p>{{ value.description }}</p>
              </div>
            </el-col>
          </el-row>
        </div>
        
        <!-- 團隊介紹 -->
        <div class="team-section">
          <h2 class="section-title">核心團隊</h2>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="12" :md="6" v-for="member in teamMembers" :key="member.id">
              <el-card class="team-card" shadow="hover">
                <div class="member-avatar">
                  <el-avatar :size="80" :src="member.avatar" />
                </div>
                <div class="member-info">
                  <h3>{{ member.name }}</h3>
                  <p class="member-title">{{ member.title }}</p>
                  <p class="member-bio">{{ member.bio }}</p>
                </div>
                <div class="member-skills">
                  <el-tag v-for="skill in member.skills" :key="skill" size="small">
                    {{ skill }}
                  </el-tag>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
        
        <!-- 技術棧 -->
        <div class="tech-section">
          <h2 class="section-title">技術棧</h2>
          <p class="tech-intro">我們的課程涵蓋當前最流行和實用的前端技術</p>
          
          <el-row :gutter="20">
            <el-col :xs="12" :sm="8" :md="4" v-for="tech in technologies" :key="tech.id">
              <div class="tech-item">
                <div class="tech-logo">
                  <img :src="tech.logo" :alt="tech.name" />
                </div>
                <h4>{{ tech.name }}</h4>
                <p>{{ tech.description }}</p>
              </div>
            </el-col>
          </el-row>
        </div>
        
        <!-- 統計數據 -->
        <div class="stats-section">
          <h2 class="section-title">平台統計</h2>
          <el-row :gutter="20">
            <el-col :xs="12" :sm="6" v-for="stat in statistics" :key="stat.id">
              <div class="stat-item">
                <div class="stat-number">{{ stat.number }}</div>
                <div class="stat-label">{{ stat.label }}</div>
                <div class="stat-icon">
                  <el-icon size="24" :color="stat.color">
                    <component :is="stat.icon" />
                  </el-icon>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
        
        <!-- 聯繫我們 -->
        <div class="contact-section">
          <h2 class="section-title">聯繫我們</h2>
          <el-row :gutter="40">
            <el-col :xs="24" :md="12">
              <el-card class="contact-card" shadow="never">
                <h3>有任何問題嗎？</h3>
                <p>我們很樂意聽取您的意見和建議，幫助我們持續改進課程品質。</p>
                
                <div class="contact-info">
                  <div class="contact-item">
                    <el-icon><Message /></el-icon>
                    <span>contact@codelearning.com</span>
                  </div>
                  <div class="contact-item">
                    <el-icon><ChatDotRound /></el-icon>
                    <span>線上客服（週一至週五 9:00-18:00）</span>
                  </div>
                  <div class="contact-item">
                    <el-icon><Location /></el-icon>
                    <span>台北市信義區信義路五段7號</span>
                  </div>
                </div>
              </el-card>
            </el-col>
            
            <el-col :xs="24" :md="12">
              <el-card class="feedback-card" shadow="never">
                <h3>意見回饋</h3>
                <el-form :model="feedbackForm" label-width="80px">
                  <el-form-item label="姓名">
                    <el-input v-model="feedbackForm.name" placeholder="請輸入您的姓名" />
                  </el-form-item>
                  <el-form-item label="信箱">
                    <el-input v-model="feedbackForm.email" placeholder="請輸入您的信箱" />
                  </el-form-item>
                  <el-form-item label="訊息">
                    <el-input 
                      v-model="feedbackForm.message" 
                      type="textarea" 
                      :rows="4"
                      placeholder="請告訴我們您的想法..."
                    />
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="submitFeedback">
                      <el-icon><Promotion /></el-icon>
                      送出回饋
                    </el-button>
                  </el-form-item>
                </el-form>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import NavBar from '../components/NavBar.vue'

const feedbackForm = ref({
  name: '',
  email: '',
  message: ''
})

const coreValues = ref([
  {
    id: 1,
    title: '品質至上',
    description: '精心設計每一門課程，確保內容的準確性和實用性',
    icon: 'Medal',
    color: '#409EFF'
  },
  {
    id: 2,
    title: '實踐導向',
    description: '注重實際項目練習，讓學習者在實作中掌握技能',
    icon: 'Tools',
    color: '#67C23A'
  },
  {
    id: 3,
    title: '持續創新',
    description: '緊跟技術發展趨勢，不斷更新和優化課程內容',
    icon: 'Lightning',
    color: '#E6A23C'
  }
])

const teamMembers = ref([
  {
    id: 1,
    name: '張小明',
    title: '技術總監',
    bio: '8年前端開發經驗，Vue.js 核心貢獻者',
    avatar: 'https://via.placeholder.com/80x80?text=張小明',
    skills: ['Vue.js', 'React', 'TypeScript']
  },
  {
    id: 2,
    name: '李小華',
    title: '課程總監',
    bio: '擁有豐富的教學經驗，專精於課程設計',
    avatar: 'https://via.placeholder.com/80x80?text=李小華',
    skills: ['教學設計', 'UX設計', 'JavaScript']
  },
  {
    id: 3,
    name: '王小強',
    title: '前端工程師',
    bio: '專注於現代化前端工具鏈和最佳實踐',
    avatar: 'https://via.placeholder.com/80x80?text=王小強',
    skills: ['Vite', 'Webpack', 'Node.js']
  },
  {
    id: 4,
    name: '林小美',
    title: 'UI/UX 設計師',
    bio: '致力於創造優秀的用戶體驗和介面設計',
    avatar: 'https://via.placeholder.com/80x80?text=林小美',
    skills: ['UI設計', 'Figma', 'CSS']
  }
])

const technologies = ref([
  {
    id: 1,
    name: 'Vue.js',
    description: '漸進式框架',
    logo: 'https://via.placeholder.com/60x60?text=Vue'
  },
  {
    id: 2,
    name: 'React',
    description: '組件化庫',
    logo: 'https://via.placeholder.com/60x60?text=React'
  },
  {
    id: 3,
    name: 'TypeScript',
    description: '型別安全',
    logo: 'https://via.placeholder.com/60x60?text=TS'
  },
  {
    id: 4,
    name: 'Vite',
    description: '快速構建',
    logo: 'https://via.placeholder.com/60x60?text=Vite'
  },
  {
    id: 5,
    name: 'Element Plus',
    description: 'UI 組件庫',
    logo: 'https://via.placeholder.com/60x60?text=EP'
  },
  {
    id: 6,
    name: 'Tailwind CSS',
    description: '實用優先',
    logo: 'https://via.placeholder.com/60x60?text=TW'
  }
])

const statistics = ref([
  {
    id: 1,
    number: '10,000+',
    label: '註冊學員',
    icon: 'User',
    color: '#409EFF'
  },
  {
    id: 2,
    number: '50+',
    label: '優質課程',
    icon: 'Document',
    color: '#67C23A'
  },
  {
    id: 3,
    number: '95%',
    label: '滿意度',
    icon: 'Star',
    color: '#E6A23C'
  },
  {
    id: 4,
    number: '24/7',
    label: '在線支援',
    icon: 'Service',
    color: '#F56C6C'
  }
])

const submitFeedback = () => {
  // 這裡可以實作送出回饋的邏輯
  console.log('提交回饋:', feedbackForm.value)
  // 模擬提交成功
  feedbackForm.value = { name: '', email: '', message: '' }
  // 顯示成功訊息
}
</script>

<style scoped>
.about {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.about-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.about-hero {
  text-align: center;
  padding: 60px 0 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  margin: 0 -20px 40px;
}

.about-hero h1 {
  font-size: 3rem;
  margin-bottom: 20px;
  font-weight: bold;
}

.about-hero p {
  font-size: 1.3rem;
  max-width: 600px;
  margin: 0 auto;
  opacity: 0.9;
}

.section-title {
  text-align: center;
  font-size: 2.2rem;
  color: #303133;
  margin-bottom: 40px;
}

.mission-section {
  margin-bottom: 60px;
}

.mission-card, .vision-card {
  height: 100%;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 15px;
}

.card-header h2 {
  margin: 0;
  color: #303133;
}

.values-section {
  margin-bottom: 80px;
  padding: 60px 40px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.value-item {
  text-align: center;
  padding: 30px 20px;
}

.value-icon {
  margin-bottom: 20px;
}

.value-item h3 {
  font-size: 1.3rem;
  color: #303133;
  margin-bottom: 15px;
}

.value-item p {
  color: #606266;
  line-height: 1.6;
}

.team-section {
  margin-bottom: 80px;
}

.team-card {
  text-align: center;
  height: 100%;
  transition: transform 0.3s ease;
}

.team-card:hover {
  transform: translateY(-5px);
}

.member-avatar {
  margin-bottom: 20px;
}

.member-info h3 {
  color: #303133;
  margin-bottom: 5px;
}

.member-title {
  color: #409EFF;
  font-weight: 500;
  margin-bottom: 10px;
}

.member-bio {
  color: #606266;
  font-size: 0.9rem;
  margin-bottom: 15px;
  line-height: 1.5;
}

.member-skills {
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
}

.tech-section {
  margin-bottom: 80px;
  padding: 60px 40px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.tech-intro {
  text-align: center;
  color: #606266;
  font-size: 1.1rem;
  margin-bottom: 40px;
}

.tech-item {
  text-align: center;
  padding: 20px;
  transition: transform 0.3s ease;
}

.tech-item:hover {
  transform: translateY(-3px);
}

.tech-logo {
  margin-bottom: 15px;
}

.tech-logo img {
  width: 60px;
  height: 60px;
  object-fit: contain;
}

.tech-item h4 {
  color: #303133;
  margin-bottom: 8px;
}

.tech-item p {
  color: #909399;
  font-size: 0.9rem;
}

.stats-section {
  margin-bottom: 80px;
}

.stat-item {
  text-align: center;
  padding: 30px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: bold;
  color: #303133;
  margin-bottom: 10px;
}

.stat-label {
  color: #606266;
  font-size: 1.1rem;
  margin-bottom: 15px;
}

.stat-icon {
  position: absolute;
  top: 20px;
  right: 20px;
  opacity: 0.1;
}

.contact-section {
  margin-bottom: 40px;
}

.contact-card, .feedback-card {
  height: 100%;
}

.contact-card h3, .feedback-card h3 {
  color: #303133;
  margin-bottom: 15px;
}

.contact-info {
  margin-top: 25px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 15px;
  color: #606266;
}

@media (max-width: 768px) {
  .about-hero h1 {
    font-size: 2.2rem;
  }
  
  .about-hero p {
    font-size: 1.1rem;
  }
  
  .section-title {
    font-size: 1.8rem;
  }
  
  .values-section, .tech-section {
    padding: 40px 20px;
  }
  
  .stat-number {
    font-size: 2rem;
  }
}
</style>
