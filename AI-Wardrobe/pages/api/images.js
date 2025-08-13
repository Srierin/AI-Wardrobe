// pages/api/images.js
import Mock from 'mockjs';

export default function handler(req, res) {
  const page = parseInt(req.query.page) || 1;
  const pageSize = 10;

  const getImages = (page, pageSize) => {
    return Array.from({ length: pageSize }, (_, i) => ({
      id: `${page}-${i}`,
      height: Mock.Random.integer(300, 600),
      url: `https://picsum.photos/300/400?random=${page * 10 + i}&t=${Date.now()}`,
    }));
  };

  res.status(200).json({
    code: 0,
    data: getImages(page, pageSize)
  });
}