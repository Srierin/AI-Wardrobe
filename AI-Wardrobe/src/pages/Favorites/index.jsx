import { useState } from 'react';
import { 
  Tabs, 
  Card, 
  Image, 
  Tag, 
  Button,
  Space,
  Grid,
  Empty
} from 'react-vant';
import { 
  LikeO,
  StarO,
  ShareO,
  DeleteO,
  ShopO
} from '@react-vant/icons';

const Favorites = () => {
  const [activeTab, setActiveTab] = useState(0);

  // 收藏的穿搭数据
  const outfitData = [
    {
      id: 1,
      title: '春日清新搭配',
      style: '清新甜美',
      occasion: '日常出街',
      image: 'https://via.placeholder.com/200x300/FFB6C1/white?text=春日搭配',
      likes: 128,
      tags: ['春装', '清新', '甜美'],
      price: '¥299',
      saved: true
    },
    {
      id: 2,
      title: '职场优雅套装',
      style: '商务正装',
      occasion: '工作场合',
      image: 'https://via.placeholder.com/200x300/4682B4/white?text=职场装',
      likes: 256,
      tags: ['职场', '正装', '优雅'],
      price: '¥599',
      saved: true
    },
    {
      id: 3,
      title: '周末休闲风',
      style: '休闲舒适',
      occasion: '休闲娱乐',
      image: 'https://via.placeholder.com/200x300/98FB98/white?text=休闲装',
      likes: 89,
      tags: ['休闲', '舒适', '周末'],
      price: '¥199',
      saved: true
    }
  ];

  // 收藏的单品数据
  const itemData = [
    {
      id: 1,
      name: '针织开衫',
      brand: '优衣库',
      image: 'https://via.placeholder.com/150x150/DDA0DD/white?text=开衫',
      price: '¥199',
      originalPrice: '¥299',
      category: '上装'
    },
    {
      id: 2,
      name: '高腰牛仔裤',
      brand: 'ZARA',
      image: 'https://via.placeholder.com/150x150/87CEEB/white?text=牛仔裤',
      price: '¥299',
      originalPrice: '¥399',
      category: '下装'
    },
    {
      id: 3,
      name: '小白鞋',
      brand: 'Adidas',
      image: 'https://via.placeholder.com/150x150/F0E68C/white?text=小白鞋',
      price: '¥599',
      originalPrice: '¥799',
      category: '鞋履'
    },
    {
      id: 4,
      name: '链条包',
      brand: 'Coach',
      image: 'https://via.placeholder.com/150x150/FFA07A/white?text=链条包',
      price: '¥1299',
      originalPrice: '¥1599',
      category: '配饰'
    }
  ];

  const renderOutfitCard = (outfit) => (
    <Card key={outfit.id} className="rounded-xl shadow-sm overflow-hidden mb-4">
      <div className="relative">
        <Image
          src={outfit.image}
          className="w-full h-64 object-cover"
          fit="cover"
        />
        <div className="absolute top-3 right-3">
          <StarO className="text-yellow-500 bg-white bg-opacity-80 rounded-full p-1" />
        </div>
        <div className="absolute bottom-3 left-3">
          <Tag type="primary" size="small">{outfit.style}</Tag>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2">{outfit.title}</h3>
        <p className="text-sm text-gray-600 mb-3">适合场合：{outfit.occasion}</p>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {outfit.tags.map((tag, index) => (
            <Tag key={index} plain size="small">#{tag}</Tag>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <LikeO className="text-gray-500 text-sm" />
              <span className="text-sm text-gray-600">{outfit.likes}</span>
            </div>
            <span className="font-semibold text-red-500">{outfit.price}</span>
          </div>
          <div className="flex space-x-2">
            <ShareO className="text-gray-500" />
            <DeleteO className="text-gray-500" />
          </div>
        </div>
      </div>
    </Card>
  );

  const renderItemCard = (item) => (
    <div key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="relative">
        <Image
          src={item.image}
          className="w-full h-32 object-cover"
          fit="cover"
        />
        <div className="absolute top-2 left-2">
          <Tag type="primary" size="small">{item.category}</Tag>
        </div>
      </div>
      
      <div className="p-3">
        <h4 className="font-medium text-gray-800 text-sm mb-1">{item.name}</h4>
        <p className="text-xs text-gray-500 mb-2">{item.brand}</p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-red-500 font-semibold text-sm">{item.price}</span>
            <span className="text-gray-400 text-xs line-through ml-1">{item.originalPrice}</span>
          </div>
          <ShopO className="text-gray-500 text-sm" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部标题栏 */}
      <div className="bg-white px-4 py-3 shadow-sm">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">我的收藏</h1>
          <Button type="primary" size="small" plain>
            管理
          </Button>
        </div>
      </div>

      {/* 标签页 */}
      <div className="bg-white border-b border-gray-100">
        <Tabs 
          active={activeTab} 
          onChange={setActiveTab}
          className="favorites-tabs"
        >
          <Tabs.TabPane title="搭配方案" />
          <Tabs.TabPane title="单品收藏" />
        </Tabs>
      </div>

      {/* 内容区域 */}
      <div className="p-4">
        {activeTab === 0 ? (
          // 搭配方案
          <div>
            {outfitData.length > 0 ? (
              <Space direction="vertical" size={0} className="w-full">
                {outfitData.map(renderOutfitCard)}
              </Space>
            ) : (
              <Empty description="还没有收藏的搭配方案" />
            )}
          </div>
        ) : (
          // 单品收藏
          <div>
            {itemData.length > 0 ? (
              <Grid columns={2} gutter={12}>
                {itemData.map((item) => (
                  <Grid.Item key={item.id}>
                    {renderItemCard(item)}
                  </Grid.Item>
                ))}
              </Grid>
            ) : (
              <Empty description="还没有收藏的单品" />
            )}
          </div>
        )}
      </div>

      {/* 底部操作 */}
      <div className="px-4 py-4">
        <Space size={12} className="w-full">
          <Button type="primary" block>
            发现更多搭配
          </Button>
          <Button plain block>
            分享我的收藏
          </Button>
        </Space>
      </div>

      {/* 底部间距 */}
      <div className="h-4"></div>
    </div>
  );
};

export default Favorites;