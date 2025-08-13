// pages/api/logout.js
export default function handler(req, res) {
  res.status(200).json({
    code: 0,
    message: '退出成功'
  });
}