import { useState } from 'react';
import styles from './discover.module.css';
import {
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
    <div className={styles.container}>
      {/* 顶部搜索和标题 */}
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <h1 className={styles.title}>发现</h1>
        </div>
        <div className={styles.searchContainer}>
          <Search
            value={searchValue}
            onChange={setSearchValue}
            placeholder="搜索穿搭灵感、时尚资讯..."
            shape="round"
            leftIcon={<SearchIcon className={styles.searchIcon} />}
            className={styles.searchInput}
          />
        </div>
      </div>

      {/* 分类标签 */}
      <div className={styles.categoryTabs}>
        <div className={styles.tabsContainer}>
          {categories.map((category, index) => (
            <button
              key={index}
              className={`${styles.categoryTab} ${activeTab === index ? styles.active : ''}`}
              onClick={() => setActiveTab(index)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* 内容列表 */}
      <div className={styles.content}>
        <div className={styles.contentGrid}>
          {contentData.map((item) => (
            <div key={item.id} className={styles.contentCard}>
              {/* 图片 */}
              <div className={styles.contentImage}>
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                <div className={styles.authorInfo}>{item.author}</div>
              </div>

              {/* 内容信息 */}
              <div className={styles.contentInfo}>
                <h3 className={styles.contentTitle}>{item.title}</h3>
                <p className={styles.contentDesc}>{item.content}</p>

                {/* 标签 */}
                <div className={styles.contentTags}>
                  {item.tags.map((tag, index) => (
                    <span key={index} className={`${styles.contentTag} ${tag === '夏装' ? styles.summer : tag === '清爽' ? styles.fresh : tag === '休闲' ? styles.casual : tag === '职场' ? styles.office : ''}`}>
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* 互动按钮 */}
                <div className={styles.actionBar}>
                  <div className={styles.actionLeft}>
                    <div className={styles.actionItem}>
                      <LikeO className={styles.actionIcon} />
                      <span>{item.likes}</span>
                    </div>
                    <div className={styles.actionItem}>
                      <ChatO className={styles.actionIcon} />
                      <span>{item.comments}</span>
                    </div>
                    <div className={styles.actionItem}>
                      <EyeO className={styles.actionIcon} />
                      <span>{item.views}</span>
                    </div>
                  </div>
                  <button className={styles.followButton}>关注</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 加载更多 */}
      <div className={styles.loadMore}>
        <button className={styles.loadMoreButton}>
          加载更多内容
        </button>
      </div>
    </div>
  );
};

export default Discover;