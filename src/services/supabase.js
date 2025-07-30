// Supabase 客戶端配置
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 資料庫操作類
export class SupabaseService {
  
  // 獲取所有教學課程（支援篩選和搜尋）
  async getTutorials(filters = {}) {
    try {
      let query = supabase
        .from('tutorials')
        .select(`
          *,
          instructors (
            id,
            name,
            title,
            avatar_url
          )
        `)
        .eq('is_published', true)

      // 應用篩選條件
      if (filters.category) {
        query = query.eq('category', filters.category)
      }
      if (filters.level) {
        query = query.eq('level', filters.level)
      }
      if (filters.search) {
        query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
      }

      // 排序
      const sortBy = filters.sortBy || 'created_at'
      const sortOrder = filters.sortOrder || 'desc'
      query = query.order(sortBy, { ascending: sortOrder === 'asc' })

      const { data, error } = await query
      if (error) throw error
      
      // 格式化數據以匹配前端期望格式
      return data.map(tutorial => ({
        ...tutorial,
        instructor: tutorial.instructors
      }))
    } catch (error) {
      console.error('Error fetching tutorials:', error)
      throw error
    }
  }

  // 獲取單個教學
  async getTutorial(id) {
    try {
      const { data, error } = await supabase
        .from('tutorials')
        .select(`
          *,
          instructors (*),
          tutorial_chapters (
            *,
            tutorial_lessons (*)
          )
        `)
        .eq('id', id)
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching tutorial:', error)
      throw error
    }
  }

  // 獲取講師列表
  async getInstructors() {
    try {
      const { data, error } = await supabase
        .from('instructors')
        .select('*')
        .order('name')

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching instructors:', error)
      throw error
    }
  }

  // 用戶註冊
  async signUp(email, password, userData) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
        }
      })

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error signing up:', error)
      throw error
    }
  }

  // 用戶登入
  async signIn(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error signing in:', error)
      throw error
    }
  }

  // 用戶登出
  async signOut() {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error) {
      console.error('Error signing out:', error)
      throw error
    }
  }

  // 獲取當前用戶
  async getCurrentUser() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      return user
    } catch (error) {
      console.error('Error getting current user:', error)
      return null
    }
  }

  // 更新學習進度
  async updateProgress(userId, lessonId, completed = true) {
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: userId,
          lesson_id: lessonId,
          completed,
          completed_at: completed ? new Date().toISOString() : null
        })

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error updating progress:', error)
      throw error
    }
  }

  // 獲取用戶進度
  async getUserProgress(userId) {
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select(`
          *,
          tutorial_lessons (
            id,
            title,
            tutorial_chapters (
              tutorial_id
            )
          )
        `)
        .eq('user_id', userId)

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching user progress:', error)
      throw error
    }
  }

  // 提交課程評價
  async submitReview(tutorialId, userId, rating, comment) {
    try {
      const { data, error } = await supabase
        .from('tutorial_reviews')
        .upsert({
          tutorial_id: tutorialId,
          user_id: userId,
          rating,
          comment
        })

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error submitting review:', error)
      throw error
    }
  }

  // 獲取課程評價
  async getTutorialReviews(tutorialId) {
    try {
      const { data, error } = await supabase
        .from('tutorial_reviews')
        .select(`
          *,
          users (
            id,
            full_name,
            avatar_url
          )
        `)
        .eq('tutorial_id', tutorialId)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching reviews:', error)
      throw error
    }
  }
}

// 創建服務實例
export const supabaseService = new SupabaseService()
