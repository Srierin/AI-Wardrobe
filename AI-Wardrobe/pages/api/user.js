// pages/api/user.js
import { verifyToken } from '../../utils/jwt';
import { MOCK_USERS } from '../../mock/data';

export default function handler(req, res) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(200).json({ code: 1, message: '未提供认证token' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    const user = Object.values(MOCK_USERS).find(u => u.id === decoded.user.id);
    if (!user) {
      return res.status(200).json({ code: 1, message: '用户不存在' });
    }

    const { password: _, ...userInfo } = user;

    res.status(200).json({
      code: 0,
      message: '获取成功',
      data: userInfo,
    });
  } catch (error) {
    res.status(200).json({
      code: 1,
      message: error.message || 'Token验证失败',
    });
  }
}