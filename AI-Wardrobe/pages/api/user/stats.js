// pages/api/user/stats.js
import { verifyToken } from '../../../utils/jwt';
import { MOCK_USERS } from '../../../mock/data';

export default function handler(req, res) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];
    const decoded = verifyToken(token);

    const user = Object.values(MOCK_USERS).find(u => u.id === decoded.user.id);

    res.status(200).json({
      code: 0,
      message: '获取成功',
      data: user?.stats || {
        outfitsCreated: 0,
        favoritesCount: 0,
        followersCount: 0,
        followingCount: 0
      }
    });
  } catch (error) {
    res.status(200).json({
      code: 1,
      message: error.message || '获取失败'
    });
  }
}