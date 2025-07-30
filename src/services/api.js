// API 服務類，優先使用 Supabase，備用 API 端點
import { SupabaseService } from './supabase.js'

// 初始化 Supabase 服務
const supabaseService = new SupabaseService()

class ApiService {
  constructor() {
    this.baseURL = process.env.NODE_ENV === 'production' 
      ? 'https://demo-iota-nine-24.vercel.app/api' 
      : '/api'
    this.useSupabase = true // 優先使用 Supabase
    this.apiKey = import.meta.env.VITE_API_SECRET_KEY || 'demo-secret-key-12345'
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey, // 添加 API 密鑰
        ...options.headers
      },
      ...options
    }

    try {
      const response = await fetch(url, config)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // 教學相關 API
  async getTutorials(filters = {}) {
    if (this.useSupabase) {
      try {
        return await supabaseService.getTutorials(filters)
      } catch (error) {
        console.log('Supabase failed, using backup data')
        return this.getBackupTutorials(filters)
      }
    }
    return this.request('/tutorials')
  }

  async getTutorial(id) {
    if (this.useSupabase) {
      try {
        return await supabaseService.getTutorial(id)
      } catch (error) {
        console.log('Supabase failed, using backup data')
        return this.getBackupTutorial(id)
      }
    }
    return this.request(`/tutorials?id=${id}`)
  }

  async createTutorial(tutorialData) {
    return this.request('/tutorials', {
      method: 'POST',
      body: JSON.stringify(tutorialData)
    })
  }

  async updateTutorial(id, tutorialData) {
    return this.request(`/tutorials?id=${id}`, {
      method: 'PUT',
      body: JSON.stringify(tutorialData)
    })
  }

  async deleteTutorial(id) {
    return this.request(`/tutorials?id=${id}`, {
      method: 'DELETE'
    })
  }

  // 講師相關 API
  async getInstructors() {
    if (this.useSupabase) {
      try {
        return await supabaseService.getInstructors()
      } catch (error) {
        console.log('Supabase failed, using backup data')
        return []
      }
    }
    return this.request('/instructors')
  }

  // 用戶相關 API
  async register(userData) {
    if (this.useSupabase) {
      return await supabaseService.signUp(userData.email, userData.password, userData)
    }
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    })
  }

  async login(credentials) {
    if (this.useSupabase) {
      return await supabaseService.signIn(credentials.email, credentials.password)
    }
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    })
  }

  async logout() {
    if (this.useSupabase) {
      return await supabaseService.signOut()
    }
    return this.request('/auth/logout', { method: 'POST' })
  }

  async getCurrentUser() {
    if (this.useSupabase) {
      return await supabaseService.getCurrentUser()
    }
    return this.request('/auth/me')
  }

  async getUserProgress(userId) {
    if (this.useSupabase) {
      return await supabaseService.getUserProgress(userId)
    }
    return this.request(`/progress?userId=${userId}`)
  }

  async updateProgress(userId, lessonId, completed = true) {
    if (this.useSupabase) {
      return await supabaseService.updateProgress(userId, lessonId, completed)
    }
    return this.request('/progress', {
      method: 'POST',
      body: JSON.stringify({ userId, lessonId, completed })
    })
  }

  // 評價相關 API
  async getTutorialReviews(tutorialId) {
    if (this.useSupabase) {
      return await supabaseService.getTutorialReviews(tutorialId)
    }
    return this.request(`/reviews?tutorialId=${tutorialId}`)
  }

  async submitReview(reviewData) {
    if (this.useSupabase) {
      return await supabaseService.submitReview(
        reviewData.tutorialId, 
        reviewData.userId, 
        reviewData.rating, 
        reviewData.comment
      )
    }
    return this.request('/reviews', {
      method: 'POST',
      body: JSON.stringify(reviewData)
    })
  }

  // 備用數據（支援篩選）
  getBackupTutorials(filters = {}) {
    let tutorials = [
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
        students_count: 1250,
        is_published: true
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
        students_count: 890,
        is_published: true
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
        students_count: 2100,
        is_published: true
      }
    ]

    // 應用篩選條件
    if (filters.category) {
      tutorials = tutorials.filter(t => t.category === filters.category)
    }
    if (filters.level) {
      tutorials = tutorials.filter(t => t.level === filters.level)
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      tutorials = tutorials.filter(t => 
        t.title.toLowerCase().includes(searchLower) || 
        t.description.toLowerCase().includes(searchLower)
      )
    }

    // 排序
    const sortBy = filters.sortBy || 'id'
    const sortOrder = filters.sortOrder || 'desc'
    tutorials.sort((a, b) => {
      const aVal = a[sortBy]
      const bVal = b[sortBy]
      const comparison = aVal > bVal ? 1 : aVal < bVal ? -1 : 0
      return sortOrder === 'asc' ? comparison : -comparison
    })

    return tutorials
  }

  getBackupTutorial(id) {
    const tutorials = this.getBackupTutorials()
    return tutorials.find(t => t.id == id) || null
  }
}

// 創建單例實例
const apiService = new ApiService()

export default apiService
