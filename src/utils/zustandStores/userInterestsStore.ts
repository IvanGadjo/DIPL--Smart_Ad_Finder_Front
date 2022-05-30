import create from "zustand";
import { IUserInterest, IFoundAdvertDTO, IFoundAdvert } from "../interfaces";

// * State for found adverts coming from the webhook

interface UserInterestsState {
    userInterests: IUserInterest[];
    setUserInterests: (userInterests: IUserInterest[]) => void;
    addUserInterest: (userInterest: IUserInterest) => void;

    shownUserInterest: IUserInterest;
    setShownUserInterest: (userInterest: IUserInterest) => void;

    addFoundAdvert: (foundAdvert: IFoundAdvertDTO) => void;
}



export const useUI_ZustandStore = create<UserInterestsState>()((set) => ({
    userInterests: [],
    setUserInterests: (newUserInterests: IUserInterest[]) => set({ userInterests: newUserInterests }),
    addUserInterest: (newUserInterest: IUserInterest) => set(state => ({ userInterests: [...state.userInterests, newUserInterest] })),

    shownUserInterest: {
        active: true,
        category: '',
        keywords: {
            mainKeyword: ''
        },
        region: '',
    },
    setShownUserInterest: (userInterestToShow: IUserInterest) => set(({ shownUserInterest: userInterestToShow })),


    addFoundAdvert: (newFoundAdDTO: IFoundAdvertDTO) => set((state) => ({
            userInterests: state.userInterests.map(ui => {         // * Find needed userInterest, update it
                            if(ui.id === newFoundAdDTO.userInterestId){
                                let newFoundAd: IFoundAdvert = {        // * Make new ad from DTO
                                    alreadyShownToUser: false,
                                    imageUrl: newFoundAdDTO.imageUrl,
                                    price: newFoundAdDTO.price,
                                    title: newFoundAdDTO.title,
                                    url: newFoundAdDTO.url,
                                    carYear: newFoundAdDTO.carYear,
                                    carMileage: newFoundAdDTO.carMileage
                                }

                                if(!ui.foundAdverts?.map(fa => fa.url).includes(newFoundAdDTO.url)){        // ? Ponekogas doagjaat 2 isti ad-a od websocketot, zatoa ova
                                    ui.foundAdverts?.push(newFoundAd);
                                }
                                return ui;
                            } else return ui;
                        })
            })
        )}
    ))
