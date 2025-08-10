import { LikeO, ChatO, EyeO } from '@react-vant/icons';
import styles from './contentcard.module.css';

const ContentCard = ({ item }) => {
  return (
    <div className={styles.contentCard}>
      {/* 图片 */}
      <div className={styles.contentImage}>
        <img 
          src={item.image} 
          alt={item.title} 
          className={styles.cardImage}
          onLoad={(e) => {
            // 设置实际高度用于瀑布流计算
            e.target.parentNode.dataset.height = e.target.offsetHeight;
          }}
        />
        <div className={styles.authorInfo}>{item.author}</div>
      </div>

      {/* 内容信息 */}
      <div className={styles.contentInfo}>
        <h3 className={styles.contentTitle}>{item.title}</h3>
        <p className={styles.contentDesc}>{item.content}</p>

        {/* 标签 */}
        <div className={styles.contentTags}>
          {item.tags.map((tag, index) => (
            <span 
              key={index} 
              className={`${styles.contentTag} ${
                tag === '夏装' ? styles.summer : 
                tag === '清爽' ? styles.fresh : 
                tag === '休闲' ? styles.casual : 
                tag === '职场' ? styles.office : ''
              }`}
            >
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
  );
};

export default ContentCard;