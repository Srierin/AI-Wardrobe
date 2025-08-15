import axios from 'axios';

// 获取当前环境信息
const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

// 动态获取API基础URL
const getApiBaseUrl = () => {
  if (typeof window === 'undefined') {
    // 服务器端渲染环境
    return '';
  }
  
  // 在Vercel或其他生产环境中，API Routes在同一域名下
  return `${window.location.protocol}//${window.location.host}/api`;
};

// 创建axios实例
const apiClient = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器 - 添加token
apiClient.interceptors.request.use(
  (config) => {
    // 从localStorage获取token
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 打印请求信息（开发环境）
    if (isDevelopment) {
      console.log('🚀 API Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        fullUrl: config.baseURL + config.url,
        data: config.data,
        headers: config.headers,
      });
    }

    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器 - 统一处理响应和错误
apiClient.interceptors.response.use(
  (response) => {
    // 打印响应信息（开发环境）
    if (isDevelopment) {
      console.log('✅ API Response:', {
        status: response.status,
        url: response.config.url,
        data: response.data,
      });
    }

    return response;
  },
  (error) => {
    console.error('❌ Response Error:', error);

    // 统一错误处理
    if (error.response) {
      const { status, data } = error.response;

      let errorMessage = '请求失败';

      switch (status) {
        case 401:
          // 未授权，清除token并跳转到登录页
          if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            errorMessage = '登录已过期，请重新登录';
            // 避免在非浏览器环境中执行
            if (window.location) {
              window.location.href = '/login';
            }
          }
          break;

        case 403:
          errorMessage = '没有权限访问该资源';
          break;

        case 404:
          errorMessage = '请求的资源不存在';
          break;

        case 500:
          errorMessage = '服务器内部错误';
          break;

        default:
          errorMessage = data?.message || errorMessage;
      }

      // 直接抛出错误信息，由调用方处理
      throw new Error(errorMessage);
    } else if (error.request) {
      // 网络错误
      throw new Error('网络连接失败，请检查网络');
    } else {
      // 其他错误
      throw new Error('请求配置错误');
    }
  }
);

// 导出配置好的axios实例
export default apiClient;

// 导出环境信息，供其他地方使用
export { isDevelopment, isProduction, getApiBaseUrl };
