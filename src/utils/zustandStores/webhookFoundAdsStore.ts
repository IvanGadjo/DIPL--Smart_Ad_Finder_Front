import create from "zustand";
import { IFoundAdvertDTO } from "../interfaces";

// * State for found adverts coming from the webhook

interface FoundAdsState {
    webhookFoundAds: IFoundAdvertDTO[];
    setWebhookFoundAds: (webhookFoundAds: IFoundAdvertDTO[]) => void;
    addWebhookFoundAd: (webhookFoundAd: IFoundAdvertDTO) => void;
}



export const useZustandStore = create<FoundAdsState>()((set) => ({
    webhookFoundAds: [],
    setWebhookFoundAds: (newFoundAds) => set({ webhookFoundAds: newFoundAds}),
    addWebhookFoundAd: (newFoundAd) => set(state => ({ webhookFoundAds: [...state.webhookFoundAds, newFoundAd]})),
}))