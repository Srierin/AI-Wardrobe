import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || '$#@!AI_WARDROBE_SECRET_2025';

// 模拟收藏数据存储（在实际项目中应该使用数据库）
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

    switch (req.method) {
      case 'GET':
        // 获取用户收藏列表
        const userFavorites = MOCK_FAVORITES.filter(fav => fav.userId === decoded.user.id);
        
        return res.status(200).json({
          code: 0,
          message: '获取成功',
          data: {
            list: userFavorites,
            total: userFavorites.length,
            page: 1,
            pageSize: 20
          }
        });

      case 'POST':
        // 添加收藏
        const { type, itemId, title, image, description, tags } = req.body;

        if (!type || !itemId || !title) {
          return res.status(400).json({
            code: 1,
            message: '缺少必要参数'
          });
        }

        const newFavorite = {
          id: `fav_${Date.now()}`,
          userId: decoded.user.id,
          type,
          itemId,
          title,
          image,
          description,
          tags: tags || [],
          createdAt: new Date().toISOString()
        };

        MOCK_FAVORITES.push(newFavorite);

        return res.status(200).json({
          code: 0,
          message: '收藏成功',
          data: newFavorite
        });

      default:
        return res.status(405).json({
          code: 1,
          message: '方法不允许'
        });
    }

  } catch (error) {
    console.error('Favorites error:', error);
    
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