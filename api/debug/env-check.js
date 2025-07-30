// 簡單的測試端點來診斷環境變數
export default async function handler(req, res) {
  // 設置 CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-api-key')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  // 環境變數診斷
  const envCheck = {
    nodeEnv: process.env.NODE_ENV,
    hasApiSecret: !!process.env.API_SECRET_KEY,
    apiSecretLength: process.env.API_SECRET_KEY?.length || 0,
    apiSecretPreview: process.env.API_SECRET_KEY ? `${process.env.API_SECRET_KEY.substring(0, 8)}...` : 'NOT_FOUND',
    hasSupabaseUrl: !!process.env.SUPABASE_URL,
    hasSupabaseKey: !!process.env.SUPABASE_ANON_KEY,
    receivedHeaders: {
      apiKey: req.headers['x-api-key'] ? `${req.headers['x-api-key'].substring(0, 8)}...` : 'NOT_FOUND',
      userAgent: req.headers['user-agent']?.substring(0, 50) + '...'
    },
    timestamp: new Date().toISOString()
  }

  console.log('Environment Check:', envCheck)
  
  return res.status(200).json({
    message: 'Environment check endpoint',
    environment: envCheck
  })
}
