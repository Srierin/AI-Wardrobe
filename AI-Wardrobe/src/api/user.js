import apiClient from './config';

/**
 * 用户登录
 * @param {Object} data - 登录数据
 * @param {string} data.username - 用户名
 * @param {string} data.password - 密码
 * @returns {Promise} 登录结果
 */
export const doLogin = (data) => {
  return apiClient.post('/login', data, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      if (res.data.code !== 0) {
        const error = new Error(res.data?.message || '登录失败');
        error.response = res;
        throw error;
      }
      return res;
    });
};

/**
 * 获取用户信息
 * @returns {Promise} 用户信息
 */
export const getUser = () => {
  return apiClient.get('/user');
};

/**
 * 用户退出登录
 * @returns {Promise} 退出结果
 */
export const doLogout = () => {
  return apiClient.post('/logout');
};

/**
 * 获取用户收藏列表
 * @param {Object} params - 查询参数
 * @param {number} params.page - 页码
 * @param {number} params.pageSize - 每页数量
 * @returns {Promise} 收藏列表
 */
export const getUserFavorites = (params = {}) => {
  return apiClient.get('/favorites', { params });
};

/**
 * 添加收藏
 * @param {Object} data - 收藏数据
 * @param {string} data.type - 收藏类型 (outfit/item)
 * @param {string} data.itemId - 收藏项ID
 * @param {string} data.title - 收藏标题
 * @param {string} data.image - 收藏图片
 * @param {string} data.description - 收藏描述
 * @param {Array} data.tags - 收藏标签
 * @returns {Promise} 添加结果
 */
export const addFavorite = (data) => {
  return apiClient.post('/favorites', data);
};

/**
 * 取消收藏
 * @param {string} favoriteId - 收藏ID
 * @returns {Promise} 取消结果
 */
export const removeFavorite = (favoriteId) => {
  return apiClient.delete(`/favorites/${favoriteId}`);
};

/**
 * 获取用户统计数据
 * @returns {Promise} 统计数据
 */
export const getUserStats = () => {
  return apiClient.get('/stats');
};

// 注意：以下API在当前Mock数据中未实现，如需使用请先实现对应的后端接口

/**
 * 更新用户信息（未实现）
 * @param {Object} data - 用户信息
 * @returns {Promise} 更新结果
 */
export const updateUser = (data) => {
  console.warn('updateUser API 未实现');
  return Promise.reject(new Error('API未实现'));
};

/**
 * 修改密码（未实现）
 * @param {Object} data - 密码数据
 * @param {string} data.oldPassword - 旧密码
 * @param {string} data.newPassword - 新密码
 * @returns {Promise} 修改结果
 */
export const changePassword = (data) => {
  console.warn('changePassword API 未实现');
  return Promise.reject(new Error('API未实现'));
};

/**
 * 刷新token（未实现）
 * @returns {Promise} 新的token
 */
export const refreshToken = () => {
  console.warn('refreshToken API 未实现');
  return Promise.reject(new Error('API未实现'));
};

/**
 * 获取用户穿搭历史（未实现）
 * @param {Object} params - 查询参数
 * @returns {Promise} 穿搭历史
 */
export const getUserOutfitHistory = (params = {}) => {
  console.warn('getUserOutfitHistory API 未实现');
  return Promise.reject(new Error('API未实现'));
};

/**
 * 保存穿搭方案（未实现）
 * @param {Object} data - 穿搭数据
 * @returns {Promise} 保存结果
 */
export const saveOutfit = (data) => {
  console.warn('saveOutfit API 未实现');
  return Promise.reject(new Error('API未实现'));
};