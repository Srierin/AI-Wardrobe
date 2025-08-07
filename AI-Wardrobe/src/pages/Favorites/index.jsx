import { useState } from 'react';
import styles from './favorites.module.css';
import {
  LikeO,
  StarO,
  ShareO,
  DeleteO,
  ShopO
} from '@react-vant/icons';

const Favorites = () => {
  const [activeTab, setActiveTab] = useState(0);

  // 收藏的穿搭数据
  const outfitData = [
    {
      id: 1,
      title: '春日清新搭配',
      style: '清新甜美',
      occasion: '日常出街',
      image: 'https://via.placeholder.com/200x300/FFB6C1/white?text=春日搭配',
      likes: 128,
      tags: ['春装', '清新', '甜美'],
      price: '¥299',
      saved: true
    },
    {
      id: 2,
      title: '职场优雅套装',
      style: '商务正装',
      occasion: '工作场合',
      image: 'https://via.placeholder.com/200x300/4682B4/white?text=职场装',
      likes: 256,
      tags: ['职场', '正装', '优雅'],
      price: '¥599',
      saved: true
    },
    {
      id: 3,
      title: '周末休闲风',
      style: '休闲舒适',
      occasion: '休闲娱乐',
      image: 'https://via.placeholder.com/200x300/98FB98/white?text=休闲装',
      likes: 89,
      tags: ['休闲', '舒适', '周末'],
      price: '¥199',
      saved: true
    }
  ];

  // 收藏的单品数据
  const itemData = [
    {
      id: 1,
      name: '针织开衫',
      brand: '优衣库',
      image: 'https://via.placeholder.com/150x150/DDA0DD/white?text=开衫',
      price: '¥199',
      originalPrice: '¥299',
      category: '上装'
    },
    {
      id: 2,
      name: '高腰牛仔裤',
      brand: 'ZARA',
      image: 'https://via.placeholder.com/150x150/87CEEB/white?text=牛仔裤',
      price: '¥299',
      originalPrice: '¥399',
      category: '下装'
    },
    {
      id: 3,
      name: '小白鞋',
      brand: 'Adidas',
      image: 'https://via.placeholder.com/150x150/F0E68C/white?text=小白鞋',
      price: '¥599',
      originalPrice: '¥799',
      category: '鞋履'
    },
    {
      id: 4,
      name: '链条包',
      brand: 'Coach',
      image: 'https://via.placeholder.com/150x150/FFA07A/white?text=链条包',
      price: '¥1299',
      originalPrice: '¥1599',
      category: '配饰'
    }
  ];

  const renderOutfitCard = (outfit) => (
    <div key={outfit.id} className={`${styles.outfitCard} mb-4`}>
      <div className="relative">
        <img
          src={outfit.image}
          className={styles.outfitImage}
          alt={outfit.title}
        />
        <div className="absolute top-3 right-3">
          <StarO className="text-yellow-500 bg-white bg-opacity-80 rounded-full p-1" />
        </div>
        <div className="absolute bottom-3 left-3">
          <span className={styles.styleTag}>{outfit.style}</span>
        </div>
      </div>

      <div className={styles.outfitContent}>
        <h3 className={styles.outfitTitle}>{outfit.title}</h3>
        <p className={styles.outfitOccasion}>适合场合：{outfit.occasion}</p>

        <div className={styles.outfitTags}>
          {outfit.tags.map((tag, index) => (
            <span key={index} className={styles.tag}>#{tag}</span>
          ))}
        </div>

        <div className={styles.outfitFooter}>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <LikeO className="text-gray-500 text-sm" />
              <span className="text-sm text-gray-600">{outfit.likes}</span>
            </div>
            <span className={styles.price}>{outfit.price}</span>
          </div>
          <div className="flex space-x-2">
            <button className={styles.shareButton}>
              <ShareO className="text-gray-500" />
            </button>
            <button className={styles.deleteButton}>
              <DeleteO className="text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderItemCard = (item) => (
    <div key={item.id} className={styles.itemCard}>
      <div className="relative">
        <img
          src={item.image}
          className={styles.itemImage}
          alt={item.name}
        />
        <div className="absolute top-2 left-2">
          <span className={styles.categoryTag}>{item.category}</span>
        </div>
      </div>

      <div className={styles.itemContent}>
        <h4 className={styles.itemName}>{item.name}</h4>
        <p className={styles.itemBrand}>{item.brand}</p>
        <div className={styles.itemFooter}>
          <div>
            <span className={styles.itemPrice}>{item.price}</span>
            <span className={styles.originalPrice}>{item.originalPrice}</span>
          </div>
          <button className={styles.shopButton}>
            <ShopO className="text-gray-500 text-sm" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      {/* 顶部标题栏 */}
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <h1 className={styles.title}>我的收藏</h1>
          <button className={styles.editButton}>
            管理
          </button>
        </div>
      </div>

      {/* 标签页 */}
      <div className={styles.tabsContainer}>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 0 ? styles.active : ''}`}
            onClick={() => setActiveTab(0)}
          >
            搭配方案
          </button>
          <button
            className={`${styles.tab} ${activeTab === 1 ? styles.active : ''}`}
            onClick={() => setActiveTab(1)}
          >
            单品收藏
          </button>
        </div>
      </div>

      {/* 内容区域 */}
      <div className={styles.content}>
        {activeTab === 0 ? (
          // 搭配方案
          <div>
            {outfitData.length > 0 ? (
              <div className={styles.outfitList}>
                {outfitData.map(renderOutfitCard)}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>
                  <StarO className="text-gray-300" size={48} />
                </div>
                <p className={styles.emptyText}>还没有收藏的搭配方案</p>
              </div>
            )}
          </div>
        ) : (
          // 单品收藏
          <div>
            {itemData.length > 0 ? (
              <div className={styles.itemGrid}>
                {itemData.map((item) => (
                  <div key={item.id} className={styles.itemGridItem}>
                    {renderItemCard(item)}
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>
                  <StarO className="text-gray-300" size={48} />
                </div>
                <p className={styles.emptyText}>还没有收藏的单品</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 底部操作 */}
      <div className={styles.actionButtonsContainer}>
        <div className={styles.actionButtons}>
          <button className={styles.primaryButton}>
            发现更多搭配
          </button>
          <button className={styles.secondaryButton}>
            分享我的收藏
          </button>
        </div>
      </div>
    </div>
  );
};

export default Favorites;