import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { HomeO, Search, MoreO, UserO, BagO } from '@react-vant/icons';
import styles from './MainLayout.module.css';

const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/home', icon: HomeO, label: '首页' },
    { path: '/discover', icon: Search, label: '发现' },
    { path: '/wardrobe', icon: BagO, label: '衣柜' },
    { path: '/messages', icon: MoreO, label: '消息' },
    { path: '/profile', icon: UserO, label: '我的' },
  ];

  return (
    <div className={styles.mainLayout}>
      {/* 主要内容区域 */}
      <main className={styles.content}>
        <Outlet />
      </main>

      {/* 底部导航栏 */}
      <nav className={styles.bottomNav}>
        <div className={styles.navContainer}>
          <div className={styles.navItems}>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const IconComponent = item.icon;
              
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                >
                  <IconComponent className={styles.navIcon} />
                  <span className={styles.navLabel}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default MainLayout;
