// pages/api/login.js
import { generateToken } from '../../utils/jwt';
import { MOCK_USERS } from '../../mock/data'; // 路径根据你实际调整

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ code: 1, message: '方法不支持' });
  }

  const { username, password } = req.body;
  const user = MOCK_USERS[username];

  if (!user) {
    return res.status(200).json({ code: 1, message: '用户不存在' });
  }

  if (user.password !== password) {
    return res.status(200).json({ code: 1, message: '密码错误' });
  }

  const token = generateToken(user);
  const { password: _, ...userInfo } = user;

  res.status(200).json({
    code: 0,
    message: '登录成功',
    data: userInfo,
    token,
  });
}