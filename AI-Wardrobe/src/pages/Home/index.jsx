import { useState } from 'react';
import { 
  Search, 
  NoticeBar, 
  Grid, 
  Card, 
  Image,
  Button,
  Space,
  Tag,
  Swiper
} from 'react-vant';
import { 
  Search as SearchIcon, 
  Bell, 
  FireO,
  UserO,
  PhotoO,
  LikeO,
  ClockO,
  ShopO
} from '@react-vant/icons';

const Home = () => {
  const [searchValue, setSearchValue] = useState('');

  // 快捷功能网格数据
  const gridData = [
    { icon: <PhotoO className="text-pink-500" />, text: 'AI搭配', color: 'bg-pink-50' },
    { icon: <ClockO className="text-blue-500" />, text: '天气穿搭', color: 'bg-blue-50' },
    { icon: <UserO className="text-purple-500" />, text: '风格测试', color: 'bg-purple-50' },
    { icon: <ShopO className="text-green-500" />, text: '购物清单', color: 'bg-green-50' },
  ];

  // 今日穿搭推荐
  const todayOutfits = [
    {
      id: 1,
      title: '清新夏日搭配',
      weather: '晴天 28°C',
      style: '清新甜美',
      image: 'https://via.placeholder.com/300x400/FFB6C1/white?text=夏日搭配',
      items: ['白色T恤', '牛仔短裙', '小白鞋']
    },
    {
      id: 2,
      title: '职场优雅Look',
      weather: '多云 25°C',
      style: '商务正装',
      image: 'https://via.placeholder.com/300x400/4682B4/white?text=职场装',
      items: ['白衬衫', '西装裤', '高跟鞋']
    },
    {
      id: 3,
      title: '约会甜美风',
      weather: '晴天 26°C',
      style: '浪漫约会',
      image: 'https://via.placeholder.com/300x400/DDA0DD/white?text=约会装',
      items: ['碎花裙', '针织开衫', '平底鞋']
    }
  ];

  // 热门搭配灵感
  const inspirationData = [
    {
      id: 1,
      title: '春日樱花粉搭配指南',
      subtitle: '温柔粉色系穿搭技巧',
      image: 'https://via.placeholder.com/300x200/FFB6C1/white?text=樱花粉',
      tag: '春装',
      likes: 1234
    },
    {
      id: 2,
      title: '职场女性穿搭秘籍',
      subtitle: '专业又时尚的办公室穿搭',
      image: 'https://via.placeholder.com/300x200/4682B4/white?text=职场装',
      tag: '职场',
      likes: 856
    },
    {
      id: 3,
      title: '周末休闲穿搭灵感',
      subtitle: '舒适自在的休闲风格',
      image: 'https://via.placeholder.com/300x200/98FB98/white?text=休闲装',
      tag: '休闲',
      likes: 642
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部搜索栏 */}
      <div className="bg-white px-4 py-3 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="flex-1">
            <Search
              value={searchValue}
              onChange={setSearchValue}
              placeholder="搜索穿搭灵感、单品..."
              shape="round"
              leftIcon={<SearchIcon />}
              className="bg-gray-100"
            />
          </div>
          <Bell className="text-gray-600 text-xl" />
        </div>
      </div>

      {/* 通知栏 */}
      <div className="px-4 py-2">
        <NoticeBar
          leftIcon={<FireO />}
          text="今日天气晴朗，推荐清爽夏日搭配！AI为你精选了3套穿搭方案"
          color="#1976d2"
          background="#e3f2fd"
        />
      </div>

      {/* 今日穿搭推荐轮播 */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-800">今日穿搭推荐</h3>
          <Button type="primary" size="small" plain>
            更多推荐
          </Button>
        </div>
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {todayOutfits.map((outfit) => (
            <Card key={outfit.id} className="rounded-xl shadow-sm overflow-hidden flex-shrink-0 w-48">
              <div className="relative">
                <Image
                  src={outfit.image}
                  className="w-full h-32 object-cover"
                  fit="cover"
                />
                <div className="absolute top-2 left-2">
                  <Tag type="primary" size="small">{outfit.style}</Tag>
                </div>
              </div>
              <div className="p-3">
                <h4 className="font-medium text-gray-800 text-sm mb-1">{outfit.title}</h4>
                <p className="text-xs text-gray-500 mb-2">{outfit.weather}</p>
                <div className="flex flex-wrap gap-1">
                  {outfit.items.slice(0, 2).map((item, index) => (
                    <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 快捷功能网格 */}
      <div className="px-4 py-3">
        <Card className="rounded-xl shadow-sm">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">智能功能</h3>
            <Grid columns={4} gutter={16}>
              {gridData.map((item, index) => (
                <Grid.Item key={index}>
                  <div className="text-center">
                    <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mx-auto mb-2`}>
                      {item.icon}
                    </div>
                    <span className="text-sm text-gray-600">{item.text}</span>
                  </div>
                </Grid.Item>
              ))}
            </Grid>
          </div>
        </Card>
      </div>

      {/* 搭配灵感 */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">搭配灵感</h3>
          <Button type="primary" size="small" plain>
            查看更多
          </Button>
        </div>
        
        <Space direction="vertical" size={12} className="w-full">
          {inspirationData.map((item) => (
            <Card key={item.id} className="rounded-xl shadow-sm overflow-hidden">
              <div className="flex">
                <div className="flex-1 p-4">
                  <div className="flex items-center mb-2">
                    <span className="bg-pink-500 text-white text-xs px-2 py-1 rounded-full">
                      {item.tag}
                    </span>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">{item.subtitle}</p>
                  <div className="flex items-center space-x-1">
                    <LikeO className="text-red-500 text-sm" />
                    <span className="text-sm text-gray-600">{item.likes}</span>
                  </div>
                </div>
                <div className="w-24 h-24 m-4">
                  <Image
                    src={item.image}
                    className="w-full h-full rounded-lg object-cover"
                    fit="cover"
                  />
                </div>
              </div>
            </Card>
          ))}
        </Space>
      </div>

      {/* 底部间距 */}
      <div className="h-4"></div>
    </div>
  );
};

export default Home;
