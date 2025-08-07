import apiClient from './config';

/**
 * 用户登录
 * @param {Object} data - 登录数据
 * @param {string} data.username - 用户名
 * @param {string} data.password - 密码
 * @returns {Promise} 登录结果
 */
export const doLogin = (data) => {
  return apiClient.post('/login', data)
    .then(res => {
      // 检查业务状态码
      if (res.data.code !== 0) {
        const error = new Error(res.data.message || '登录失败');
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
 * 更新用户信息
 * @param {Object} data - 用户信息
 * @returns {Promise} 更新结果
 */
export const updateUser = (data) => {
  return apiClient.put('/user', data);
};

/**
 * 修改密码
 * @param {Object} data - 密码数据
 * @param {string} data.oldPassword - 旧密码
 * @param {string} data.newPassword - 新密码
 * @returns {Promise} 修改结果
 */
export const changePassword = (data) => {
  return apiClient.post('/user/change-password', data);
};

/**
 * 用户退出登录
 * @returns {Promise} 退出结果
 */
export const doLogout = () => {
  return apiClient.post('/logout');
};

/**
 * 刷新token
 * @returns {Promise} 新的token
 */
export const refreshToken = () => {
  return apiClient.post('/refresh-token');
};

/**
 * 获取用户收藏列表
 * @param {Object} params - 查询参数
 * @param {number} params.page - 页码
 * @param {number} params.pageSize - 每页数量
 * @returns {Promise} 收藏列表
 */
export const getUserFavorites = (params = {}) => {
  return apiClient.get('/user/favorites', { params });
};

/**
 * 添加收藏
 * @param {Object} data - 收藏数据
 * @param {string} data.type - 收藏类型 (outfit/item)
 * @param {string} data.itemId - 收藏项ID
 * @returns {Promise} 添加结果
 */
export const addFavorite = (data) => {
  return apiClient.post('/user/favorites', data);
};

/**
 * 取消收藏
 * @param {string} favoriteId - 收藏ID
 * @returns {Promise} 取消结果
 */
export const removeFavorite = (favoriteId) => {
  return apiClient.delete(`/user/favorites/${favoriteId}`);
};

/**
 * 获取用户穿搭历史
 * @param {Object} params - 查询参数
 * @returns {Promise} 穿搭历史
 */
export const getUserOutfitHistory = (params = {}) => {
  return apiClient.get('/user/outfit-history', { params });
};

/**
 * 保存穿搭方案
 * @param {Object} data - 穿搭数据
 * @returns {Promise} 保存结果
 */
export const saveOutfit = (data) => {
  return apiClient.post('/user/outfits', data);
};

/**
 * 获取用户统计数据
 * @returns {Promise} 统计数据
 */
export const getUserStats = () => {
  return apiClient.get('/user/stats');
};