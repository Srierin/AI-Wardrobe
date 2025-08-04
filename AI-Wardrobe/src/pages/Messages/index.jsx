import { useState } from 'react';
import { 
  Cell, 
  Badge, 
  Image, 
  Search,
  Tabs,
  Button,
  Space,
  Card
} from 'react-vant';
import { 
  Search as SearchIcon,
  ChatO,
  Bell,
  SettingO,
  AddO
} from '@react-vant/icons';

const Messages = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchValue, setSearchValue] = useState('');

  // 聊天列表数据
  const chatList = [
    {
      id: 1,
      name: '张小明',
      avatar: 'https://via.placeholder.com/50x50/FF6B6B/white?text=张',
      lastMessage: '今天天气真不错，要不要一起出去走走？',
      time: '10:30',
      unread: 2,
      online: true
    },
    {
      id: 2,
      name: '李小红',
      avatar: 'https://via.placeholder.com/50x50/4ECDC4/white?text=李',
      lastMessage: '好的，我知道了，谢谢你的提醒',
      time: '09:15',
      unread: 0,
      online: false
    },
    {
      id: 3,
      name: '工作群',
      avatar: 'https://via.placeholder.com/50x50/45B7D1/white?text=群',
      lastMessage: '王经理: 明天的会议改到下午3点',
      time: '昨天',
      unread: 5,
      online: false,
      isGroup: true
    },
    {
      id: 4,
      name: '客服小助手',
      avatar: 'https://via.placeholder.com/50x50/96CEB4/white?text=客',
      lastMessage: '您好，有什么可以帮助您的吗？',
      time: '昨天',
      unread: 1,
      online: true,
      isOfficial: true
    }
  ];

  // 通知列表数据
  const notificationList = [
    {
      id: 1,
      title: '系统通知',
      content: '您的账户安全等级已提升',
      time: '2小时前',
      type: 'system',
      read: false
    },
    {
      id: 2,
      title: '活动提醒',
      content: '限时优惠活动即将结束，抓紧时间参与',
      time: '5小时前',
      type: 'activity',
      read: false
    },
    {
      id: 3,
      title: '好友动态',
      content: '张小明发布了新的动态',
      time: '1天前',
      type: 'social',
      read: true
    }
  ];

  const renderChatItem = (item) => (
    <Cell
      key={item.id}
      className="py-3"
      clickable
      onClick={() => console.log('打开聊天', item.id)}
    >
      <div className="flex items-center space-x-3">
        <div className="relative">
          <Image
            src={item.avatar}
            className="w-12 h-12 rounded-full"
            fit="cover"
          />
          {item.online && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center space-x-2">
              <h4 className="font-medium text-gray-800 truncate">{item.name}</h4>
              {item.isGroup && (
                <span className="text-xs bg-blue-100 text-blue-600 px-1 rounded">群</span>
              )}
              {item.isOfficial && (
                <span className="text-xs bg-green-100 text-green-600 px-1 rounded">官方</span>
              )}
            </div>
            <span className="text-xs text-gray-500">{item.time}</span>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600 truncate flex-1">{item.lastMessage}</p>
            {item.unread > 0 && (
              <Badge content={item.unread} className="ml-2" />
            )}
          </div>
        </div>
      </div>
    </Cell>
  );

  const renderNotificationItem = (item) => (
    <Card key={item.id} className="mb-3 rounded-lg shadow-sm">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h4 className="font-medium text-gray-800">{item.title}</h4>
              {!item.read && (
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              )}
            </div>
            <p className="text-sm text-gray-600 mb-2">{item.content}</p>
            <span className="text-xs text-gray-500">{item.time}</span>
          </div>
          <div className="ml-3">
            {item.type === 'system' && <SettingO className="text-blue-500" />}
            {item.type === 'activity' && <Bell className="text-orange-500" />}
            {item.type === 'social' && <ChatO className="text-green-500" />}
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部标题栏 */}
      <div className="bg-white px-4 py-3 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-bold text-gray-800">消息</h1>
          <AddO className="text-gray-600 text-xl" />
        </div>
        <Search
          value={searchValue}
          onChange={setSearchValue}
          placeholder="搜索聊天记录..."
          shape="round"
          leftIcon={<SearchIcon />}
          className="bg-gray-100"
        />
      </div>

      {/* 标签页 */}
      <div className="bg-white border-b border-gray-100">
        <Tabs 
          active={activeTab} 
          onChange={setActiveTab}
          className="message-tabs"
        >
          <Tabs.TabPane title="聊天" />
          <Tabs.TabPane title="通知" />
        </Tabs>
      </div>

      {/* 内容区域 */}
      <div className="flex-1">
        {activeTab === 0 ? (
          // 聊天列表
          <div className="bg-white">
            {chatList.map(renderChatItem)}
          </div>
        ) : (
          // 通知列表
          <div className="p-4">
            {notificationList.map(renderNotificationItem)}
          </div>
        )}
      </div>

      {/* 快捷操作 */}
      {activeTab === 0 && (
        <div className="px-4 py-4">
          <Space size={12} className="w-full">
            <Button type="primary" block icon={<AddO />}>
              发起聊天
            </Button>
            <Button plain block>
              创建群聊
            </Button>
          </Space>
        </div>
      )}

      {/* 底部间距 */}
      <div className="h-4"></div>
    </div>
  );
};

export default Messages;