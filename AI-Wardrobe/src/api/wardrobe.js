import apiClient from './config';

/**
 * 获取图片列表
 * @param {number} page - 页码
 * @returns {Promise} 图片列表
 */
export const getImages = (page) => {
  return apiClient.get('/images', {
    params: { page }
  });
};
