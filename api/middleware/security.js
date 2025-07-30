// API 安全中間件
export function verifyApiKey(req) {
  const apiKey = req.headers['x-api-key'] || req.query.apikey;
  const validApiKey = process.env.API_SECRET_KEY;
  
  // 調試日誌（只在開發環境）
  if (process.env.NODE_ENV !== 'production') {
    console.log('API Key Debug:', {
      receivedKey: apiKey ? `${apiKey.substring(0, 5)}...` : 'NONE',
      expectedKey: validApiKey ? `${validApiKey.substring(0, 5)}...` : 'NONE',
      hasValidKey: !!validApiKey,
      hasReceivedKey: !!apiKey
    });
  }
  
  if (!apiKey || !validApiKey) {
    return { valid: false, error: 'API key is required' };
  }
  
  if (apiKey !== validApiKey) {
    return { valid: false, error: 'Invalid API key' };
  }
  
  return { valid: true };
}

// 速率限制
const rateLimitMap = new Map();

export function rateLimit(req, maxRequests = 100, windowMs = 60000) {
  const ip = req.headers['x-forwarded-for'] || req.connection?.remoteAddress || 'unknown';
  const now = Date.now();
  const windowStart = now - windowMs;
  
  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, []);
  }
  
  const requests = rateLimitMap.get(ip);
  // 清理過期請求
  const validRequests = requests.filter(time => time > windowStart);
  
  if (validRequests.length >= maxRequests) {
    return { 
      allowed: false, 
      error: 'Rate limit exceeded',
      resetTime: Math.ceil((validRequests[0] + windowMs - now) / 1000)
    };
  }
  
  validRequests.push(now);
  rateLimitMap.set(ip, validRequests);
  
  return { allowed: true };
}

// CORS 設置
export function setCorsHeaders(res, req) {
  // 獲取請求來源
  const origin = req?.headers?.origin;
  
  // 允許的域名
  const allowedOrigins = [
    'https://demo-iota-nine-24.vercel.app',
    'http://localhost:5174',
    'http://localhost:3000',
    'http://localhost:5173'
  ];
  
  // 檢查來源是否被允許
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    // 本地開發時允許所有來源
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-api-key, Authorization, Accept, Origin');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '86400');
  
  // 添加額外的 headers 來避免 provisional headers 問題
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
}
