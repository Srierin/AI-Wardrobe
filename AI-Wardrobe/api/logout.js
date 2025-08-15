export default function handler(req, res) {
  // 设置CORS头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // 处理预检请求
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // 只允许POST请求
  if (req.method !== 'POST') {
    return res.status(405).json({
      code: 1,
      message: '方法不允许'
    });
  }

  try {
    // 退出登录逻辑（在无状态JWT系统中，主要是客户端清除token）
    return res.status(200).json({
      code: 0,
      message: '退出成功'
    });

  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({
      code: 1,
      message: '服务器内部错误'
    });
  }
}
