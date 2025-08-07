import jwt from 'jsonwebtoken';

// JWT密钥 - 生产环境中应该使用环境变量
const JWT_SECRET = '$#@!AI_WARDROBE_SECRET_2025';

// 模拟用户数据
const MOCK_USERS = {
  admin: {
    id: '001',
    username: 'admin',
    password: '123456',
    nickname: '时尚管理员',
    avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
    email: 'admin@ai-wardrobe.com',
    phone: '13800138000',
    role: 'admin',
    vipLevel: 'premium',
    joinDate: '2024-01-01',
    bio: '专业的时尚搭配师，致力于为每个人打造独特的穿搭风格',
    preferences: {
      style: ['简约', '商务', '休闲'],
      colors: ['黑色', '白色', '灰色', '蓝色'],
      brands: ['ZARA', 'H&M', 'UNIQLO']
    },
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
    password: '123456',
    nickname: '时尚达人',
    avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
    email: 'user@ai-wardrobe.com',
    phone: '13900139000',
    role: 'user',
    vipLevel: 'basic',
    joinDate: '2024-02-15',
    bio: '热爱时尚，喜欢尝试不同的穿搭风格',
    preferences: {
      style: ['甜美', '休闲', '韩系'],
      colors: ['粉色', '白色', '米色'],
      brands: ['ZARA', '优衣库', 'COS']
    },
    stats: {
      outfitsCreated: 45,
      favoritesCount: 23,
      followersCount: 156,
      followingCount: 89
    }
  }
};

// 模拟收藏数据
const MOCK_FAVORITES = [
  {
    id: 'fav_001',
    userId: '001',
    type: 'outfit',
    itemId: 'outfit_001',
    title: '春季清新搭配',
    image: 'https://picsum.photos/300/400?random=1',
    description: '白色衬衫配牛仔裤，简约而不失时尚',
    tags: ['简约', '休闲', '春季'],
    createdAt: '2024-03-01T10:00:00Z'
  },
  {
    id: 'fav_002',
    userId: '001',
    type: 'item',
    itemId: 'item_001',
    title: '经典白衬衫',
    image: 'https://picsum.photos/300/400?random=2',
    description: '百搭经典款白衬衫，职场必备',
    tags: ['经典', '百搭', '职场'],
    createdAt: '2024-03-02T14:30:00Z'
  },
  {
    id: 'fav_003',
    userId: '001',
    type: 'outfit',
    itemId: 'outfit_002',
    title: '商务正装搭配',
    image: 'https://picsum.photos/300/400?random=3',
    description: '黑色西装配白衬衫，专业商务形象',
    tags: ['商务', '正装', '专业'],
    createdAt: '2024-03-03T09:15:00Z'
  },
  {
    id: 'fav_004',
    userId: '002',
    type: 'outfit',
    itemId: 'outfit_003',
    title: '甜美约会装',
    image: 'https://picsum.photos/300/400?random=4',
    description: '粉色连衣裙配小白鞋，甜美可爱',
    tags: ['甜美', '约会', '连衣裙'],
    createdAt: '2024-03-04T16:20:00Z'
  }
];

// 生成JWT Token
const generateToken = (user) => {
  return jwt.sign(
    {
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    },
    JWT_SECRET,
    { expiresIn: '10000h' } // 24小时过期
  );
};

// 验证JWT Token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Token无效或已过期');
  }
};

// Mock API响应
export default [
  // 登录接口
  {
    url: '/api/login',
    method: 'post',
    timeout: 1000,
    response: (req, res) => {
      const { username, password } = req.body;
  
      // 正确查找用户 - 在 MOCK_USERS 中查找匹配的用户
      const user = Object.values(MOCK_USERS).find(u => u.username === username);
  
      // 用户不存在
      if (!user) {
        return {
          code: 1,
          message: '用户不存在',
          data: null
        };
      }
  
      // 密码错误
      if (user.password !== password) {
        return {
          code: 1,
          message: '密码错误',
          data: null
        };
      }
  
      // 生成token
      const token = generateToken(user);
  
      // 返回用户信息（不包含密码）
      const { password: _, ...userInfo } = user;
  
      return {
        code: 0,
        message: '登录成功',
        data: userInfo,
        token
      };
    }
  },

  // 获取用户信息接口
  {
    url: '/api/user',
    method: 'get',
    response: (req, res) => {
      try {
        // 从请求头获取token
        const authHeader = req.headers.authorization;
        if (!authHeader) {
          return {
            code: 1,
            message: '未提供认证token'
          };
        }

        const token = authHeader.split(' ')[1];
        const decoded = verifyToken(token);

        // 根据token中的用户信息查找完整用户数据
        const user = Object.values(MOCK_USERS).find(u => u.id === decoded.user.id);

        if (!user) {
          return {
            code: 1,
            message: '用户不存在'
          };
        }

        // 返回用户信息（不包含密码）
        const { password: _, ...userInfo } = user;

        return {
          code: 0,
          message: '获取成功',
          password: user.password,
          data: userInfo
        };
      } catch (error) {
        return {
          code: 1,
          message: error.message || 'Token验证失败'
        };
      }
    }
  },

  // 获取用户收藏接口
  {
    url: '/api/user/favorites',
    method: 'get',
    response: (req, res) => {
      try {
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(' ')[1];
        const decoded = verifyToken(token);

        // 获取当前用户的收藏
        const userFavorites = MOCK_FAVORITES.filter(fav => fav.userId === decoded.user.id);

        return {
          code: 0,
          message: '获取成功',
          data: {
            list: userFavorites,
            total: userFavorites.length,
            page: 1,
            pageSize: 20
          }
        };
      } catch (error) {
        return {
          code: 1,
          message: error.message || '获取收藏失败'
        };
      }
    }
  },

  // 添加收藏接口
  {
    url: '/api/user/favorites',
    method: 'post',
    response: (req, res) => {
      try {
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(' ')[1];
        const decoded = verifyToken(token);

        const { type, itemId, title, image, description, tags } = req.body;

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

        return {
          code: 0,
          message: '收藏成功',
          data: newFavorite
        };
      } catch (error) {
        return {
          code: 1,
          message: error.message || '收藏失败'
        };
      }
    }
  },

  // 取消收藏接口
  {
    url: '/api/user/favorites/:id',
    method: 'delete',
    response: (req, res) => {
      try {
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(' ')[1];
        const decoded = verifyToken(token);

        const favoriteId = req.params.id;
        const favoriteIndex = MOCK_FAVORITES.findIndex(
          fav => fav.id === favoriteId && fav.userId === decoded.user.id
        );

        if (favoriteIndex === -1) {
          return {
            code: 1,
            message: '收藏不存在'
          };
        }

        MOCK_FAVORITES.splice(favoriteIndex, 1);

        return {
          code: 0,
          message: '取消收藏成功'
        };
      } catch (error) {
        return {
          code: 1,
          message: error.message || '取消收藏失败'
        };
      }
    }
  },

  // 获取用户统计数据接口
  {
    url: '/api/user/stats',
    method: 'get',
    response: (req, res) => {
      try {
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(' ')[1];
        const decoded = verifyToken(token);

        const user = Object.values(MOCK_USERS).find(u => u.id === decoded.user.id);

        return {
          code: 0,
          message: '获取成功',
          data: user?.stats || {
            outfitsCreated: 0,
            favoritesCount: 0,
            followersCount: 0,
            followingCount: 0
          }
        };
      } catch (error) {
        return {
          code: 1,
          message: error.message || '获取统计数据失败'
        };
      }
    }
  },

  // 退出登录接口
  {
    url: '/api/logout',
    method: 'post',
    response: (req, res) => {
      return {
        code: 0,
        message: '退出成功'
      };
    }
  }
];