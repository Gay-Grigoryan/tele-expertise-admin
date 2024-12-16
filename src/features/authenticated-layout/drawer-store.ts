import { create } from "zustand";

interface DrawerStoreState {
  isDrawerOpen: boolean;
  activePagePathname: string | null;
}

interface DrawerStoreActions {
  setIsDrawerOpen(_isDrawerOpen: boolean): void;
  setActivePagePathname(_activePagePathname: string): void;
}

const useDrawerStore = create<DrawerStoreState & DrawerStoreActions>()(set => ({
  isDrawerOpen: false,
  activePagePathname: null,
  setActivePagePathname(activePagePathname) {
    set(() => ({ activePagePathname }));
  },
  setIsDrawerOpen(isDrawerOpen) {
    set(() => ({ isDrawerOpen }));
  }
}));

export default useDrawerStore;
