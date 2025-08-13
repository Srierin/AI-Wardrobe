// index.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './favorites.module.css';
import {
  LikeO,
  StarO,
  ShareO,
  DeleteO,
  ShopO,
  ArrowLeft
} from '@react-vant/icons';
import useTitle from "@/hooks/useTitle";

const Favorites = () => {
  useTitle('我的收藏');
  const [activeTab, setActiveTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

  // 收藏的穿搭数据
  const outfitData = [
    {
      id: 1,
      title: "夏日清爽休闲风",
      style: "休闲 | 简约",
      tags: ["日常", "夏季", "简约"],
      likes: 128,
      image: "https://img2.baidu.com/it/u=3564313,3218161849&fm=253&app=138&f=JPEG?w=800&h=1320"
    },
    {
      id: 2,
      title: "商务通勤正装搭配",
      style: "正式 | 商务",
      tags: ["工作", "正式"],
      likes: 96,
      image: "https://img0.baidu.com/it/u=1444781991,1109362904&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500"
    },
    {
      id: 3,
      title: "约会甜美连衣裙",
      style: "甜美 | 约会",
      tags: ["约会", "甜美", "夏季"],
      likes: 215,
      image: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F8613d282-c603-4ed6-8ca7-7ac87647a4da%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1757556492&t=d02d5851fec1d5e2f197f4a6ca861ba1"
    },
    {
      id: 4,
      title: "秋冬温暖针织套装",
      style: "保暖 | 舒适",
      tags: ["秋冬", "日常", "舒适"],
      likes: 178,
      image: "https://pic.rmb.bdstatic.com/bjh/240106/events/c9c37dd71cd0a46095153dafbc5b7a348035.jpeg"
    },
    {
      id: 5,
      title: "海边度假风搭配",
      style: "度假 | 休闲",
      tags: ["度假", "休闲", "夏季"],
      likes: 189,
      image: "https://gips2.baidu.com/it/u=1632808742,1085521527&fm=3074&app=3074&f=JPEG"
    }
  ];

  // 收藏的单品数据
  const itemData = [
    {
      id: 1,
      name: "简约纯棉白衬衫",
      brand: "ZARA",
      price: "¥299",
      image: "https://images.unsplash.com/photo-1598032895397-b9472444bf93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2hpcnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 2,
      name: "高腰牛仔阔腿裤",
      brand: "UNIQLO",
      price: "¥399",
      image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amVhbnN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 3,
      name: "复古小方包",
      brand: "COACH",
      price: "¥1299",
      image: "https://images.unsplash.com/photo-1591561954555-607968c989ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFnfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 4,
      name: "皮质小白鞋",
      brand: "ADIDAS",
      price: "¥599",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 5,
      name: "简约金属腕表",
      brand: "DW",
      price: "¥899",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2F0Y2h8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 6,
      name: "羊毛混纺大衣",
      brand: "Massimo Dutti",
      price: "¥1599",
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29hdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
    }
  ];

  const toggleSelection = (id, type) => {
    const itemId = `${type}-${id}`;
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(i => i !== itemId) 
        : [...prev, itemId]
    );
  };

  const renderOutfitCard = (outfit) => (
    <div 
      key={outfit.id} 
      className={`${styles.favoriteCard} ${isEditing && selectedItems.includes(`outfit-${outfit.id}`) ? styles.selected : ''}`}
      onClick={() => isEditing ? toggleSelection(outfit.id, 'outfit') : navigate()}
    >
      <div className={styles.favoriteImage}>
        <img
          src={outfit.image}
          alt={outfit.title}
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        />
        <div className={styles.favoriteActions}>
          <button className={`${styles.actionButton} ${styles.like}`}>
            <LikeO fontSize={12} />
          </button>
          <button className={`${styles.actionButton} ${styles.share}`}>
            <ShareO fontSize={12} />
          </button>
          <button className={`${styles.actionButton} ${styles.delete}`}>
            <DeleteO fontSize={12} />
          </button>
        </div>
      </div>

      <div className={styles.favoriteInfo}>
        <h3 className={styles.favoriteTitle}>{outfit.title}</h3>
        <p className={styles.favoriteStyle}>{outfit.style}</p>
        
        <div className={styles.favoriteTags}>
          {outfit.tags.map((tag, index) => (
            <span key={index} className={`${styles.favoriteTag} ${
              tag === '日常' ? styles.daily : 
              tag === '工作' ? styles.work : 
              tag === '约会' ? styles.date : 
              styles.casual
            }`}>
              #{tag}
            </span>
          ))}
        </div>

        <div className={styles.favoriteStats}>
          <div className={styles.statItem}>
            <LikeO className={styles.statIcon} />
            <span>{outfit.likes}</span>
          </div>
          <span className={styles.favoriteDate}>2023.04.15</span>
        </div>
      </div>
    </div>
  );

  const renderItemCard = (item) => (
    <div 
      key={item.id} 
      className={`${styles.itemCard} ${isEditing && selectedItems.includes(`item-${item.id}`) ? styles.selected : ''}`}
      onClick={() => isEditing ? toggleSelection(item.id, 'item') : navigate()}
    >
      <div className={styles.itemImage}>
        <img
          src={item.image}
          alt={item.name}
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        />
      </div>

      <div className={styles.itemInfo}>
        <h4 className={styles.itemName}>{item.name}</h4>
        <p className={styles.itemBrand}>{item.brand}</p>
        <div className={styles.favoriteStats}>
          <span className={styles.itemPrice}>{item.price}</span>
          <button className={styles.shopButton}>
            <ShopO fontSize={12} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`${styles.container} ${isEditing ? styles.selectMode : ''}`}>
      {/* 顶部标题栏 */}
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <button className={styles.backButton} onClick={() => navigate('/profile')}>
            <ArrowLeft fontSize={20} />
          </button>
          <h1 className={styles.title}>我的收藏</h1>
          <button 
            className={styles.editButton}
            onClick={() => {
              setIsEditing(!isEditing);
              if (isEditing) setSelectedItems([]);
            }}
          >
            {isEditing ? '完成' : '管理'}
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
              <div className={styles.favoritesGrid}>
                {outfitData.map(renderOutfitCard)}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>
                  <StarO fontSize={60} />
                </div>
                <p className={styles.emptyText}>还没有收藏的搭配方案</p>
                <button 
                  className={styles.emptyButton}
                  onClick={() => navigate('/explore')}
                >
                  去发现
                </button>
              </div>
            )}
          </div>
        ) : (
          // 单品收藏
          <div>
            {itemData.length > 0 ? (
              <div className={styles.itemsGrid}>
                {itemData.map(renderItemCard)}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>
                  <StarO fontSize={60} />
                </div>
                <p className={styles.emptyText}>还没有收藏的单品</p>
                <button 
                  className={styles.emptyButton}
                  onClick={() => navigate('/shop')}
                >
                  去逛逛
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 批量操作栏 */}
      {isEditing && selectedItems.length > 0 && (
        <div className={`${styles.batchActions} ${styles.show}`}>
          <div className={styles.selectedCount}>
            已选择 {selectedItems.length} 项
          </div>
          <div className={styles.batchButtons}>
            <button className={`${styles.batchButton} ${styles.share}`}>
              分享
            </button>
            <button className={`${styles.batchButton} ${styles.delete}`}>
              删除
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Favorites;