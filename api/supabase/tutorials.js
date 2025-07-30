// Vercel API 端點 - 教學課程相關操作
import { createClient } from '@supabase/supabase-js'
import { verifyApiKey, rateLimit, setCorsHeaders } from '../middleware/security.js'

const supabaseUrl = process.env.SUPABASE_URL || 'https://qsljizkshpbvfotcarjn.supabase.co'
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzbGppemtzaHBidmZvdGNhcmpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4NTY5NTUsImV4cCI6MjA2OTQzMjk1NX0.rZk0UBzYMsXcBkyONn808PmpPhRaGwjSUV3ElyRlWAs'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default async function handler(req, res) {
  // 設置 CORS
  setCorsHeaders(res)

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  // API 密鑰驗證
  const authResult = verifyApiKey(req)
  if (!authResult.valid) {
    return res.status(401).json({ error: authResult.error })
  }

  // 速率限制
  const rateLimitResult = rateLimit(req, 100, 60000) // 每分鐘最多 100 次請求
  if (!rateLimitResult.allowed) {
    return res.status(429).json({ 
      error: rateLimitResult.error,
      resetTime: rateLimitResult.resetTime
    })
  }

  try {
    const { method, query, body } = req

    switch (method) {
      case 'GET':
        if (query.id) {
          // 獲取單個教學
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
            .eq('id', query.id)
            .single()

          if (error) throw error
          return res.status(200).json(data)
        } else {
          // 獲取教學列表（支援篩選）
          let supabaseQuery = supabase
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
          if (query.category) {
            supabaseQuery = supabaseQuery.eq('category', query.category)
          }
          if (query.level) {
            supabaseQuery = supabaseQuery.eq('level', query.level)
          }
          if (query.search) {
            supabaseQuery = supabaseQuery.or(`title.ilike.%${query.search}%,description.ilike.%${query.search}%`)
          }

          // 排序
          const sortBy = query.sortBy || 'created_at'
          const sortOrder = query.sortOrder || 'desc'
          supabaseQuery = supabaseQuery.order(sortBy, { ascending: sortOrder === 'asc' })

          const { data, error } = await supabaseQuery
          if (error) throw error

          // 格式化數據
          const formattedData = data.map(tutorial => ({
            ...tutorial,
            instructor: tutorial.instructors
          }))

          return res.status(200).json(formattedData)
        }

      case 'POST':
        // 創建新教學（需要管理員權限）
        const { data: newTutorial, error: createError } = await supabase
          .from('tutorials')
          .insert(body)
          .select()

        if (createError) throw createError
        return res.status(201).json(newTutorial)

      case 'PUT':
        // 更新教學
        const { data: updatedTutorial, error: updateError } = await supabase
          .from('tutorials')
          .update(body)
          .eq('id', query.id)
          .select()

        if (updateError) throw updateError
        return res.status(200).json(updatedTutorial)

      case 'DELETE':
        // 刪除教學
        const { error: deleteError } = await supabase
          .from('tutorials')
          .delete()
          .eq('id', query.id)

        if (deleteError) throw deleteError
        return res.status(204).end()

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
        return res.status(405).end(`Method ${method} Not Allowed`)
    }
  } catch (error) {
    console.error('API Error:', error)
    return res.status(500).json({ error: error.message })
  }
}
