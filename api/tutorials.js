// Vercel Serverless Function for tutorials API
import { createConnection } from '@planetscale/database'

// 配置資料庫連線
const config = {
  url: process.env.DATABASE_URL
}

const conn = createConnection(config)

export default async function handler(req, res) {
  // 設置 CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  try {
    switch (req.method) {
      case 'GET':
        return await getTutorials(req, res)
      case 'POST':
        return await createTutorial(req, res)
      case 'PUT':
        return await updateTutorial(req, res)
      case 'DELETE':
        return await deleteTutorial(req, res)
      default:
        res.status(405).json({ error: 'Method not allowed' })
    }
  } catch (error) {
    console.error('Database error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

async function getTutorials(req, res) {
  const { id } = req.query
  
  if (id) {
    // 獲取單個教學
    const result = await conn.execute(
      'SELECT * FROM tutorials WHERE id = ?',
      [id]
    )
    res.json(result.rows[0] || null)
  } else {
    // 獲取所有教學
    const result = await conn.execute('SELECT * FROM tutorials ORDER BY created_at DESC')
    res.json(result.rows)
  }
}

async function createTutorial(req, res) {
  const { title, description, content, category, level, duration } = req.body
  
  const result = await conn.execute(
    `INSERT INTO tutorials (title, description, content, category, level, duration, created_at) 
     VALUES (?, ?, ?, ?, ?, ?, NOW())`,
    [title, description, content, category, level, duration]
  )
  
  res.status(201).json({ id: result.insertId, message: 'Tutorial created successfully' })
}

async function updateTutorial(req, res) {
  const { id } = req.query
  const { title, description, content, category, level, duration } = req.body
  
  await conn.execute(
    `UPDATE tutorials 
     SET title = ?, description = ?, content = ?, category = ?, level = ?, duration = ?, updated_at = NOW()
     WHERE id = ?`,
    [title, description, content, category, level, duration, id]
  )
  
  res.json({ message: 'Tutorial updated successfully' })
}

async function deleteTutorial(req, res) {
  const { id } = req.query
  
  await conn.execute('DELETE FROM tutorials WHERE id = ?', [id])
  res.json({ message: 'Tutorial deleted successfully' })
}
