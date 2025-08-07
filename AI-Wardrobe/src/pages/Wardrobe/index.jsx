import { useState, useRef } from 'react';
import {
  Button,
  ActionSheet,
  Uploader,
  Toast,
  Dialog,
  Popup,
  Field,
  Tag,

  Empty,
  Loading,
  SwipeCell,
  NavBar
} from 'react-vant';
import {
  AddO,
  PhotoO,
  DeleteO,
  Edit,
  FilterO,
  Search,
  Close,
  // Success,
  Aim,
  InfoO,
  StarO,
  ShareO,
  Plus,
  Cross
} from '@react-vant/icons';
import { useNavigate } from 'react-router-dom';
import styles from './wardrobe.module.css';

const Wardrobe = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // 状态管理
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [showAddSheet, setShowAddSheet] = useState(false);
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [showAddItemPopup, setShowAddItemPopup] = useState(false);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [loading, setLoading] = useState(false);

  // 新增衣物表单
  const [newItem, setNewItem] = useState({
    name: '',
    category: 'tops',
    color: '',
    brand: '',
    season: 'spring',
    tags: [],
    image: null,
    description: ''
  });

  // 衣物分类
  const categories = [
    { id: 'all', name: '全部', icon: '👗', count: 24 },
    { id: 'tops', name: '上衣', icon: '👕', count: 8 },
    { id: 'bottoms', name: '下装', icon: '👖', count: 6 },
    { id: 'outerwear', name: '外套', icon: '🧥', count: 4 },
    { id: 'dresses', name: '连衣裙', icon: '👗', count: 3 },
    { id: 'shoes', name: '鞋子', icon: '👠', count: 5 },
    { id: 'accessories', name: '配饰', icon: '👜', count: 2 }
  ];

  // 颜色选项
  const colors = [
    { id: 'black', name: '黑色', color: '#000000' },
    { id: 'white', name: '白色', color: '#FFFFFF' },
    { id: 'gray', name: '灰色', color: '#808080' },
    { id: 'red', name: '红色', color: '#FF0000' },
    { id: 'blue', name: '蓝色', color: '#0000FF' },
    { id: 'green', name: '绿色', color: '#008000' },
    { id: 'yellow', name: '黄色', color: '#FFFF00' },
    { id: 'pink', name: '粉色', color: '#FFC0CB' }
  ];

  // 品牌选项
  const brands = ['ZARA', 'H&M', 'UNIQLO', 'COS', 'Mango', '其他'];

  // 模拟衣物数据
  const [clothingItems, setClothingItems] = useState([
    {
      id: 1,
      name: '白色基础T恤',
      category: 'tops',
      color: 'white',
      brand: 'UNIQLO',
      season: 'spring',
      image: 'https://picsum.photos/300/400?random=1',
      tags: ['基础款', '百搭'],
      favorite: false,
      wearCount: 15,
      lastWorn: '2024-03-01',
      description: '经典白色圆领T恤，100%纯棉材质，舒适透气'
    },
    {
      id: 2,
      name: '牛仔直筒裤',
      category: 'bottoms',
      color: 'blue',
      brand: 'ZARA',
      season: 'all',
      image: 'https://picsum.photos/300/400?random=2',
      tags: ['经典', '显瘦'],
      favorite: true,
      wearCount: 8,
      lastWorn: '2024-02-28',
      description: '高腰直筒牛仔裤，修身显瘦，适合多种场合'
    },
    {
      id: 3,
      name: '黑色西装外套',
      category: 'outerwear',
      color: 'black',
      brand: 'COS',
      season: 'autumn',
      image: 'https://picsum.photos/300/400?random=3',
      tags: ['正式', '商务'],
      favorite: false,
      wearCount: 3,
      lastWorn: '2024-02-20',
      description: '经典黑色西装外套，适合商务场合和正式活动'
    },
    {
      id: 4,
      name: '碎花连衣裙',
      category: 'dresses',
      color: 'pink',
      brand: 'Mango',
      season: 'summer',
      image: 'https://picsum.photos/300/400?random=4',
      tags: ['甜美', '约会'],
      favorite: true,
      wearCount: 12,
      lastWorn: '2024-03-05',
      description: '甜美碎花连衣裙，适合春夏季节，约会首选'
    },
    {
      id: 5,
      name: '小白鞋',
      category: 'shoes',
      color: 'white',
      brand: 'Nike',
      season: 'all',
      image: 'https://picsum.photos/300/400?random=5',
      tags: ['运动', '百搭'],
      favorite: false,
      wearCount: 20,
      lastWorn: '2024-03-06',
      description: '经典小白鞋，百搭单品，适合日常穿搭'
    },
    {
      id: 6,
      name: '真皮手提包',
      category: 'accessories',
      color: 'black',
      brand: 'Coach',
      season: 'all',
      image: 'https://picsum.photos/300/400?random=6',
      tags: ['奢侈品', '商务'],
      favorite: true,
      wearCount: 5,
      lastWorn: '2024-02-25',
      description: '真皮手提包，高端品质，适合商务和正式场合'
    }
  ]);

  // 筛选后的衣物列表
  const filteredItems = clothingItems.filter(item => {
    const matchCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchSearch = !searchKeyword ||
      item.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchKeyword.toLowerCase()));
    const matchColor = selectedColors.length === 0 || selectedColors.includes(item.color);
    const matchBrand = selectedBrands.length === 0 || selectedBrands.includes(item.brand);

    return matchCategory && matchSearch && matchColor && matchBrand;
  });

  // 处理图片上传
  const handleImageUpload = (files) => {
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewItem(prev => ({
          ...prev,
          image: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // 添加衣物
  const handleAddItem = () => {
    if (!newItem.name || !newItem.image) {
      Toast.fail('请填写衣物名称并上传图片');
      return;
    }

    const item = {
      id: Date.now(),
      ...newItem,
      favorite: false,
      wearCount: 0,
      lastWorn: null
    };

    setClothingItems(prev => [item, ...prev]);
    setShowAddItemPopup(false);
    setNewItem({
      name: '',
      category: 'tops',
      color: '',
      brand: '',
      season: 'spring',
      tags: [],
      image: null,
      description: ''
    });
    Toast.success('添加成功');
  };

  // 删除衣物
  const handleDeleteItem = (id) => {
    Dialog.confirm({
      title: '确认删除',
      message: '确定要删除这件衣物吗？',
    }).then(() => {
      setClothingItems(prev => prev.filter(item => item.id !== id));
      Toast.success('删除成功');
    }).catch(() => { });
  };

  // 切换收藏状态
  const toggleFavorite = (id) => {
    setClothingItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, favorite: !item.favorite } : item
      )
    );
  };

  // 清除筛选条件
  const clearFilters = () => {
    setSelectedColors([]);
    setSelectedBrands([]);
    setSearchKeyword('');
    setActiveCategory('all');
  };

  // 添加操作选项
  const addActions = [
    {
      name: '拍照添加',
      icon: <Aim />,
      onClick: () => {
        setShowAddSheet(false);
        setShowAddItemPopup(true);
      }
    },
    {
      name: '从相册选择',
      icon: <PhotoO />,
      onClick: () => {
        setShowAddSheet(false);
        setShowAddItemPopup(true);
      }
    }
  ];

  return (
    <div className={styles.container}>
      {/* 导航栏 */}
      <NavBar
        title="我的衣柜"
        leftText="返回"
        rightText="筛选"
        onClickLeft={() => navigate(-1)}
        onClickRight={() => setShowFilterPopup(true)}
        className={styles.navbar}
      />

      {/* 搜索栏 */}
      <div className={styles.searchSection}>
        <Field
          value={searchKeyword}
          onChange={setSearchKeyword}
          placeholder="搜索衣物名称或标签"
          leftIcon={<Search />}
          rightIcon={searchKeyword ? <Close /> : null}
          onClear={() => setSearchKeyword('')}
          clearable
          className={styles.searchInput}
        />
      </div>

      {/* 分类标签 */}
      <div className={styles.categorySection}>
        <div className={styles.categoryList}>
          {categories.map(category => (
            <div
              key={category.id}
              className={`${styles.categoryItem} ${activeCategory === category.id ? styles.active : ''
                }`}
              onClick={() => setActiveCategory(category.id)}
            >
              <div className={styles.categoryIcon}>{category.icon}</div>
              <div className={styles.categoryName}>{category.name}</div>
              <div className={styles.categoryCount}>{category.count}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 筛选标签显示 */}
      {(selectedColors.length > 0 || selectedBrands.length > 0) && (
        <div className={styles.filterTags}>
          {selectedColors.map(color => (
            <Tag
              key={color}
              closeable
              onClose={() => setSelectedColors(prev => prev.filter(c => c !== color))}
              className={styles.filterTag}
            >
              {colors.find(c => c.id === color)?.name}
            </Tag>
          ))}
          {selectedBrands.map(brand => (
            <Tag
              key={brand}
              closeable
              onClose={() => setSelectedBrands(prev => prev.filter(b => b !== brand))}
              className={styles.filterTag}
            >
              {brand}
            </Tag>
          ))}
          <Button size="mini" onClick={clearFilters} className={styles.clearButton}>
            清除筛选
          </Button>
        </div>
      )}

      {/* 衣物网格 */}
      <div className={styles.clothingGrid}>
        {loading ? (
          <div className={styles.loadingContainer}>
            <Loading size="24px" />
            <p>加载中...</p>
          </div>
        ) : filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <SwipeCell
              key={item.id}
              rightAction={
                <div className={styles.swipeActions}>
                  <Button
                    square
                    type="primary"
                    icon={<Edit />}
                    className={styles.editButton}
                  />
                  <Button
                    square
                    type="danger"
                    icon={<DeleteO />}
                    onClick={() => handleDeleteItem(item.id)}
                    className={styles.deleteButton}
                  />
                </div>
              }
            >
              <div className={styles.clothingItem}>
                <div className={styles.itemImageContainer}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className={styles.itemImage}
                  />
                  <div className={styles.itemOverlay}>
                    <div className={styles.itemActions}>
                      <div
                        className={`${styles.favoriteButton} ${item.favorite ? styles.favorited : ''}`}
                        onClick={() => toggleFavorite(item.id)}
                      >
                        <StarO />
                      </div>
                      <div className={styles.shareButton}>
                        <ShareO />
                      </div>
                    </div>
                  </div>
                  {item.wearCount > 0 && (
                    <div className={styles.wearCount}>
                      穿过 {item.wearCount} 次
                    </div>
                  )}
                </div>
                <div className={styles.itemInfo}>
                  <h3 className={styles.itemName}>{item.name}</h3>
                  <div className={styles.itemMeta}>
                    <span className={styles.itemBrand}>{item.brand}</span>
                    <div
                      className={styles.itemColor}
                      style={{ backgroundColor: colors.find(c => c.id === item.color)?.color }}
                    ></div>
                  </div>
                  <div className={styles.itemTags}>
                    {item.tags.map(tag => (
                      <span key={tag} className={styles.itemTag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </SwipeCell>
          ))
        ) : (
          <div className={styles.emptyContainer}>
            <Empty
              description="暂无衣物"
              image={<InfoO size={48} />}
            />
            <Button
              type="primary"
              size="small"
              onClick={() => setShowAddSheet(true)}
              className={styles.emptyAddButton}
            >
              添加第一件衣物
            </Button>
          </div>
        )}
      </div>

      {/* 添加按钮 */}
      <div className={styles.addButton} onClick={() => setShowAddSheet(true)}>
        <AddO size={24} />
      </div>

      {/* 添加方式选择 */}
      <ActionSheet
        visible={showAddSheet}
        actions={addActions}
        onCancel={() => setShowAddSheet(false)}
        title="添加衣物"
        cancelText="取消"
      />

      {/* 筛选弹窗 */}
      <Popup
        visible={showFilterPopup}
        onClose={() => setShowFilterPopup(false)}
        position="bottom"
        style={{ height: '60%' }}
      >
        <div className={styles.filterPopup}>
          <div className={styles.filterHeader}>
            <h3>筛选条件</h3>
            <Close onClick={() => setShowFilterPopup(false)} />
          </div>

          <div className={styles.filterContent}>
            <div className={styles.filterSection}>
              <h4>颜色</h4>
              <div className={styles.colorOptions}>
                {colors.map(color => (
                  <div
                    key={color.id}
                    className={`${styles.colorOption} ${selectedColors.includes(color.id) ? styles.selected : ''
                      }`}
                    onClick={() => {
                      setSelectedColors(prev =>
                        prev.includes(color.id)
                          ? prev.filter(c => c !== color.id)
                          : [...prev, color.id]
                      );
                    }}
                  >
                    <div
                      className={styles.colorCircle}
                      style={{ backgroundColor: color.color }}
                    ></div>
                    <span>{color.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.filterSection}>
              <h4>品牌</h4>
              <div className={styles.brandOptions}>
                {brands.map(brand => (
                  <Tag
                    key={brand}
                    checkable
                    checked={selectedBrands.includes(brand)}
                    onChange={(checked) => {
                      setSelectedBrands(prev =>
                        checked
                          ? [...prev, brand]
                          : prev.filter(b => b !== brand)
                      );
                    }}
                    className={styles.brandTag}
                  >
                    {brand}
                  </Tag>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.filterActions}>
            <Button onClick={clearFilters} className={styles.clearFilterButton}>
              清除筛选
            </Button>
            <Button
              type="primary"
              onClick={() => setShowFilterPopup(false)}
              className={styles.confirmFilterButton}
            >
              确定
            </Button>
          </div>
        </div>
      </Popup>

      {/* 添加衣物弹窗 */}
      <Popup
        visible={showAddItemPopup}
        onClose={() => setShowAddItemPopup(false)}
        position="bottom"
        style={{ height: '80%' }}
      >
        <div className={styles.addItemPopup}>
          <div className={styles.addItemHeader}>
            <h3>添加衣物</h3>
            <Cross  onClick={() => setShowAddItemPopup(false)} />
          </div>

          <div className={styles.addItemContent}>
            {/* 图片上传 */}
            <div className={styles.imageUploadSection}>
              <Uploader
                value={newItem.image ? [{ url: newItem.image }] : []}
                onChange={handleImageUpload}
                maxCount={1}
                className={styles.imageUploader}
              >
                <div className={styles.uploadPlaceholder}>
                  <PhotoO size={32} />
                  <p>点击上传图片</p>
                </div>
              </Uploader>
            </div>

            {/* 基本信息 */}
            <div className={styles.formSection}>
              <Field
                label="衣物名称"
                value={newItem.name}
                onChange={(value) => setNewItem(prev => ({ ...prev, name: value }))}
                placeholder="请输入衣物名称"
                required
              />

              <Field
                label="分类"
                value={categories.find(c => c.id === newItem.category)?.name}
                isLink
                readonly
                onClick={() => {
                  // 这里可以添加分类选择逻辑
                }}
              />

              <Field
                label="颜色"
                value={newItem.color}
                onChange={(value) => setNewItem(prev => ({ ...prev, color: value }))}
                placeholder="请输入颜色"
              />

              <Field
                label="品牌"
                value={newItem.brand}
                onChange={(value) => setNewItem(prev => ({ ...prev, brand: value }))}
                placeholder="请输入品牌"
              />

              <Field
                label="描述"
                value={newItem.description}
                onChange={(value) => setNewItem(prev => ({ ...prev, description: value }))}
                placeholder="请输入描述信息"
                type="textarea"
                rows={3}
              />
            </div>
          </div>

          <div className={styles.addItemActions}>
            <Button
              onClick={() => setShowAddItemPopup(false)}
              className={styles.cancelButton}
            >
              取消
            </Button>
            <Button
              type="primary"
              onClick={handleAddItem}
              className={styles.confirmButton}
            >
              添加
            </Button>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default Wardrobe;