import { useState } from 'react';
import {
  Tabs,
  Card,
  Image,
  Tag,
  Button,
  Space,
  Grid,
  Search
} from 'react-vant';
import {
  Search as SearchIcon,
  LikeO,
  ChatO,
  ShareO,
  EyeO
} from '@react-vant/icons';

const Discover = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchValue, setSearchValue] = useState('');

  // 分类标签
  const categories = ['推荐', '热门', '春装', '夏装', '职场', '休闲', '约会', '街拍'];

  // 穿搭内容数据
  const contentData = [
    {
      id: 1,
      title: '夏日清爽穿搭指南',
      content: '炎炎夏日，如何穿出清爽感？选择透气面料，搭配清淡色彩，让你在夏天也能保持优雅...',
      author: '时尚博主小美',
      avatar: 'https://via.placeholder.com/40x40/FF69B4/white?text=美',
      image: 'https://via.placeholder.com/300x200/87CEEB/white?text=夏日穿搭',
      likes: 328,
      comments: 52,
      views: 2100,
      tags: ['夏装', '清爽', '搭配技巧']
    },
    {
      id: 2,
      title: '职场女性的穿搭秘籍',
      content: '在职场中，穿搭不仅是个人形象的体现，更是专业能力的展示。如何在保持专业的同时展现个人魅力...',
      author: '职场达人Lisa',
      avatar: 'https://via.placeholder.com/40x40/4682B4/white?text=L',
      image: 'https://via.placeholder.com/300x200/4682B4/white?text=职场穿搭',
      likes: 456,
      comments: 78,
      views: 3200,
      tags: ['职场', '正装', '专业']
    },
    {
      id: 3,
      title: '约会穿搭的浪漫心机',
      content: '约会时的穿搭既要展现女性魅力，又不能过于刻意。掌握这些小心机，让你在约会中更加迷人...',
      author: '恋爱专家小甜',
      avatar: 'https://via.placeholder.com/40x40/FFB6C1/white?text=甜',
      image: 'https://via.placeholder.com/300x200/FFB6C1/white?text=约会穿搭',
      likes: 289,
      comments: 65,
      views: 1800,
      tags: ['约会', '浪漫', '甜美']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部搜索和标题 */}
      <div className="bg-white px-4 py-3 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-bold text-gray-800">发现</h1>
        </div>
        <Search
          value={searchValue}
          onChange={setSearchValue}
          placeholder="搜索穿搭灵感、时尚资讯..."
          shape="round"
          leftIcon={<SearchIcon />}
          className="bg-gray-100"
        />
      </div>

      {/* 分类标签 */}
      <div className="bg-white px-4 py-3 border-b border-gray-100">
        <Tabs
          active={activeTab}
          onChange={setActiveTab}
          type="card"
          className="discover-tabs"
        >
          {categories.map((category, index) => (
            <Tabs.TabPane key={index} title={category} />
          ))}
        </Tabs>
      </div>

      {/* 内容列表 */}
      <div className="px-4 py-4">
        <Space direction="vertical" size={16} className="w-full">
          {contentData.map((item) => (
            <Card key={item.id} className="rounded-xl shadow-sm overflow-hidden">
              {/* 作者信息 */}
              <div className="flex items-center p-4 pb-3">
                <Image
                  src={item.avatar}
                  className="w-10 h-10 rounded-full mr-3"
                  fit="cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">{item.author}</h4>
                  <p className="text-xs text-gray-500">2小时前</p>
                </div>
                <Button size="small" type="primary" plain>
                  关注
                </Button>
              </div>

              {/* 内容 */}
              <div className="px-4 pb-3">
                <h3 className="font-semibold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  {item.content}
                </p>

                {/* 标签 */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {item.tags.map((tag, index) => (
                    <Tag key={index} type="primary" plain size="small">
                      #{tag}
                    </Tag>
                  ))}
                </div>
              </div>

              {/* 图片 */}
              <div className="px-4 pb-3">
                <Image
                  src={item.image}
                  className="w-full h-48 rounded-lg object-cover"
                  fit="cover"
                />
              </div>

              {/* 互动按钮 */}
              <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-1">
                    <LikeO className="text-gray-500" />
                    <span className="text-sm text-gray-600">{item.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ChatO className="text-gray-500" />
                    <span className="text-sm text-gray-600">{item.comments}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <EyeO className="text-gray-500" />
                    <span className="text-sm text-gray-600">{item.views}</span>
                  </div>
                </div>
                <ShareO className="text-gray-500" />
              </div>
            </Card>
          ))}
        </Space>
      </div>

      {/* 加载更多 */}
      <div className="px-4 py-4 text-center">
        <Button type="primary" plain block>
          加载更多内容
        </Button>
      </div>

      {/* 底部间距 */}
      <div className="h-4"></div>
    </div>
  );
};

export default Discover;