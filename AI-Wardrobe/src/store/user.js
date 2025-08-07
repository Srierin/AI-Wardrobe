import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { doLogin, getUser } from '@/api/user';

export const useUserStore = create(
  persist(
    (set, get) => ({
      // 用户信息
      user: null,
      // 登录状态
      isLogin: false,
      // 登录token
      token: null,
      // 添加初始化状态标识
      isInitialized: false,

      // 登录方法
      login: async ({ username, password }) => {
        try {
          const res = await doLogin({ username, password });
          
          // 确保响应结构正确
          if (!res.data || res.data.code !== 0) {
            throw new Error(res.data?.message || '登录失败');
          }
          
          const { token, data: user } = res.data;
          localStorage.setItem('token', token);
          
          set({
            user,
            isLogin: true,
            token,
            isInitialized: true // 标记为已初始化
          });
      
          return { success: true, user, token };
        } catch (error) {
          console.error('登录失败:', error);
          throw new Error(error.message || '登录失败，请检查用户名和密码');
        }
      },

      // 退出登录
      logout: () => {
        // 清除localStorage中的token
        localStorage.removeItem('token');
        
        // 重置状态
        set({
          user: null,
          isLogin: false,
          token: null,
          isInitialized: true // 标记为已初始化
        });
      },

      // 获取用户信息
      getUserInfo: async () => {
        try {
          const res = await getUser();
          const user = res.data.data;
          
          set({
            user,
            isLogin: true,
            isInitialized: true // 标记为已初始化
          });

          return user;
        } catch (error) {
          console.error('获取用户信息失败:', error);
          // 如果获取用户信息失败，可能是token过期，执行登出
          get().logout();
          throw error;
        }
      },

      // 修改检查登录状态方法 - 改为同步检查
      checkLoginStatus: () => {
        // 直接返回当前状态，避免异步操作
        return get().isLogin;
      },

      // 修改初始化用户状态方法
      initUserState: async () => {
        // 如果已经初始化过，直接返回
        if (get().isInitialized) {
          return;
        }
        
        const token = localStorage.getItem('token');
        if (token) {
          set({ token, isInitialized: true }); // 标记为已初始化
          
          try {
            // 尝试获取用户信息
            await get().getUserInfo();
          } catch (error) {
            // 获取失败则清除登录状态
            get().logout();
          }
        } else {
          // 没有token，确保状态为未登录
          set({
            user: null,
            isLogin: false,
            token: null,
            isInitialized: true // 标记为已初始化
          });
        }
      },

      // 添加更新头像的方法
      updateAvatar: (newAvatar) => {
        set(state => {
          if (state.user) {
            return {
              user: {
                ...state.user,
                avatar: newAvatar
              }
            };
          }
          return state;
        });
      },
    }),
    {
      name: 'user-storage', // localStorage中的key名
      partialize: (state) => ({
        // 只持久化这些字段
        user: state.user,
        isLogin: state.isLogin,
        token: state.token,
        isInitialized: state.isInitialized // 持久化初始化状态
      })
    }
  )
);