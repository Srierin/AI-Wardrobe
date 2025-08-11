import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  UserO, 
  FireO, 
  LikeO, 
  ChatO, 
  EyeO,
  ShopO,
  WarningO,
  SendGiftO,
  GiftO
} from '@react-vant/icons';
import styles from './home.module.css';

const Home = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  const handleFeatureClick = (feature) => {
    if (feature === 'ai') {
      navigate('/coze');
    }
  };

  const outfitRecommendations = [
    {
      id: 1,
      title: '清新夏日搭配',
      weather: '晴天',
      temperature: '28°C',
      tags: ['夏装', '清爽'],
      image:'https://img0.baidu.com/it/u=3204066330,4111729466&fm=253&app=138&f=JPEG?w=800&h=1087'
    },
    {
      id: 2,
      title: '职场优雅Look',
      weather: '多云',
      temperature: '25°C',
      tags: ['职场', '正装'],
      image:'https://img1.baidu.com/it/u=3006448823,3536025086&fm=253&fmt=auto&app=138&f=JPEG?w=749&h=500'
    },
    {
      id: 3,
      title: '约会甜美风',
      weather: '晴天',
      temperature: '26°C',
      tags: ['约会', '浪漫'],
      image:'https://img1.baidu.com/it/u=1160831614,4220810021&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=670'
    }
  ];

  const inspirationData = [
    {
      id: 1,
      category: '春装',
      title: '春日樱花粉搭配指南',
      content: '温柔粉色系穿搭技巧',
      likes: 1234,
      comments: 56,
      views: 2100
    },
    {
      id: 2,
      category: '职场',
      title: '职场女性穿搭秘籍',
      content: '专业又时尚的办公室穿搭',
      likes: 856,
      comments: 32,
      views: 3200
    },
    {
      id: 3,
      category: '休闲',
      title: '周末休闲穿搭灵感',
      content: '舒适又时尚的休闲风格',
      likes: 642,
      comments: 28,
      views: 1600
    }
  ];

  return (
    <div className={styles.homeContainer}>
      {/* 顶部搜索栏 */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.searchContainer} onClick={() => navigate('/search')}>
            <Search className={styles.searchIcon} />
            <input
              type="text"
              placeholder="搜索穿搭灵感、单品..."
              className={styles.searchInput}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          <button className={styles.userButton}>
            <UserO />
          </button>
        </div>
      </div>

      {/* 主要内容 */}
      <div className={styles.content}>
        {/* 天气通知 */}
        <div className={styles.weatherBanner}>
          <FireO className={styles.weatherIcon} />
          <span className={styles.weatherText}>
            今日天气晴朗，推荐清爽夏日搭配！AI为你精选了3套穿搭方案
          </span>
        </div>

        {/* 今日穿搭推荐 */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>今日穿搭推荐</h2>
            <button className={styles.moreButton} onClick={() => navigate('/text')}>更多推荐</button>
          </div>
          <div className={styles.outfitGrid} >
            {outfitRecommendations.map((outfit) => (
              <div key={outfit.id} className={styles.outfitCard}>
                <div className={styles.outfitImage}>
                  {/* {outfit.title} */}
                  <img src={outfit.image} alt={outfit.title} />
                </div>
                <div className={styles.outfitInfo}>
                  <h3 className={styles.outfitTitle}>{outfit.title}</h3>
                  <div className={styles.outfitMeta}>
                    <div className={styles.outfitTags}>
                      {outfit.tags.map((tag, index) => (
                        <span key={index} className={styles.outfitTag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span>{outfit.weather} {outfit.temperature}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 智能功能 */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>智能功能</h2>
          </div>
          <div className={styles.featuresGrid}>
            <div 
              className={styles.featureCard}
              onClick={() => handleFeatureClick('ai')}
            >
              <div className={`${styles.featureIcon} ${styles.ai}`}>
                <SendGiftO />
              </div>
              <h3 className={styles.featureTitle}>AI搭配</h3>
              <p className={styles.featureDesc}>智能推荐个性化穿搭</p>
            </div>
            <div className={styles.featureCard} onClick={() => navigate('/text')}>
              <div className={`${styles.featureIcon} ${styles.weather}`}>
                <WarningO />
              </div>
              <h3 className={styles.featureTitle}>天气穿搭</h3>
              <p className={styles.featureDesc}>根据天气推荐合适搭配</p>
            </div>
            <div className={styles.featureCard} onClick={() => navigate('/text')}>
              <div className={`${styles.featureIcon} ${styles.style}`}>
                <UserO />
              </div>
              <h3 className={styles.featureTitle}>风格测试</h3>
              <p className={styles.featureDesc}>发现你的专属风格</p>
            </div>
            <div className={styles.featureCard} onClick={() => navigate('/text')}>
              <div className={`${styles.featureIcon} ${styles.shopping}`}>
                <ShopO />
              </div>
              <h3 className={styles.featureTitle}>购物清单</h3>
              <p className={styles.featureDesc}>智能生成购物建议</p>
            </div>
          </div>
        </div>

        {/* 搭配灵感 */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>搭配灵感</h2>
            <button className={styles.moreButton} onClick={() => navigate('/text')}>查看更多</button>
          </div>
          <div className={styles.inspirationList}>
            {inspirationData.map((item) => (
              <div key={item.id} className={styles.inspirationCard}>
                <div className={styles.inspirationHeader}>
                  <span className={styles.inspirationCategory}>
                    {item.category}
                  </span>
                  <div className={styles.inspirationImage}>
                    {item.category}
                  </div>
                </div>
                <h3 className={styles.inspirationTitle}>{item.title}</h3>
                <p className={styles.inspirationDesc}>{item.content}</p>
                <div className={styles.inspirationStats}>
                  <div className={styles.inspirationStat}>
                    <LikeO />
                    <span>{item.likes}</span>
                  </div>
                  <div className={styles.inspirationStat}>
                    <ChatO />
                    <span>{item.comments}</span>
                  </div>
                  <div className={styles.inspirationStat}>
                    <EyeO />
                    <span>{item.views}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
