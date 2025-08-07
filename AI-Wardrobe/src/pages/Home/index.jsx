import { useState } from 'react';
import styles from './home.module.css';

import {
  Search,
  NoticeBar
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
    <div className={styles.container}>
      {/* 顶部搜索栏 */}
      <div className={styles.header}>
        <div className={styles.searchContainer}>
          <div className={styles.searchWrapper}>
            <Search
              value={searchValue}
              onChange={setSearchValue}
              placeholder="搜索穿搭灵感、单品..."
              shape="round"
              leftIcon={<SearchIcon />}
              className={styles.searchInput}
            />
          </div>
          <Bell className={styles.notificationIcon} />
        </div>
      </div>

      {/* 通知栏 */}
      <div className={styles.weatherNotice}>
        <NoticeBar
          leftIcon={<FireO className={styles.weatherIcon} />}
          text="今日天气晴朗，推荐清爽夏日搭配！AI为你精选了3套穿搭方案"
          color="#1976d2"
          background="#e3f2fd"
        />
      </div>

      {/* 今日穿搭推荐轮播 */}
      <div className={styles.todaySection}>
        <div className={styles.sectionTitle}>
          <h3>今日穿搭推荐</h3>
          <button className={styles.moreButton}>更多推荐</button>
        </div>
        <div className={styles.outfitGrid}>
          {todayOutfits.map((outfit) => (
            <div key={outfit.id} className={styles.outfitCard}>
              <div className={styles.outfitImage}>{outfit.title}</div>
              <div className={styles.outfitInfo}>
                <h4 className={styles.outfitTitle}>{outfit.title}</h4>
                <p className={styles.outfitTemp}>{outfit.weather}</p>
                <div className={styles.outfitTags}>
                  {outfit.items.slice(0, 2).map((item, index) => (
                    <span key={index} className={styles.outfitTag}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 快捷功能网格 */}
      <div className={styles.functionsSection}>
        <div>
          <div className={styles.functionsContent}>
            <h3 className={styles.sectionTitle}>智能功能</h3>
            <div className={styles.functionsGrid}>
              {gridData.map((item, index) => (
                <div key={index}>
                  <div className={styles.functionItem}>
                    <div className={`${styles.functionIcon} ${styles[item.color.replace('bg-', '').split('-')[0]]}`}>
                      {item.icon}
                    </div>
                    <span className={styles.functionText}>{item.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 搭配灵感 */}
      <div className={styles.inspirationSection}>
        <div className={styles.sectionTitle}>
          <h3>搭配灵感</h3>
          <button className={styles.moreButton}>查看更多</button>
        </div>

        <div className={styles.inspirationList}>
          {inspirationData.map((item) => (
            <div key={item.id} className={styles.inspirationCard}>
              <div className="flex">
                <div className="flex-1 p-4">
                  <div className="flex items-center mb-2">
                    <span className={styles.inspirationBadge}>
                      {item.tag}
                    </span>
                  </div>
                  <h4 className={styles.inspirationTitle}>{item.title}</h4>
                  <p className={styles.inspirationDesc}>{item.subtitle}</p>
                  <div className="flex items-center space-x-1">
                    <LikeO className={styles.statIcon} />
                    <span className={styles.statItem}>{item.likes}</span>
                  </div>
                </div>
                <div className="w-24 h-24 m-4">
                  <div className={styles.outfitImage}>{item.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 底部间距 */}
      <div className="h-4"></div>
    </div>
  );
};

export default Home;
