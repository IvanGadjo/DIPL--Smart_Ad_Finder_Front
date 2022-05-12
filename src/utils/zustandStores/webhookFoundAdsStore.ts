import create from "zustand";
import { IFoundAdvertDTO } from "../interfaces";

// * State for found adverts coming from the webhook

interface FoundAdsState {
    webhookFoundAds: IFoundAdvertDTO[];
    setWebhookFoundAds: (webhookFoundAds: IFoundAdvertDTO[]) => void;
    addWebhookFoundAd: (webhookFoundAd: IFoundAdvertDTO) => void;
}



export const useFAS_ZustandStore = create<FoundAdsState>()((set) => ({
    webhookFoundAds: [],
    setWebhookFoundAds: (newFoundAds: IFoundAdvertDTO[]) => set({ webhookFoundAds: newFoundAds}),
    addWebhookFoundAd: (newFoundAd: IFoundAdvertDTO) => set(state => ({ webhookFoundAds: [...state.webhookFoundAds, newFoundAd]})),
}))