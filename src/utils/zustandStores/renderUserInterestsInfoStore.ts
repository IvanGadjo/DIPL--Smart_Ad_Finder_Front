import create from "zustand";

interface RenderUserInterestsInfoState {
    category: string;
    setCategory: (category: string) => void;
    region: string;
    setRegion: (region: string) => void;
    showActiveUserInterests: boolean;
    setShowActiveUserInterests: (active: boolean) => void;
}



export const useZustandStore = create<RenderUserInterestsInfoState>()((set) => ({
    category: 'all',
    setCategory: (newCategory) => set({ category: newCategory}),
    region: 'all',
    setRegion: (newRegion) => set({ region: newRegion}),
    showActiveUserInterests: true,
    setShowActiveUserInterests: (newActiveVal) => set({ showActiveUserInterests: newActiveVal})
}))