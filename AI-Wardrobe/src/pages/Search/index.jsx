// src/pages/search/SearchPage.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Delete, FireO, ArrowLeft } from '@react-vant/icons';
import useSearchStore from '@/store/useSearchStore';
import styles from './search.module.css';

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const { history, addSearchHistory, removeSearchHistory, clearSearchHistory } = useSearchStore();

  // 热门穿搭推荐数据
  const popularOutfits = [
    { id: 1, title: '夏日清爽穿搭', tags: ['休闲', '简约'] },
    { id: 2, title: '职场通勤套装', tags: ['职场', '气质'] },
    { id: 3, title: '约会甜美连衣裙', tags: ['甜美', '约会'] },
    { id: 4, title: '运动健身装备', tags: ['运动', '舒适'] },
    { id: 5, title: '复古港风搭配', tags: ['复古', '港风'] },
    { id: 6, title: '度假海滩风', tags: ['度假', '沙滩'] },
  ];

  // 处理搜索提交
  const handleSearch = () => {
    if (searchValue.trim()) {
      addSearchHistory(searchValue.trim());
      // navigate(`/search-results?q=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  // 点击历史记录或热门推荐进行搜索
  const handleClickSearch = (keyword) => {
    setSearchValue(keyword);
    addSearchHistory(keyword);
    navigate(`/search-results?q=${encodeURIComponent(keyword)}`);
  };

  return (
    <div className={styles.searchContainer}>
      {/* 顶部搜索栏 */}
      <div className={styles.searchHeader}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          <ArrowLeft fontSize={20} />
        </button>
        <div className={styles.searchInputContainer}>
          <Search className={styles.searchIcon} />
          <input
            type="text"
            placeholder="搜索穿搭灵感、单品..."
            className={styles.searchInput}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        <button className={styles.searchButton} onClick={handleSearch}>
          搜索
        </button>
      </div>

      {/* 主要内容 */}
      <div className={styles.searchContent}>
        {/* 历史搜索 */}
        {history.length > 0 && (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>历史搜索</h3>
              <button
                className={styles.clearButton}
                onClick={clearSearchHistory}
              >
                清除
              </button>
            </div>
            <div className={styles.historyList}>
              {history.map((item, index) => (
                <div key={index} className={styles.historyItem}>
                  <span
                    className={styles.historyText}
                    onClick={() => handleClickSearch(item)}
                  >
                    {item}
                  </span>
                  <button
                    className={styles.deleteButton}
                    onClick={() => removeSearchHistory(item)}
                  >
                    <Delete fontSize={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 热门推荐 */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>
              <FireO className={styles.fireIcon} />
              热门穿搭推荐
            </h3>
          </div>
          <div className={styles.popularGrid}>
            {popularOutfits.map((outfit) => (
              <div
                key={outfit.id}
                className={styles.popularCard}
                onClick={() => handleClickSearch(outfit.title)}
              >
                <div className={styles.popularImagePlaceholder}></div>
                <h4 className={styles.popularTitle}>{outfit.title}</h4>
                <div className={styles.popularTags}>
                  {outfit.tags.map((tag, index) => (
                    <span key={index} className={styles.popularTag}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;