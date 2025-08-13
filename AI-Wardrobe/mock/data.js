import jwt from 'jsonwebtoken';
import Mock from 'mockjs';

const JWT_SECRET = '$#@!AI_WARDROBE_SECRET_2025';

// 预置用户数据（硬编码在内存中）
let MOCK_USERS = {
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
    { expiresIn: '24h' } // 24小时过期
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

// 初始化收藏数据
let MOCK_FAVORITES = [];

export default [
  // 登录接口
  {
    url: '/petsPlanet/login',
    method: 'post',
    timeout: 1000,
    response: ({ body }) => {
      
      const { username, password } = body;
      const user = MOCK_USERS[username];
      
      if (!user) {
        return {
          code: 1,
          message: '用户不存在',
          data: null
        };
      }
      
      if (user.password !== password) {
        return {
          code: 1,
          message: '密码错误',
          data: null
        };
      }
      
      const token = generateToken(user);
      const { password: _, ...userInfo } = user;
      
      return {
        code: 0,
        message: '登录成功',
        data: userInfo,
        token
      };
    }
  },

  // 注册接口 (保留但不使用)
  {
    url: '/petsPlanet/register',
    method: 'post',
    timeout: 1000,
    response: ({ body }) => {
      return {
        code: 1,
        message: '当前系统仅支持预置账号登录',
        data: null
      };
    }
  },

  // 获取用户信息接口
  {
    url: '/petsPlanet/user',
    method: 'get',
    response: ({ headers }) => {
      try {
        const authHeader = headers.authorization;
        if (!authHeader) {
          return {
            code: 1,
            message: '未提供认证token'
          };
        }

        const token = authHeader.split(' ')[1];
        const decoded = verifyToken(token);

        const user = Object.values(MOCK_USERS).find(u => u.id === decoded.user.id);

        if (!user) {
          return {
            code: 1,
            message: '用户不存在'
          };
        }

        const { password: _, ...userInfo } = user;

        return {
          code: 0,
          message: '获取成功',
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
    url: '/petsPlanet/user/favorites',
    method: 'get',
    response: ({ headers }) => {
      try {
        const authHeader = headers.authorization;
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
    url: '/petsPlanet/user/favorites',
    method: 'post',
    response: ({ headers, body }) => {
      try {
        const authHeader = headers.authorization;
        const token = authHeader?.split(' ')[1];
        const decoded = verifyToken(token);

        const { type, itemId, title, image, description, tags } = body;

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
    url: '/petsPlanet/user/favorites/:id',
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
    url: '/petsPlanet/user/stats',
    method: 'get',
    response: (req, res) => {
      try {
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(' ')[1];
        const decoded = verifyToken(token);

        const user = Object.values(NEW_USERS).find(u => u.id === decoded.user.id);

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
    url: '/petsPlanet/logout',
    method: 'post',
    response: (req, res) => {
      return {
        code: 0,
        message: '退出成功'
      };
    }
  },

  {
    url: '/petsPlanet/images',
    method: 'get',
    timeout: 1000,
    response: ({ query }) => {
      const page = Number(query.page) || 1;
      
      // 生成随机图片数据
      const getImages = (page, pageSize = 10) => {
        return Array.from({ length: pageSize }, (_, i) => ({
          id: `${page}-${i}`,
          height: Mock.Random.integer(300, 600),
          url: `https://picsum.photos/300/400?random=${page * 10 + i}&t=${Date.now()}`,
        }));
      }
      
      return {
        code: 0,
        data: getImages(page)
      };
    }
  },
];