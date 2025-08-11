import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Cell,
  Image,
  Button,
  Space,
  Card,
  Grid,
  Tag,
  Progress,
  ActionSheet,
} from 'react-vant';
import {
  UserO,
  SettingO,
  AddO,
  StarO,
  LikeO,
  ShareO,
  QuestionO,
  ServiceO,
  Arrow,
  Edit,
  Award,
  FriendsO,
} from '@react-vant/icons';
import { useUserStore } from '@/store/user';
import { getUserStats } from '@/api/user';
import styles from './profile.module.css';
import { generateImage } from '@/llm';
import CustomToast from '@/components/CustomToast'; // 导入自定义Toast
import CustomDialog from '@/components/CustomDialog'; // 导入自定义Dialog

const Profile = () => {
  const navigate = useNavigate();
  
  const { user, logout, updateAvatar } = useUserStore(); // 添加 updateAvatar 方法
  const [userInfo, setUserInfo] = useState({
    name: user?.nickname || '时尚达人',
    avatar: user?.avatar || 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
    slogan: user?.bio || '生活中，你就是你的生活。',
  });
  const [userStats, setUserStats] = useState({
    outfitsCreated: 0,
    favoritesCount: 0,
    followersCount: 0,
    followingCount: 0
  });

  const [showActionSheet, setShowActionSheet] = useState(false);
  const [showDialog, setShowDialog] = useState(false); // 控制自定义Dialog显示
  const [showToast, setShowToast] = useState(false); // 控制自定义Toast显示
  const [toastMessage, setToastMessage] = useState(''); // Toast消息内容

  useEffect(() => {
    const savedAvatar = localStorage.getItem('userAvatar');
    if (savedAvatar) {
      setUserInfo(prev => ({ ...prev, avatar: savedAvatar }));
    }
    if (user) {
      updateAvatar(savedAvatar);
    }
  }, []);

  // 获取用户统计数据
  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const response = await getUserStats();
        if (response.data.code === 0) {
          setUserStats(response.data.data);
        }
      } catch (error) {
        console.error('获取用户统计失败:', error);
      }
    };

    if (user) {
      fetchUserStats();
      setUserInfo({
        name: user.nickname || '时尚达人',
        avatar: user.avatar || 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
        slogan: user.bio || '生活中，你就是你的生活。',
      });
    }
  }, [user]);

  const handleAction = async (e) => {
    if (e.type === 1) {
      // AI 生成头像
      const text = `昵称:${userInfo.name}\n签名:${userInfo.slogan}`;
      const result = await generateImage(text);
      if (result.code === 0) {
        setUserInfo(prev => ({ ...prev, avatar: result.data.imageUrl }));
        localStorage.setItem('userAvatar', result.data.imageUrl);
        updateAvatar(result.data.imageUrl);
        setToastMessage('头像生成成功！');
        setShowToast(true);
      } else {
        setToastMessage('生成头像失败: ' + result.msg);
        setShowToast(true);
      }
    } else if (e.type === 2) {
      // 图片上传
    }
  }

  const actions = [
    { name: 'AI生成头像', color: '#123123', type: 1 },
    { name: '上传头像', color: '#ee0a24', type: 2 }
  ]

  // 我的数据统计
  const gridData = [
    { icon: <FriendsO />, text: '关注', count: userStats.followingCount || 0 },
    { icon: <LikeO />, text: '点赞', count: userStats.outfitsCreated || 0 },
    {
      icon: <StarO />,
      text: '收藏',
      count: userStats.favoritesCount || 0,
      onClick: () => navigate('/favorites')
    },
    { icon: <AddO />, text: '发布', count: userStats.outfitsCreated || 0 }
  ];

  // 退出登录确认
  const confirmLogout = () => {
    logout();
    setToastMessage('已退出登录');
    setShowToast(true);
    navigate('/login', { replace: true });
  };

  // 退出登录处理
  const handleLogout = () => {
    setShowDialog(true); // 显示自定义Dialog
  };

  const settingItems = [
    {
      title: '个人资料',
      icon: <Edit className="text-gray-600" />,
      onClick: () => console.log('个人资料')
    },
    {
      title: '我的收藏',
      icon: <StarO className="text-gray-600" />,
      onClick: () => navigate('/favorites'),
      badge: userStats.favoritesCount > 0 ? userStats.favoritesCount : null
    },
    {
      title: '穿搭偏好',
      icon: <SettingO className="text-gray-600" />,
      onClick: () => console.log('穿搭偏好')
    },
    {
      title: '隐私设置',
      icon: <SettingO className="text-gray-600" />,
      onClick: () => console.log('隐私设置')
    },
    {
      title: '帮助与反馈',
      icon: <QuestionO className="text-gray-600" />,
      onClick: () => console.log('帮助与反馈')
    },
    {
      title: '联系客服',
      icon: <ServiceO className="text-gray-600" />,
      onClick: () => console.log('联系客服')
    }
  ];

  return (
    <div className={styles.container}>
      {/* 用户信息卡片 */}
      <div className={styles.userCard}>
        <div className={styles.userInfo}>
          <div className={styles.avatarContainer}>
            <Image
              width={60}
              height={60}
              src={userInfo.avatar}
              className={styles.avatar}
              fit="cover"
              onClick={() => setShowActionSheet(true)}
            />
            <div className={styles.vipBadge}>
              <Award size={12} />
            </div>
          </div>

          <div className={styles.userDetails}>
            <h2 className={styles.userName}>{userInfo.name}</h2>
            <p className={styles.userSlogan}>{userInfo.slogan}</p>
            <div className={styles.levelProgress}>
              <span className={styles.levelText}>
                时尚等级 Lv.{user?.vipLevel === 'premium' ? '8' : '3'}
              </span>
              <div className={styles.progressBar}>
                <div className={styles.progressFill}></div>
              </div>
            </div>
          </div>

          <div className={styles.editButton}>
            <Edit size={16} />
          </div>
        </div>
      </div>

      <ActionSheet
        visible={showActionSheet}
        actions={actions}
        cancelText="取消"
        onCancel={() => setShowActionSheet(false)}
        onSelect={(e) => handleAction(e)}
      />

      {/* 数据统计 */}
      <div className={styles.gridContainer}>
        {gridData.map((item, index) => (
          <div
            key={index}
            className={`${styles.gridItem} ${item.onClick ? styles.clickable : ''}`}
            onClick={item.onClick}
          >
            <div className={styles.icon}>{item.icon}</div>
            <div className={styles.count}>{item.count}</div>
            <div className={styles.text}>{item.text}</div>
          </div>
        ))}
      </div>

      {/* 设置菜单 */}
      <div className={styles.settingsSection}>
        {settingItems.map((item, index) => (
          <div key={index} className={styles.settingItem} onClick={item.onClick}>
            <div className={styles.settingIcon}>{item.icon}</div>
            <div className={styles.settingContent}>
              <div className={styles.settingTitle}>
                {item.title}
                {item.badge && (
                  <span className={styles.settingBadge}>{item.badge}</span>
                )}
              </div>
              <div className={styles.settingDesc}>点击查看详情</div>
            </div>
            <div className={styles.settingArrow}>
              <Arrow size={16} />
            </div>
          </div>
        ))}
      </div>

      {/* 退出登录 */}
      <div className={styles.logoutSection}>
        <button className={styles.logoutButton} onClick={handleLogout}>
          {/* <Edit size={16} style={{ marginRight: '8px' }} /> */}
          退出登录
        </button>
      </div>

      {/* 自定义对话框 */}
      <CustomDialog
        visible={showDialog}
        title="确认退出"
        message="确定要退出登录吗？"
        confirmText="确定"
        cancelText="取消"
        onConfirm={confirmLogout}
        onCancel={() => setShowDialog(false)}
      />

      {/* 自定义提示 */}
      {showToast && (
        <CustomToast
          message={toastMessage}
          onClose={() => setShowToast(false)}
        />
      )}

      {/* 底部间距 */}
      <div className="h-4"></div>
    </div>
  );
};

export default Profile;