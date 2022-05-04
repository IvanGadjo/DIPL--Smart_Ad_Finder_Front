import { createContext } from 'react';

export type RenderUserInterestsInfo = {
  category: string;
  setCategory: (category: string) => void;
  region: string;
  setRegion: (region: string) => void;
  showActiveUserInterests: boolean;
  setShowActiveUserInterests: (active: boolean) => void;
};

export const RenderUserInterestsInfoContext = createContext<RenderUserInterestsInfo>({
  category: 'all',
  setCategory: () => {},
  region: 'all',
  setRegion: () => {},
  showActiveUserInterests: true,
  setShowActiveUserInterests: () => {}
});
