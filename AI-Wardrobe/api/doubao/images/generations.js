export default async function handler(req, res) {
  // 设置CORS头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // 处理预检请求
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 只允许POST请求
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      message: 'Only POST requests are allowed' 
    });
  }

  try {
    const { model, prompt } = req.body;
    
    // 验证必需参数
    if (!prompt) {
      return res.status(400).json({ 
        error: 'Bad request',
        message: 'Prompt is required' 
      });
    }
    
    // 从环境变量获取API密钥
    const apiKey = process.env.VITE_DOUBAO_API_KEY;
    
    if (!apiKey) {
      console.error('VITE_DOUBAO_API_KEY environment variable not set');
      return res.status(500).json({ 
        error: 'Server configuration error',
        message: 'API key not configured' 
      });
    }

    console.log('Calling Doubao API with prompt:', prompt);

    // 调用豆包API
    const response = await fetch('https://ark.cn-beijing.volces.com/api/v3/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model || 'doubao-seedream-3-0-t2i-250415',
        prompt: prompt
      })
    });

    console.log('Doubao API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Doubao API error:', errorText);
      throw new Error(`API request failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Doubao API response data:', data);
    
    // 返回结果
    res.status(200).json(data);
    
  } catch (error) {
    console.error('Error calling Doubao API:', error);
    res.status(500).json({ 
      error: 'Failed to generate image',
      message: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}