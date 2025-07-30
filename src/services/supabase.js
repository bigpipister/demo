// Supabase 客戶端配置 - 通過 Vercel API 存取
// 資料庫操作類
export class SupabaseService {
  constructor() {
    this.baseURL = import.meta.env.PROD
      ? 'https://demo-iota-nine-24.vercel.app/api/supabase'
      : '/api/supabase'
  }

  // HTTP 請求輔助方法
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    }

    try {
      const response = await fetch(url, config)
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }
  
  // 獲取所有教學課程（支援篩選和搜尋）
  async getTutorials(filters = {}) {
    try {
      const params = new URLSearchParams()
      
      if (filters.category) params.append('category', filters.category)
      if (filters.level) params.append('level', filters.level)
      if (filters.search) params.append('search', filters.search)
      if (filters.sortBy) params.append('sortBy', filters.sortBy)
      if (filters.sortOrder) params.append('sortOrder', filters.sortOrder)

      const endpoint = `/tutorials${params.toString() ? `?${params.toString()}` : ''}`
      return await this.request(endpoint)
    } catch (error) {
      console.error('Error fetching tutorials:', error)
      throw error
    }
  }

  // 獲取單個教學
  async getTutorial(id) {
    try {
      return await this.request(`/tutorials?id=${id}`)
    } catch (error) {
      console.error('Error fetching tutorial:', error)
      throw error
    }
  }

  // 獲取講師列表
  async getInstructors() {
    try {
      return await this.request('/user-data?type=instructors')
    } catch (error) {
      console.error('Error fetching instructors:', error)
      throw error
    }
  }

  // 用戶註冊
  async signUp(email, password, userData) {
    try {
      return await this.request('/auth?action=signup', {
        method: 'POST',
        body: JSON.stringify({ email, password, userData })
      })
    } catch (error) {
      console.error('Error signing up:', error)
      throw error
    }
  }

  // 用戶登入
  async signIn(email, password) {
    try {
      return await this.request('/auth?action=signin', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      })
    } catch (error) {
      console.error('Error signing in:', error)
      throw error
    }
  }

  // 用戶登出
  async signOut() {
    try {
      return await this.request('/auth?action=signout', {
        method: 'POST'
      })
    } catch (error) {
      console.error('Error signing out:', error)
      throw error
    }
  }

  // 獲取當前用戶
  async getCurrentUser() {
    try {
      const token = localStorage.getItem('supabase-auth-token')
      if (!token) return null

      return await this.request('/auth?action=user', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
    } catch (error) {
      console.error('Error getting current user:', error)
      return null
    }
  }

  // 更新學習進度
  async updateProgress(userId, lessonId, completed = true) {
    try {
      return await this.request('/user-data?type=progress', {
        method: 'POST',
        body: JSON.stringify({ userId, lessonId, completed })
      })
    } catch (error) {
      console.error('Error updating progress:', error)
      throw error
    }
  }

  // 獲取用戶進度
  async getUserProgress(userId) {
    try {
      return await this.request(`/user-data?type=progress&userId=${userId}`)
    } catch (error) {
      console.error('Error fetching user progress:', error)
      throw error
    }
  }

  // 提交課程評價
  async submitReview(tutorialId, userId, rating, comment) {
    try {
      return await this.request('/user-data?type=reviews', {
        method: 'POST',
        body: JSON.stringify({ tutorialId, userId, rating, comment })
      })
    } catch (error) {
      console.error('Error submitting review:', error)
      throw error
    }
  }

  // 獲取課程評價
  async getTutorialReviews(tutorialId) {
    try {
      return await this.request(`/user-data?type=reviews&tutorialId=${tutorialId}`)
    } catch (error) {
      console.error('Error fetching reviews:', error)
      throw error
    }
  }
}

// 創建服務實例
export const supabaseService = new SupabaseService()
