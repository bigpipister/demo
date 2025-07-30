// Vercel API 端點 - 教學課程相關操作
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://qsljizkshpbvfotcarjn.supabase.co'
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default async function handler(req, res) {
  // 設置 CORS
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
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
