import { useEffect, useRef, useState } from 'react';
import styles from './waterfall.module.css';

const Waterfall = ({ items, loading, hasMore, fetchMore, renderItem }) => {
  const loaderRef = useRef(null);
  const [columns, setColumns] = useState([[], []]);
  
  // 监听加载更多
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loading && hasMore) {
          fetchMore();
        }
      },
      { threshold: 0.1 }
    );
    
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    
    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loading, hasMore, fetchMore]);

  // 瀑布流布局
  useEffect(() => {
    if (items.length === 0) return;
    
    const newColumns = [[], []];
    const columnHeights = [0, 0];
    
    items.forEach((item) => {
      // 计算卡片高度（图片高度 + 固定内容高度）
      const imageHeight = item.height || 300;
      const contentHeight = item.title ? 220 : 0; // 内容部分固定高度
      const totalHeight = imageHeight + contentHeight;
      
      // 选择高度较小的列
      const columnIndex = columnHeights[0] <= columnHeights[1] ? 0 : 1;
      
      newColumns[columnIndex].push(item);
      columnHeights[columnIndex] += totalHeight;
    });
    
    setColumns(newColumns);
  }, [items]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.column}>
        {columns[0].map((item) => (
          <div key={item.id} className={styles.cardWrapper}>
            {renderItem(item)}
          </div>
        ))}
      </div>
      <div className={styles.column}>
        {columns[1].map((item) => (
          <div key={item.id} className={styles.cardWrapper}>
            {renderItem(item)}
          </div>
        ))}
      </div>
      
      {/* 加载指示器 */}
      <div ref={loaderRef} className={styles.loader}>
        {loading && <div>加载中...</div>}
        {!hasMore && <div>没有更多内容了</div>}
      </div>
    </div>
  );
};

export default Waterfall;