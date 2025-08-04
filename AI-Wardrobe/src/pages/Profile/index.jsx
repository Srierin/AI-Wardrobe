import {
  useState,
  useEffect
} from 'react';
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
  FriendsO
} from '@react-vant/icons';
import styles from './profile.module.css';
import {
  generateImage
} from '@/llm';

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    name: '时尚达人',
    avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
    slogan: '生活中，你就是你的生活。',
  });

  const [showActionSheet, setShowActionSheet] = useState(false);
  useEffect(() => {
    const savedAvatar = localStorage.getItem('userAvatar');
    if (savedAvatar) {
      setUserInfo(prev => ({ ...prev, avatar: savedAvatar }));
    }
  }, []);
  const handleAction = async (e) => {
    console.log(e)
    if (e.type === 1) {
      // AI 生成头像
      const text = `
      昵称:${userInfo.name}
      签名:${userInfo.slogan}
      帮我生成一个头像，要求是：根据以上内容生成一个头像，头像要和内容相关，要求动漫风格
    `;
      const result = await generateImage(text);
      if (result.code === 0) {
        setUserInfo(prev => ({ ...prev, avatar: result.data.imageUrl }));
        alert('头像生成成功！');
        localStorage.setItem('userAvatar', result.data.imageUrl);
      } else {
        console.error('生成头像失败:', result.msg);
        alert('生成头像失败: ' + result.msg);
      }
    } else if (e.type === 2) {
      // 图片上传
    }
  }

  const actions = [
    {
      name: 'AI生成头像',
      color: '#123123',
      type: 1
    },
    {
      name: '上传头像',
      color: '#ee0a24',
      type: 2
    }
  ]

  // 我的数据统计
  const gridData = [
    { icon: <FriendsO />, text: '关注' },
    { icon: <LikeO />, text: '点赞' },
    { icon: <StarO />, text: '收藏' },
    { icon: <AddO />, text: '添加' }
  ];

  const settingItems = [
    {
      title: '个人资料',
      icon: <Edit className="text-gray-600" />,
      onClick: () => console.log('个人资料')
    },
    {
      title: '穿搭偏好',
      icon: <StarO className="text-gray-600" />,
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
              <span className={styles.levelText}>时尚等级 Lv.8</span>
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
      >

      </ActionSheet>
      {/* 设置菜单 */}
      <div className={styles.settingsSection}>
        {settingItems.map((item, index) => (
          <div key={index} className={styles.settingItem} onClick={item.onClick}>
            <div className={styles.settingIcon}>{item.icon}</div>
            <div className={styles.settingContent}>
              <div className={styles.settingTitle}>{item.title}</div>
              <div className={styles.settingDesc}>点击查看详情</div>
            </div>
            <div className={styles.settingArrow}>
              <Arrow size={16} />
            </div>
          </div>
        ))}
      </div>

      {/* 数据统计 */}
      <div className={styles.gridContainer}>
        {
          gridData.map((item, index) => (
            <div key={index} className={styles.gridItem}>
              <div className={styles.icon}>{item.icon}</div>
              <div className={styles.text}>{item.text}</div>
            </div>
          ))
        }
      </div>

      {/* 退出登录 */}
      <div className={styles.logoutSection}>
        <button className={styles.logoutButton} onClick={() => console.log('退出登录')}>
          退出登录
        </button>
      </div>

      {/* 底部间距 */}
      <div className="h-4"></div>
    </div>
  );
};

export default Profile;
