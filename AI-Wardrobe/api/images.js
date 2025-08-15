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
    const page = Number(req.query.page) || 1;
    const pageSize = 10;

    // 生成随机图片数据
    const getImages = (page, pageSize = 10) => {
      return Array.from({ length: pageSize }, (_, i) => ({
        id: `${page}-${i}`,
        height: Math.floor(Math.random() * (600 - 300 + 1)) + 300, // 300-600之间的随机高度
        url: `https://picsum.photos/300/400?random=${page * 10 + i}&t=${Date.now()}`,
      }));
    };

    const images = getImages(page, pageSize);

    return res.status(200).json({
      code: 0,
      message: '获取成功',
      data: images
    });

  } catch (error) {
    console.error('Get images error:', error);
    return res.status(500).json({
      code: 1,
      message: '服务器内部错误',
      data: []
    });
  }
}