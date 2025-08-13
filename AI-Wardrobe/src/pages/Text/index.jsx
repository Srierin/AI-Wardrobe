import { useNavigate, useLocation } from 'react-router-dom';
import styles from './text.module.css';
import useTitle from "@/hooks/useTitle";

const Text = () => {
  useTitle('测试中');
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('q') || '';

  return (
    <div 
      className={styles.resultsContainer}
      onClick={() => navigate(-1)}
    >
      <div className={styles.developmentMessage}>
        <h2>页面正在开发中</h2>
        <p>请敬请期待</p>
        {/* {searchQuery && (
          <p className={styles.searchQuery}>搜索关键词: <span>{searchQuery}</span></p>
        )} */}
        <p className={styles.tip}>点击任意位置返回</p>
      </div>
    </div>
  );
};

export default Text;