// 環境變數測試工具
export const getEnvInfo = () => {
  return {
    // 構建時注入的變數（會變成字符串字面值）
    buildTimeVars: {
      apiKey: import.meta.env.VITE_API_SECRET_KEY,
      supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
      isDev: import.meta.env.DEV,
      isProd: import.meta.env.PROD,
      mode: import.meta.env.MODE
    },
    
    // 這些會顯示實際注入的值，而不是環境變數引用
    rawValues: {
      // 在生產構建中，這些會被替換為實際字符串
      apiKeyLength: import.meta.env.VITE_API_SECRET_KEY?.length || 0,
      hasSupabaseUrl: !!import.meta.env.VITE_SUPABASE_URL,
      buildTimestamp: new Date().toISOString()
    }
  }
}

// 在開發環境下，這個會顯示完整的環境變數對象
export const getAllEnvVars = () => {
  return import.meta.env
}
