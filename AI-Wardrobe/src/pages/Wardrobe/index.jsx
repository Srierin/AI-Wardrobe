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
import useTitle from "@/hooks/useTitle";

const Wardrobe = () => {
  useTitle('衣橱');
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
    { id: 'tops', name: '上衣', icon: '👕', count: 5 },
    { id: 'bottoms', name: '下装', icon: '👖', count: 3 },
    { id: 'outerwear', name: '外套', icon: '🧥', count: 3 },
    { id: 'dresses', name: '连衣裙', icon: '👗', count: 7 },
    { id: 'shoes', name: '鞋子', icon: '👠', count: 4 },
    { id: 'accessories', name: '配饰', icon: '👜', count: 3 }
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
      image: 'https://image-cdn.poizon.com/app/2025/community/1681771375_byte2156605byte_4716afe051ccf44cc90f7500f88ca2ca_iOS_w1440h1920.jpg',
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
      image: 'https://img2.baidu.com/it/u=1940088800,4150699945&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=667',
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
      image: 'https://img2.baidu.com/it/u=1392586132,2758973714&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1319',
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
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=550&fit=crop',
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
      image: 'https://image-cdn.poizon.com/app/2025/community/1557647264_byte1827388byte_38d5a1df20f6755e4b08248268a97ec8_iOS_w1441h1920.jpg',
      tags: ['运动', '百搭'],
      favorite: false,
      wearCount: 20,
      lastWorn: '2024-03-06',
      description: '经典小白鞋，百搭单品，适合日常穿搭'
    },
    {
      id: 6,
      name: '灰色连帽卫衣',
      category: 'tops',
      color: 'gray',
      brand: 'Adidas',
      season: 'autumn',
      image: 'https://img1.baidu.com/it/u=2629564456,3474691797&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=750',
      tags: ['休闲', '运动'],
      favorite: true,
      wearCount: 18,
      lastWorn: '2024-03-03',
      description: '加绒灰色连帽卫衣，宽松版型，适合日常休闲与轻度运动'
    },
    {
      id: 7,
      name: '卡其色休闲裤',
      category: 'bottoms',
      color: 'khaki',
      brand: 'H&M',
      season: 'spring',
      image: 'https://img1.baidu.com/it/u=415768004,398527538&fm=253&app=138&f=JPEG?w=800&h=1070',
      tags: ['通勤', '舒适'],
      favorite: false,
      wearCount: 9,
      lastWorn: '2024-02-25',
      description: '直筒卡其色休闲裤，棉质面料，通勤休闲两相宜'
    },
    {
      id: 8,
      name: '米色风衣',
      category: 'outerwear',
      color: 'beige',
      brand: 'Burberry',
      season: 'spring',
      image: 'https://b0.bdstatic.com/ugc/img//2025-04-28/a6a56cf510310f48f3e6f343f9cb6635.png',
      tags: ['英伦', '防风'],
      favorite: true,
      wearCount: 5,
      lastWorn: '2024-02-18',
      description: '经典长款风衣，防水面料，春季防风必备'
    },
    {
      id: 9,
      name: '黑色吊带裙',
      category: 'dresses',
      color: 'black',
      brand: 'ZARA',
      season: 'summer',
      image: 'https://img1.baidu.com/it/u=3573406600,2564768811&fm=253&app=138&f=JPEG?w=800&h=1180',
      tags: ['性感', '百搭'],
      favorite: false,
      wearCount: 7,
      lastWorn: '2024-03-04',
      description: '修身黑色吊带裙，可内搭可单穿，适合多种场合'
    },
    {
      id: 10,
      name: '棕色马丁靴',
      category: 'shoes',
      color: 'brown',
      brand: 'Dr. Martens',
      season: 'winter',
      image: 'https://img0.baidu.com/it/u=2171393050,1043188384&fm=253&app=138&f=JPEG?w=800&h=1505',
      tags: ['复古', '保暖'],
      favorite: true,
      wearCount: 11,
      lastWorn: '2024-02-15',
      description: '8孔棕色马丁靴，真皮材质，保暖耐磨，复古风十足'
    },
    {
      id: 11,
      name: '条纹针织衫',
      category: 'tops',
      color: 'blue&white',
      brand: 'Uniqlo',
      season: 'autumn',
      image: 'https://img0.baidu.com/it/u=1846348944,1026347815&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=619',
      tags: ['针织', '复古'],
      favorite: false,
      wearCount: 14,
      lastWorn: '2024-02-22',
      description: '蓝白条纹针织衫，修身版型，适合春秋季节单穿或内搭'
    },
    {
      id: 12,
      name: '黑色皮裤',
      category: 'bottoms',
      color: 'black',
      brand: 'Diesel',
      season: 'winter',
      image: 'https://t13.baidu.com/it/u=665733919,2256971901&fm=224&app=112&f=JPEG?w=357&h=500',
      tags: ['摇滚', '修身'],
      favorite: true,
      wearCount: 6,
      lastWorn: '2024-02-10',
      description: '紧身黑色皮裤，pu材质，适合搭配卫衣或夹克打造酷感造型'
    },
    {
      id: 13,
      name: '牛仔夹克',
      category: 'outerwear',
      color: 'blue',
      brand: 'Levi\'s',
      season: 'spring',
      image: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcbu01.alicdn.com%2Fimg%2Fibank%2FO1CN01s5WIhp2FMgL7GRSzA_%21%212214178768866-0-cib.jpg&refer=http%3A%2F%2Fcbu01.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1757427762&t=84fc3ac88af76e02a6d36afa3724c393',
      tags: ['复古', '休闲'],
      favorite: false,
      wearCount: 16,
      lastWorn: '2024-03-02',
      description: '经典蓝色牛仔夹克，做旧处理，百搭休闲单品'
    },
    {
      id: 14,
      name: '波点雪纺衫',
      category: 'tops',
      color: 'white&black',
      brand: 'Mango',
      season: 'summer',
      image: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.alicdn.com%2Fimgextra%2Fi1%2F2211025540840%2FO1CN01FuwvI81I4lOX2Q1tX_%21%212211025540840.jpg&refer=http%3A%2F%2Fimg.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1757426487&t=7ac39a1962600210d8e182bb811d96ed',
      tags: ['清新', '通勤'],
      favorite: false,
      wearCount: 10,
      lastWorn: '2024-03-01',
      description: '黑白波点雪纺衫，轻薄透气，适合夏季通勤穿搭'
    },
    {
      id: 15,
      name: '红色高跟鞋',
      category: 'shoes',
      color: 'red',
      brand: 'Jimmy Choo',
      season: 'all',
      image: 'https://img0.baidu.com/it/u=3288071810,2858768848&fm=253&app=138&f=JPEG?w=805&h=800',
      tags: ['正式', '晚宴'],
      favorite: true,
      wearCount: 4,
      lastWorn: '2024-02-12',
      description: '经典红色细跟高跟鞋，5cm鞋跟，适合晚宴及正式场合'
    },
    {
      id: 16,
      name: '法式茶歇裙',
      category: 'dresses',
      color: 'green',
      brand: 'Sezane',
      season: 'summer',
      image: 'https://img1.baidu.com/it/u=3227260062,3877345230&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=701', // 绿色茶歇裙
      tags: ['法式', '度假'],
      favorite: true,
      wearCount: 9,
      lastWorn: '2024-03-08',
      description: '绿色碎花茶歇裙，V领收腰设计，雪纺面料轻盈透气'
    },
    {
      id: 17,
      name: '针织半身裙',
      category: 'dresses',
      color: 'cream',
      brand: 'Massimo Dutti',
      season: 'autumn',
      image: 'https://t14.baidu.com/it/u=3811206566,777595842&fm=224&app=112&f=JPEG?w=500&h=500', // 米白色针织半身裙
      tags: ['温柔', '通勤'],
      favorite: false,
      wearCount: 13,
      lastWorn: '2024-03-02',
      description: '米白色针织半身裙，A字版型，适合搭配毛衣或衬衫'
    },
    {
      id: 18,
      name: '牛仔背带裙',
      category: 'dresses',
      color: 'lightblue',
      brand: 'Levi\'s',
      season: 'spring',
      image: 'https://img1.baidu.com/it/u=70308889,294915776&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1319', // 浅蓝色牛仔背带裙
      tags: ['减龄', '休闲'],
      favorite: true,
      wearCount: 17,
      lastWorn: '2024-03-07',
      description: '浅蓝色牛仔背带裙，宽松版型，可调节肩带设计'
    },
    {
      id: 19,
      name: '缎面吊带长裙',
      category: 'dresses',
      color: 'navy',
      brand: 'Reformation',
      season: 'summer',
      image: 'https://img0.baidu.com/it/u=1952723785,1330160925&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=683', // 藏青色缎面吊带长裙
      tags: ['优雅', '晚宴'],
      favorite: false,
      wearCount: 5,
      lastWorn: '2024-02-29',
      description: '藏青色缎面吊带长裙，垂坠感强，适合正式场合'
    },
    {
      id: 20,
      name: '格纹连衣裙',
      category: 'dresses',
      color: 'red&black',
      brand: 'Kate Spade',
      season: 'autumn',
      image: 'https://img0.baidu.com/it/u=283995464,1881272500&fm=253&app=138&f=JPEG?w=800&h=1319', // 红黑格纹连衣裙
      tags: ['复古', '学院风'],
      favorite: true,
      wearCount: 8,
      lastWorn: '2024-03-01',
      description: '红黑格纹连衣裙，收腰设计，搭配腰带更显身材'
    },
    {
      id: 21,
      name: '珍珠项链',
      category: 'accessories',
      color: 'white',
      brand: 'Swarovski',
      season: 'all',
      image: 'https://img2.baidu.com/it/u=645640444,3364355704&fm=253&app=138&f=JPEG?w=800&h=1070', // 珍珠项链特写
      tags: ['优雅', '百搭'],
      favorite: true,
      wearCount: 22,
      lastWorn: '2024-03-06',
      description: '经典珍珠项链，可调节长度，适合搭配衬衫或连衣裙'
    },
    {
      id: 22,
      name: '复古耳环',
      category: 'accessories',
      color: 'gold',
      brand: 'Urban Outfitters',
      season: 'all',
      image: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.alicdn.com%2Fi3%2F248358071%2FO1CN01cNQ0EW29UZcaJorK8_%21%21248358071.jpg&refer=http%3A%2F%2Fimg.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1757427038&t=fde3cc5830f7a787d58c3d26988e5401', // 金色复古耳环
      tags: ['复古', '夸张'],
      favorite: false,
      wearCount: 11,
      lastWorn: '2024-03-03',
      description: '金色复古几何耳环，金属质感，适合搭配简约上衣'
    },
    {
      id: 23,
      name: '帆布托特包',
      category: 'accessories',
      color: 'black',
      brand: 'Stussy',
      season: 'all',
      image: 'https://img2.baidu.com/it/u=2533317737,1011444443&fm=253&app=138&f=JPEG?w=800&h=1067', // 黑色帆布托特包
      tags: ['实用', '街头'],
      favorite: true,
      wearCount: 30,
      lastWorn: '2024-03-07',
      description: '黑色帆布托特包，大容量设计，适合日常通勤和购物'
    },
    {
      id: 24,
      name: '黑色高领毛衣',
      category: 'tops',
      color: 'black',
      brand: 'Uniqlo',
      season: 'winter',
      image: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.alicdn.com%2Fi1%2F2201443656164%2FO1CN01amHvDr1vPAFM98du3_%21%210-item_pic.jpg&refer=http%3A%2F%2Fimg.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1757664075&t=0d1c53fad784edb06c1c2e51415ec429',
      tags: ['基础款', '保暖'],
      favorite: false,
      wearCount: 19,
      lastWorn: '2024-02-27',
      description: '黑色高领毛衣，羊毛混纺，保暖性强，适合叠穿'
    },
    {
      id: 25,
      name: '棕色乐福鞋',
      category: 'shoes',
      color: 'brown',
      brand: 'Clarks',
      season: 'autumn',
      image: 'https://t15.baidu.com/it/u=2346279847,1503661782&fm=224&app=112&f=JPEG?w=500&h=500', // 棕色乐福鞋
      tags: ['通勤', '舒适'],
      favorite: true,
      wearCount: 14,
      lastWorn: '2024-03-05',
      description: '棕色真皮乐福鞋，一脚蹬设计，适合搭配西装裤或牛仔裤'
    },
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
      {/* 添加方式选择 */}
      <ActionSheet
        visible={showAddSheet}
        actions={addActions}
        onCancel={() => setShowAddSheet(false)}
        title="添加衣物"
        cancelText="取消"
        closeOnClickAction
        closeOnClickOverlay
        className={styles.customActionSheet}
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
        closeable={false}
      >
        <div className={styles.addItemPopup}>
          <div className={styles.addItemHeader} >
            <h3>添加衣物</h3>
            <Close onClick={() => setShowAddItemPopup(false)} />
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