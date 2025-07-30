// Vercel API 端點 - 用戶認證相關操作
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL
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
    const { method, body, query } = req

    switch (method) {
      case 'POST':
        if (query.action === 'signup') {
          // 用戶註冊
          const { email, password, userData } = body
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: userData
            }
          })

          if (error) throw error
          return res.status(201).json(data)
        } else if (query.action === 'signin') {
          // 用戶登入
          const { email, password } = body
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
          })

          if (error) throw error
          return res.status(200).json(data)
        } else if (query.action === 'signout') {
          // 用戶登出
          const { error } = await supabase.auth.signOut()
          if (error) throw error
          return res.status(200).json({ message: 'Signed out successfully' })
        }
        break

      case 'GET':
        if (query.action === 'user') {
          // 獲取當前用戶
          const authHeader = req.headers.authorization
          if (!authHeader) {
            return res.status(401).json({ error: 'No authorization header' })
          }

          const token = authHeader.replace('Bearer ', '')
          const { data: { user }, error } = await supabase.auth.getUser(token)
          
          if (error) throw error
          return res.status(200).json(user)
        }
        break

      default:
        res.setHeader('Allow', ['GET', 'POST'])
        return res.status(405).end(`Method ${method} Not Allowed`)
    }
  } catch (error) {
    console.error('Auth API Error:', error)
    return res.status(500).json({ error: error.message })
  }
}
