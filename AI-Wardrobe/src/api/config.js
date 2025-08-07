import axios from 'axios';
import { Toast } from 'react-vant';

// API基础配置
const API_BASE_URL = 'http://localhost:5173/api'; // 可根据环境切换

// 创建axios实例
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10秒超时
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': 'Bearer your-token-here', // 如果需要token
  },
});

// 请求拦截器 - 添加token
apiClient.interceptors.request.use(
  (config) => {
    // 从localStorage获取token
    const token = localStorage.getItem('token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // 打印请求信息（开发环境）
    if (process.env.NODE_ENV === 'development') {
      console.log('🚀 API Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
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
    if (process.env.NODE_ENV === 'development') {
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
      
      switch (status) {
        case 401:
          // 未授权，清除token并跳转到登录页
          localStorage.removeItem('token');
          Toast.fail('登录已过期，请重新登录');
          // 这里可以使用路由跳转到登录页
          window.location.href = '/login';
          break;
          
        case 403:
          Toast.fail('没有权限访问该资源');
          break;
          
        case 404:
          Toast.fail('请求的资源不存在');
          break;
          
        case 500:
          Toast.fail('服务器内部错误');
          break;
          
        default:
          Toast.fail(data?.message || '请求失败');
      }
    } else if (error.request) {
      // 网络错误
      Toast.fail('网络连接失败，请检查网络');
    } else {
      // 其他错误
      Toast.fail('请求配置错误');
    }
    
    return Promise.reject(error);
  }
);

// 导出配置好的axios实例
export default apiClient;

// 导出API基础URL，供其他地方使用
export { API_BASE_URL };