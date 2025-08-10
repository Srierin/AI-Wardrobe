// src/stores/useSearchStore.js
import {create} from 'zustand';
import { persist } from 'zustand/middleware';

const useSearchStore = create(
  persist(
    (set, get) => ({
      history: [],
      addSearchHistory: (keyword) => {
        const currentHistory = get().history;
        // 避免重复添加
        if (!currentHistory.includes(keyword)) {
          // 限制历史记录数量为10条
          const newHistory = [keyword, ...currentHistory].slice(0, 10);
          set({ history: newHistory });
        }
      },
      removeSearchHistory: (keyword) => {
        set({ history: get().history.filter(item => item !== keyword) });
      },
      clearSearchHistory: () => set({ history: [] }),
    }),
    {
      name: 'search-history', // localStorage key
      getStorage: () => localStorage,
    }
  )
);

export default useSearchStore;