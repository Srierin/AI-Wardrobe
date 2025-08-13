import styles from './coze.module.css';
import { useState, useRef } from 'react';
import useTitle from "@/hooks/useTitle";

// API配置
const API_CONFIG = {
  workflowUrl: 'https://api.coze.cn/v1/workflow/run',
  workflowId: '7536275323110244395',
  timeout: 450000, // 增加超时时间到45秒
};

const Coze = () => {
  useTitle('AI穿搭生成');
  const patToken = import.meta.env.VITE_PAT_TOKEN;

  const [description, setDescription] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');
  const [status, setStatus] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [debugUrl, setDebugUrl] = useState('');
  
  // 使用ref存储AbortController，确保在组件卸载时能正确清理
  const abortControllerRef = useRef(null);

  const generateOutfit = async () => {
    if (!description.trim()) {
      setStatus('请输入穿搭描述');
      return;
    }

    setIsGenerating(true);
    setStatus('正在生成中，请稍候...');
    setGeneratedImage('');
    setDebugUrl('');

    try {
      if (!patToken) {
        throw new Error('缺少访问令牌，请检查环境变量配置');
      }

      // 创建新的AbortController并存储引用
      abortControllerRef.current = new AbortController();
      const signal = abortControllerRef.current.signal;

      // 设置超时时间
      const timeoutId = setTimeout(() => {
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }
      }, API_CONFIG.timeout);

      // 准备请求参数
      const requestBody = {
        workflow_id: API_CONFIG.workflowId,
        parameters: {
          input: {
            description: description.trim()
          }
        }
      };

      // 发送请求
      const response = await fetch(API_CONFIG.workflowUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${patToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody),
        signal // 使用signal控制请求
      });

      // 请求成功，清除超时计时器
      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP错误 ${response.status}: ${response.statusText}. ${errorText}`);
      }

      const data = await response.json();
      console.log('API响应数据:', data);

      // 处理特定错误代码
      if (data.code !== undefined && data.code !== 0) {
        if (data.code === 4000) {
          const errorMsg = data.msg || '请求参数无效';
          throw new Error(`${errorMsg}，请确保描述符合要求`);
        }
        throw new Error(data.msg || data.message || '工作流执行失败');
      }

      if (data.debug_url) {
        setDebugUrl(data.debug_url);
      }

      // 解析结果
      let resultData = data.data;
      
      if (typeof resultData === 'string') {
        try {
          resultData = JSON.parse(resultData);
        } catch (parseError) {
          console.warn('无法解析data字段为JSON:', parseError);
        }
      }

      // 查找图片URL
      let imageUrl = null;
      if (resultData) {
        // 尝试多种可能的字段名
        imageUrl = resultData.image_url || 
                  resultData.imageUrl || 
                  resultData.url || 
                  resultData.result ||
                  resultData.output ||
                  (resultData.outputs && resultData.outputs.image_url) ||
                  (resultData.outputs && resultData.outputs[0]?.image_url) ||
                  (resultData.results && resultData.results[0]?.image_url);
      }

      if (imageUrl) {
        setGeneratedImage(imageUrl);
        setStatus('生成成功！');
      } else {
        console.log('未找到图片URL，原始数据:', data);
        setStatus('生成完成，但未找到图片结果');
        
        if (debugUrl) {
          setStatus(prev => prev + ' 可查看调试信息了解详情。');
        }
      }

    } catch (error) {
      // 处理不同类型的错误
      let errorMessage = '生成失败';
      
      if (error.name === 'AbortError') {
        errorMessage = `请求超时（${API_CONFIG.timeout/1000}秒），服务器响应时间较长，请稍后重试`;
      } else if (error.message.includes('Failed to fetch')) {
        errorMessage = '网络连接失败，请检查网络连接';
      } else if (error.message.includes('400')) {
        errorMessage = `参数错误: ${error.message}`;
      } else if (error.message.includes('401')) {
        errorMessage = '访问令牌无效，请检查配置';
      } else if (error.message.includes('403')) {
        errorMessage = '权限不足，请检查访问令牌权限';
      } else if (error.message.includes('404')) {
        errorMessage = '工作流不存在或未发布';
      } else {
        errorMessage = `生成失败: ${error.message}`;
      }
      
      setStatus(errorMessage);
      console.error('穿搭生成错误:', error);
    } finally {
      setIsGenerating(false);
      abortControllerRef.current = null; // 重置abortController
    }
  };

  // 添加取消请求的功能
  const handleCancel = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setIsGenerating(false);
    setStatus('请求已取消');
  };

  const handleReset = () => {
    setGeneratedImage('');
    setDescription('');
    setStatus('');
    setDebugUrl('');
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerInfo}>
            <h1 className={styles.title}>AI穿搭生成器</h1>
            <p className={styles.subtitle}>描述你的穿搭需求，AI为你生成专属搭配</p>
          </div>
          <div className={styles.aiIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.inputSection}>
          <div className={styles.formGroup}>
            <label className={styles.label}>穿搭描述</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="例如：今天想穿一件宽松的卫衣搭配牛仔裤，颜色要明亮一些，适合春季的休闲风格..."
              rows={4}
              className={styles.textarea}
              disabled={isGenerating}
            />
          </div>

          <div className={styles.buttonGroup}>
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
              ) : (
                <>
                  <svg className={styles.buttonIcon} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  生成穿搭
                </>
              )}
            </button>
            
            {isGenerating && (
              <button
                className={styles.cancelButton}
                onClick={handleCancel}
              >
                取消请求
              </button>
            )}
          </div>
        </div>

        <div className={styles.outputSection}>
          {status && (
            <div className={`${styles.statusMessage} ${status.includes('失败') || status.includes('错误') ? styles.error : styles.success}`}>
              <div className={styles.statusIcon}>
                {status.includes('失败') || status.includes('错误') ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20,6 9,17 4,12"></polyline>
                  </svg>
                )}
              </div>
              <span>{status}</span>
            </div>
          )}

          {debugUrl && (
            <div className={styles.debugInfo}>
              <a href={debugUrl} target="_blank" rel="noopener noreferrer" className={styles.debugLink}>
                查看调试信息
              </a>
            </div>
          )}

          {generatedImage ? (
            <div className={styles.imageResult}>
              <div className={styles.imageContainer}>
                <img
                  src={generatedImage}
                  alt="生成的穿搭"
                  className={styles.generatedImage}
                  onLoad={() => setStatus('生成成功！')}
                  onError={() => setStatus('图片加载失败，请检查图片链接')}
                />
              </div>
              <div className={styles.imageActions}>
                <a
                  href={generatedImage}
                  download="AI穿搭生成.jpg"
                  className={styles.actionButton}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7,10 12,15 17,10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  保存图片
                </a>
                <button
                  className={styles.actionButton}
                  onClick={handleReset}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="1,4 1,10 7,10"></polyline>
                    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
                  </svg>
                  重新生成
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.placeholder}>
              <div className={styles.placeholderIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21,15 16,10 5,21"></polyline>
                </svg>
              </div>
              <h3 className={styles.placeholderTitle}>等待生成结果</h3>
              <p className={styles.placeholderText}>描述你的穿搭想法，AI将为你生成视觉方案</p>
            </div>
          )}
        </div>

        <div className={styles.tips}>
          <h3 className={styles.tipsTitle}>使用小贴士</h3>
          <div className={styles.tipsList}>
            <div className={styles.tipItem}>
              <div className={styles.tipIcon}>💡</div>
              <span>描述越详细，生成效果越好</span>
            </div>
            <div className={styles.tipItem}>
              <div className={styles.tipIcon}>🎯</div>
              <span>包含季节、场合、风格等信息</span>
            </div>
            <div className={styles.tipItem}>
              <div className={styles.tipIcon}>🎨</div>
              <span>可添加颜色、材质等细节</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Coze;
