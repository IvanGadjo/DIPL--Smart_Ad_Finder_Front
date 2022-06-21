import create from "zustand";

interface RenderUserInterestsInfoState {
    category: string;
    setCategory: (category: string) => void;
    region: string;
    setRegion: (region: string) => void;
    showActiveUserInterests: boolean;
    setShowActiveUserInterests: (active: boolean) => void;

    menuSidebarOpen: boolean,
    setMenuSidebarOpen: (open: boolean) => void;
}



export const useRUIIS_ZustandStore = create<RenderUserInterestsInfoState>()((set) => ({
    category: 'all',
    setCategory: (newCategory) => set({ category: newCategory}),
    region: 'all',
    setRegion: (newRegion) => set({ region: newRegion}),
    showActiveUserInterests: true,
    setShowActiveUserInterests: (newActiveVal) => set({ showActiveUserInterests: newActiveVal}),

    menuSidebarOpen: true,
    setMenuSidebarOpen: (open) => set({ menuSidebarOpen: open})
}))