import { useState, useEffect } from 'react';
import { Tabbar } from 'react-vant';
import { 
  HomeO, 
  Search, 
  ChatO, 
  UserO,
  BagO,
} from '@react-vant/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import styles from './mainlayout.module.css';


// 底部导航配置 - 移除收藏导航
const tabs = [
  { icon: <HomeO />, title: '首页', path: '/home' },
  { icon: <BagO  />, title: '衣柜', path: '/wardrobe' },
  { icon: <Search />, title: '发现', path: '/discover' },
  { icon: <ChatO />, title: '消息', path: '/messages' },
  { icon: <UserO />, title: '我的', path: '/profile' }
];

const MainLayout = () => {
  const [active, setActive] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const index = tabs.findIndex(tab => location.pathname.startsWith(tab.path));
    if (index !== -1) {
      setActive(index);
    }
  }, [location.pathname]);

  const handleTabChange = (key) => {
    setActive(key);
    navigate(tabs[key].path);
  };

  return (
    <div className={styles.layout}>
      {/* 主内容区域 */}
      <div className={styles.content}>
        <Outlet />
      </div>
      
      {/* 底部导航栏 */}
      <div className={styles.tabbarContainer}>
        <Tabbar 
          value={active} 
          onChange={handleTabChange}
          activeColor="#1976d2"
          inactiveColor="#666"
        >
          {tabs.map((tab, index) => (
            <Tabbar.Item
              key={index}
              icon={tab.icon}
            >
              {tab.title}
            </Tabbar.Item>
          ))}
        </Tabbar>
      </div>
    </div>
  );
};

export default MainLayout;
