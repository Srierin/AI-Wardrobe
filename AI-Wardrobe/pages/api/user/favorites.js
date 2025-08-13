// pages/api/user/favorites.js
import { verifyToken } from '../../../utils/jwt';
import { MOCK_FAVORITES } from '../../../mock/data';

export default function handler(req, res) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];
    if (!token) {
      return res.status(200).json({ code: 1, message: '未提供Token' });
    }

    const decoded = verifyToken(token);

    if (req.method === 'GET') {
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
    }

    if (req.method === 'POST') {
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

      return res.status(200).json({
        code: 0,
        message: '收藏成功',
        data: newFavorite
      });
    }

    res.status(405).json({ code: 1, message: '方法不支持' });
  } catch (error) {
    res.status(200).json({
      code: 1,
      message: error.message || '操作失败'
    });
  }
}