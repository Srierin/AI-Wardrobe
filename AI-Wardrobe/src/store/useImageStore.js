import { create } from 'zustand';
import { getImages } from '@/api/wardrobe';

export const useImageStore = create((set, get) => ({
  images: [],
  page: 1,
  loading: false,
  hasMore: true,

  fetchMore: async () => {
    if (get().loading) return;

    set(state => ({ ...state, loading: true }));

    try {
      const res = await getImages(get().page);
      const newImages = res.data.data || [];

      set((state) => ({
        images: [...state.images, ...newImages],
        page: state.page + 1,
        loading: false,
        hasMore: newImages.length > 0
      }));
    } catch (error) {
      console.error('加载图片失败:', error);
      set({ loading: false });
    }
  }
}));