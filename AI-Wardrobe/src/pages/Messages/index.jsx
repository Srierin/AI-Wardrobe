import { useState, useEffect } from 'react';
import styles from './messages.module.css';
import {
  Search,
  Button,
  Space
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
  
  // 使用可靠的DiceBear头像API
  const generateAvatar = (name, seed) => 
    `https://api.dicebear.com/7.x/miniavs/svg?seed=${seed || name}`;

  // 聊天列表数据
  const chatList = [
    {
      id: 1,
      name: '张小明',
      lastMessage: '今天天气真不错，要不要一起出去走走？',
      time: '10:30',
      unread: 2,
      online: true
    },
    {
      id: 2,
      name: '李小红',
      lastMessage: '好的，我知道了，谢谢你的提醒',
      time: '09:15',
      unread: 0,
      online: false
    },
    {
      id: 3,
      name: '工作群',
      lastMessage: '王经理: 明天的会议改到下午3点',
      time: '昨天',
      unread: 5,
      online: false,
      isGroup: true
    },
    {
      id: 4,
      name: '客服小助手',
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
    <div
      key={item.id}
      className={`${styles.chatItem} ${item.unread > 0 ? styles.unread : ''}`}
      onClick={() => console.log('打开聊天', item.id)}
    >
      <div className={styles.chatContent}>
        <div className={styles.avatarContainer}>
          <img 
            src={generateAvatar(item.name, item.id)} 
            alt={item.name} 
            className={styles.avatar}
          />
          {item.online && (
            <div className={styles.onlineIndicator}></div>
          )}
        </div>

        <div className={styles.chatInfo}>
          <div className={styles.chatHeader}>
            <div className={styles.nameContainer}>
              <h4 className={styles.chatName}>{item.name}</h4>
              {item.isGroup && (
                <span className={styles.groupTag}>群</span>
              )}
              {item.isOfficial && (
                <span className={styles.officialTag}>官方</span>
              )}
            </div>
            <span className={styles.chatTime}>{item.time}</span>
          </div>
          <div className={styles.chatPreview}>
            <p className={styles.lastMessage}>{item.lastMessage}</p>
            {item.unread > 0 && (
              <span className={styles.unreadBadge}>{item.unread}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationItem = (item) => (
    <div key={item.id} className={`${styles.notificationCard} ${!item.read ? styles.unreadNotification : ''}`}>
      <div className={styles.notificationHeader}>
        <div className={`${styles.notificationIcon} ${styles[item.type]}`}>
          {item.type === 'system' && <SettingO />}
          {item.type === 'activity' && <Bell />}
          {item.type === 'social' && <ChatO />}
        </div>
        <div className={styles.notificationInfo}>
          <div className={styles.notificationTitleContainer}>
            <h4 className={styles.notificationTitle}>{item.title}</h4>
            {!item.read && <div className={styles.unreadDot}></div>}
          </div>
          <p className={styles.notificationDesc}>{item.content}</p>
          <span className={styles.notificationTime}>{item.time}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      {/* 顶部标题栏 */}
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <h1 className={styles.title}>消息</h1>
          <AddO className={styles.addIcon} />
        </div>
        <div className={styles.searchContainer}>
          <Search
            value={searchValue}
            onChange={setSearchValue}
            placeholder="搜索聊天记录..."
            shape="round"
            leftIcon={<SearchIcon className={styles.searchIcon} />}
            className={styles.searchInput}
          />
        </div>
      </div>

      {/* 标签页 */}
      <div className={styles.tabsContainer}>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 0 ? styles.active : ''}`}
            onClick={() => setActiveTab(0)}
          >
            聊天
          </button>
          <button
            className={`${styles.tab} ${activeTab === 1 ? styles.active : ''}`}
            onClick={() => setActiveTab(1)}
          >
            通知
          </button>
        </div>
      </div>

      {/* 内容区域 */}
      <div className={styles.content}>
        {activeTab === 0 ? (
          // 聊天列表
          <div className={styles.chatList}>
            {chatList.map(renderChatItem)}
          </div>
        ) : (
          // 通知列表
          <div className={styles.notificationList}>
            {notificationList.map(renderNotificationItem)}
          </div>
        )}
      </div>

      {/* 快捷操作 */}
      {activeTab === 0 && (
        <div className={styles.actionButtonsContainer}>
          <Space size={12} className="w-full">
            <Button type="primary" block icon={<AddO />} className={styles.primaryButton}>
              发起聊天
            </Button>
            <Button plain block className={styles.secondaryButton}>
              创建群聊
            </Button>
          </Space>
        </div>
      )}

      {/* 底部间距 */}
      <div className={styles.bottomSpacer}></div>
    </div>
  );
};

export default Messages;