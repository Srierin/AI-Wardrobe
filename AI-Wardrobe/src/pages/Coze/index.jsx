
import styles from './coze.module.css';
import { useState } from 'react';

// API配置
const API_CONFIG = {
  workflowUrl: 'https://api.coze.cn/v1/workflow/run',
  workflowId: '7536275323110244395',
  timeout: 300000000000, // 30秒超时
};

const Coze = () => {
  const patToken = import.meta.env.VITE_PAT_TOKEN;

  const [description, setDescription] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');
  const [status, setStatus] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateOutfit = async () => {
    // 验证输入
    if (!description.trim()) {
      setStatus('请输入穿搭描述');
      return;
    }

    // 更新状态
    setIsGenerating(true);
    setStatus('生成中，请稍候...');
    setGeneratedImage('');

    try {
      // 检查环境变量
      if (!patToken) {
        throw new Error('缺少访问令牌，请检查环境变量配置');
      }

      const parameters = { description };

      // 设置请求超时
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);

      // 发送请求
      const response = await fetch(API_CONFIG.workflowUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${patToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ workflow_id: API_CONFIG.workflowId, parameters }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      // 检查响应状态
      if (!response.ok) {
        throw new Error(`HTTP错误: ${response.status} ${response.statusText}`);
      }

      // 解析响应数据
      const data = await response.json();

      if (data.code !== 0) {
        throw new Error(data.msg || '工作流执行失败');
      }

      // 解析返回的图片URL
      try {
        const resultData = typeof data.data === 'string' ? JSON.parse(data.data) : data.data;

        if (!resultData || !resultData.image_url) {
          throw new Error('未找到图片URL');
        }

        setGeneratedImage(resultData.image_url);
        setStatus('生成成功！');
      } catch (parseError) {
        throw new Error(`数据解析错误: ${parseError.message}`);
      }
    } catch (error) {
      // 处理不同类型的错误
      if (error.name === 'AbortError') {
        setStatus('请求超时，请稍后重试');
      } else {
        setStatus(`生成失败: ${error.message}`);
      }
      console.error('穿搭生成错误:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerInfo}>
          <h1 className={styles.title}>AI穿搭生成器</h1>
          <p className={styles.subtitle}>描述你的穿搭需求，AI为你生成专属搭配</p>
        </div>
        <div className={styles.aiIcon}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </div>
      </header>

      <div className={styles.inputSection}>
        <div className={styles.formGroup}>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="例如：今天想穿一件宽松的卫衣搭配牛仔裤，颜色要明亮一些，适合春季的休闲风格..."
            rows={4}
            className={styles.textarea}
          />
        </div>

        <button
          className={`${styles.generateButton} ${isGenerating ? styles.disabled : ''}`}
          onClick={generateOutfit}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              <span>生成中...</span>
            </div>
          ) : '生成穿搭'}
        </button>
      </div>

      <div className={styles.outputSection}>
        {status && <p className={styles.status}>{status}</p>}

        {generatedImage ? (
          <div className={styles.imageResult}>
            <img
              src={generatedImage}
              alt="生成的穿搭"
              className={styles.generatedImage}
              onLoad={() => setStatus('')}
              onError={() => setStatus('图片加载失败')}
            />
            <div className={styles.imageActions}>
              <a
                href={generatedImage}
                download="AI穿搭生成.jpg"
                className={styles.actionButton}
              >
                保存图片
              </a>
              <button
                className={styles.actionButton}
                onClick={() => {
                  setGeneratedImage('');
                  setDescription('');
                }}
              >
                重新生成
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.placeholder}>
            <div className={styles.placeholderImage}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p>描述你的穿搭想法，AI将为你生成视觉方案</p>
          </div>
        )}
      </div>

      <div className={styles.tips}>
        <h3>使用小贴士：</h3>
        <ul>
          <li>描述越详细，生成效果越好</li>
          <li>包含季节、场合、风格等信息</li>
          <li>可添加颜色、材质等细节</li>
        </ul>
      </div>
    </div>
  );
};

export default Coze;