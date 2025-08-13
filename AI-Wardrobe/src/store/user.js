import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { doLogin, getUser } from '@/api/user';

export const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      isLogin: false,
      token: null,
      isInitialized: false,

      login: async ({ username, password }) => {
        try {
          const res = await doLogin({ 
            username: (username||'').trim(), 
            password: (password||'').trim() 
          });

          if (res.data.code !== 0) {
            throw new Error(res.data?.message || '登录失败');
          }

          const { token, data: user } = res.data;
          localStorage.setItem('token', token);

          set({
            user,
            isLogin: true,
            token,
            isInitialized: true
          });

          return { success: true, user, token };
        } catch (error) {
          console.error('登录失败:', error);
          throw new Error(error.message || '登录失败，请检查账号和密码');
        }
      },

      logout: () => {
        localStorage.removeItem('token');
        set({
          user: null,
          isLogin: false,
          token: null,
          isInitialized: true
        });
      },

      getUserInfo: async () => {
        try {
          const res = await getUser();
          const user = res.data.data;

          set({
            user,
            isLogin: true,
            isInitialized: true
          });

          return user;
        } catch (error) {
          console.error('获取用户信息失败:', error);
          get().logout();
          throw error;
        }
      },

      // checkLoginStatus: () => {
      //   return get().isLogin;
      // },

      initUserState: async () => {
        if (get().isInitialized) return;

        const token = localStorage.getItem('token');
        if (token) {
          set({ token, isInitialized: true });

          try {
            await get().getUserInfo();
          } catch (error) {
            get().logout();
          }
        } else {
          set({
            user: null,
            isLogin: false,
            token: null,
            isInitialized: true
          });
        }
      },

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
      name: 'user-storage',
      partialize: (state) => ({
        user: state.user,
        isLogin: state.isLogin,
        token: state.token,
        // isInitialized: state.isInitialized
      })
    }
  )
);