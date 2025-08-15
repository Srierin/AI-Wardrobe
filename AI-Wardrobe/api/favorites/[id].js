import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || '$#@!AI_WARDROBE_SECRET_2025';

// 模拟收藏数据存储（在实际项目中应该使用数据库）
// 注意：这里应该与favorites.js共享同一个数据源
let MOCK_FAVORITES = [];

// 验证JWT Token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Token无效或已过期');
  }
};

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

  // 只允许DELETE请求
  if (req.method !== 'DELETE') {
    return res.status(405).json({
      code: 1,
      message: '方法不允许'
    });
  }

  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({
        code: 1,
        message: '未提供认证token'
      });
    }

    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        code: 1,
        message: 'Token格式错误'
      });
    }

    const decoded = verifyToken(token);
    const favoriteId = req.query.id;

    if (!favoriteId) {
      return res.status(400).json({
        code: 1,
        message: '收藏ID不能为空'
      });
    }

    const favoriteIndex = MOCK_FAVORITES.findIndex(
      fav => fav.id === favoriteId && fav.userId === decoded.user.id
    );

    if (favoriteIndex === -1) {
      return res.status(404).json({
        code: 1,
        message: '收藏不存在'
      });
    }

    MOCK_FAVORITES.splice(favoriteIndex, 1);

    return res.status(200).json({
      code: 0,
      message: '取消收藏成功'
    });

  } catch (error) {
    console.error('Remove favorite error:', error);
    
    if (error.message.includes('Token')) {
      return res.status(401).json({
        code: 1,
        message: error.message
      });
    }

    return res.status(500).json({
      code: 1,
      message: '服务器内部错误'
    });
  }
}
