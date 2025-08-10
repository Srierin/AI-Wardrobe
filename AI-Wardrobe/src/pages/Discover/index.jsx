import { useState, useEffect } from 'react';
import styles from './discover.module.css';
import { Search } from 'react-vant';
import { Search as SearchIcon } from '@react-vant/icons';
import Waterfall from '@/components/Waterfall';
import { useImageStore } from '@/store/useImageStore';
import { useRef } from 'react';

// 随机时尚数据生成器
const fashionTitles = [
  "春日清新穿搭指南", "职场精英必备套装", "夏日清凉搭配方案",
  "约会浪漫穿搭心机", "复古潮流搭配灵感", "街头时尚穿搭秘籍",
  "极简主义日常穿搭", "商务旅行舒适搭配", "派对闪耀穿搭指南",
  "运动休闲时尚组合", "学院风青春穿搭", "度假风舒适搭配"
];

const fashionDescriptions = [
  "简约而不简单的日常穿搭，展现你的独特品味",
  "利用基础单品打造高级感穿搭，轻松提升气质",
  "色彩搭配的艺术，让你的日常穿搭焕然一新",
  "小众设计师品牌推荐，穿出与众不同的风格",
  "轻奢与平价单品的完美组合，打造高性价比穿搭",
  "不同场合的穿搭技巧，轻松应对各种社交场景",
  "经典与潮流的碰撞，展现你的时尚态度",
  "巧妙利用配饰，为整体造型增添亮点",
  "一衣多穿的实用技巧，最大化衣橱利用率",
  "根据身材特点选择单品，扬长避短穿出好身材"
];

const fashionTags = [
  "简约", "商务", "休闲", "约会", "街拍", "复古",
  "运动", "度假", "学院", "派对", "通勤", "轻奢",
  "甜美", "酷帅", "优雅", "性感", "中性", "民族风"
];

const fashionAuthors = [
  "时尚博主小美", "穿搭达人Lisa", "潮流教主Mike",
  "搭配专家Anna", "时尚编辑Tom", "造型师Sarah",
  "设计师David", "时尚买手Emma", "潮流观察员John"
];

const avatarColors = [
  "#FF69B4", "#4682B4", "#32CD32", "#FF6347", 
  "#9370DB", "#20B2AA", "#FFA500", "#1E90FF"
];

const Discover = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const contentRef = useRef(null);
  
  // 使用图片存储
  const { images, loading, hasMore, fetchMore } = useImageStore();
  
  // 分类标签
  const categories = ['推荐', '热门', '春装', '夏装', '职场', '休闲', '约会', '街拍'];

  // 处理标签切换
  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  // 初始化加载数据
  useEffect(() => {
    if (images.length === 0) {
      fetchMore();
    }
  }, [fetchMore, images.length]);

  // 生成随机卡片数据 - 为所有卡片生成完整数据
  const generateCardData = (image) => {
    const titleIndex = Math.floor(Math.random() * fashionTitles.length);
    const descIndex = Math.floor(Math.random() * fashionDescriptions.length);
    const authorIndex = Math.floor(Math.random() * fashionAuthors.length);
    const avatarIndex = Math.floor(Math.random() * avatarColors.length);
    
    // 生成3-5个随机标签
    const tags = [];
    const tagCount = 3 + Math.floor(Math.random() * 3);
    for (let i = 0; i < tagCount; i++) {
      const tagIndex = Math.floor(Math.random() * fashionTags.length);
      if (!tags.includes(fashionTags[tagIndex])) {
        tags.push(fashionTags[tagIndex]);
      }
    }
    
    return {
      ...image,
      title: fashionTitles[titleIndex],
      content: fashionDescriptions[descIndex],
      author: fashionAuthors[authorIndex],
      avatar: `https://via.placeholder.com/40x40/${avatarColors[avatarIndex].replace('#', '')}/white?text=${fashionAuthors[authorIndex].charAt(0)}`,
      likes: 100 + Math.floor(Math.random() * 400),
      comments: 10 + Math.floor(Math.random() * 90),
      views: 1000 + Math.floor(Math.random() * 2000),
      tags
    };
  };

  // 生成卡片数据
  const cardData = images.map((image) => generateCardData(image));

  return (
    <div className={styles.container} ref={contentRef}>
      {/* 顶部搜索和标题 */}
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <h1 className={styles.title}>发现</h1>
        </div>
        {/* <div className={styles.searchContainer}>
          <Search
            value={searchValue}
            onChange={setSearchValue}
            placeholder="搜索穿搭灵感、时尚资讯..."
            shape="round"
            leftIcon={<SearchIcon className={styles.searchIcon} />}
            className={styles.searchInput}
          />
        </div> */}
      </div> 
      
      {/* 分类标签 */}
      <div className={styles.categoryTabs}>
        <div className={styles.tabsContainer}>
          {categories.map((category, index) => (
            <button
              key={index}
              className={`${styles.categoryTab} ${activeTab === index ? styles.active : ''}`}
              onClick={() => handleTabChange(index)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* 内容列表 - 使用瀑布流组件 */}
      <Waterfall 
        items={cardData} 
        loading={loading} 
        hasMore={hasMore} 
        fetchMore={fetchMore}
        renderItem={(item) => (
          <div className={styles.contentCard} key={item.id}>
            <div className={styles.contentImage} style={{ height: `${item.height}px` }}>
              <div className={styles.authorInfo}>{item.author}</div>
              <img 
                src={item.url} 
                alt={item.title} 
                className={styles.image}
                style={{ 
                  height: '100%', 
                  width: '100%', 
                  objectFit: 'cover',
                  opacity: 0,
                  transition: 'opacity 0.5s ease'
                }}
                onLoad={(e) => {
                  e.target.style.opacity = 1;
                }}
              />
            </div>
            
            <div className={styles.contentInfo}>
              <h3 className={styles.contentTitle}>{item.title}</h3>
              <p className={styles.contentDesc}>{item.content}</p>
              
              <div className={styles.contentTags}>
                {item.tags.map((tag, i) => (
                  <span key={i} className={styles.contentTag}>{tag}</span>
                ))}
              </div>
              
              <div className={styles.actionBar}>
                <div className={styles.actionLeft}>
                  <div className={styles.actionItem}>
                    <span>❤️ {item.likes}</span>
                  </div>
                  <div className={styles.actionItem}>
                    <span>💬 {item.comments}</span>
                  </div>
                  <div className={styles.actionItem}>
                    <span>👁️ {item.views}</span>
                  </div>
                </div>
                <button className={styles.followButton}>
                  关注
                </button>
              </div>
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default Discover;