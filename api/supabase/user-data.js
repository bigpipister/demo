// Vercel API 端點 - 用戶進度和評價相關操作
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://qsljizkshpbvfotcarjn.supabase.co'
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default async function handler(req, res) {
  // 設置 CORS
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  try {
    const { method, query, body } = req

    switch (method) {
      case 'GET':
        if (query.type === 'progress' && query.userId) {
          // 獲取用戶進度
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
            .eq('user_id', query.userId)

          if (error) throw error
          return res.status(200).json(data)
        } else if (query.type === 'reviews' && query.tutorialId) {
          // 獲取課程評價
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
            .eq('tutorial_id', query.tutorialId)
            .order('created_at', { ascending: false })

          if (error) throw error
          return res.status(200).json(data)
        } else if (query.type === 'instructors') {
          // 獲取講師列表
          const { data, error } = await supabase
            .from('instructors')
            .select('*')
            .order('name')

          if (error) throw error
          return res.status(200).json(data)
        }
        break

      case 'POST':
        if (query.type === 'progress') {
          // 更新學習進度
          const { userId, lessonId, completed = true } = body
          const { data, error } = await supabase
            .from('user_progress')
            .upsert({
              user_id: userId,
              lesson_id: lessonId,
              completed,
              completed_at: completed ? new Date().toISOString() : null
            })

          if (error) throw error
          return res.status(200).json(data)
        } else if (query.type === 'reviews') {
          // 提交課程評價
          const { tutorialId, userId, rating, comment } = body
          const { data, error } = await supabase
            .from('tutorial_reviews')
            .upsert({
              tutorial_id: tutorialId,
              user_id: userId,
              rating,
              comment
            })

          if (error) throw error
          return res.status(201).json(data)
        }
        break

      default:
        res.setHeader('Allow', ['GET', 'POST'])
        return res.status(405).end(`Method ${method} Not Allowed`)
    }
  } catch (error) {
    console.error('User Data API Error:', error)
    return res.status(500).json({ error: error.message })
  }
}
