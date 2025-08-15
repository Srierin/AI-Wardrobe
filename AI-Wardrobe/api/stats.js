import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || '$#@!AI_WARDROBE_SECRET_2025';

// 预置用户数据（与其他文件保持一致）
const MOCK_USERS = {
  admin: {
    id: '001',
    username: 'admin',
    stats: {
      outfitsCreated: 156,
      favoritesCount: 89,
      followersCount: 1280,
      followingCount: 234
    }
  },
  user: {
    id: '002',
    username: 'user',
    stats: {
      outfitsCreated: 45,
      favoritesCount: 23,
      followersCount: 156,
      followingCount: 89
    }
  }
};

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

  // 只允许GET请求
  if (req.method !== 'GET') {
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
    const user = Object.values(MOCK_USERS).find(u => u.id === decoded.user.id);

    const stats = user?.stats || {
      outfitsCreated: 0,
      favoritesCount: 0,
      followersCount: 0,
      followingCount: 0
    };

    return res.status(200).json({
      code: 0,
      message: '获取成功',
      data: stats
    });

  } catch (error) {
    console.error('Get stats error:', error);
    
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