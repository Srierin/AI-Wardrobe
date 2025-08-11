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
    { id: 1, title: '夏日清爽穿搭', tags: ['休闲', '简约'] ,image:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fci.xiaohongshu.com%2F0db7eb0a-0903-3419-95c3-c8aa41be5b85%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fci.xiaohongshu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1757480618&t=7eefda43fb5d88ac65b4f8070d2bfa59'},
    { id: 2, title: '职场通勤套装', tags: ['职场', '气质'],image:'https://q9.itc.cn/images01/20250427/1be1d92e69ec4533b027070c0c75c44f.jpeg' },
    { id: 3, title: '约会甜美连衣裙', tags: ['甜美', '约会'] ,image:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcbu01.alicdn.com%2Fimg%2Fibank%2FO1CN01ipfjgk1hpooxJUIl1_%21%212211636834327-0-cib.jpg&refer=http%3A%2F%2Fcbu01.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1757480979&t=581785adfa002840dce411da3bae4293'},
    { id: 4, title: '运动健身装备', tags: ['运动', '舒适'] ,image:'https://img0.baidu.com/it/u=512672810,2426572922&fm=253&app=138&f=JPEG?w=800&h=1320'},
    { id: 5, title: '复古港风搭配', tags: ['复古', '港风'] ,image:'https://img2.baidu.com/it/u=115330807,2824891834&fm=253&app=138&f=JPEG?w=800&h=1200'},
    { id: 6, title: '度假海滩风', tags: ['度假', '沙滩'] ,image:'https://img01-gms.17zwd.com/imgextra/61600777/i2/c73b613b-30ef-4e37-a04c-5d55991fe531.jpeg'},
  ];

  // 处理搜索提交
  const handleSearch = () => {
    if (searchValue.trim()) {
      addSearchHistory(searchValue.trim());
      navigate(`/text?q=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  // 点击历史记录或热门推荐进行搜索
  const handleClickSearch = (keyword) => {
    setSearchValue(keyword);
    addSearchHistory(keyword);
    navigate(`/text?q=${encodeURIComponent(keyword)}`);
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
                <div className={styles.popularImagePlaceholder}>
                  <img src={outfit.image}/>
                </div>
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