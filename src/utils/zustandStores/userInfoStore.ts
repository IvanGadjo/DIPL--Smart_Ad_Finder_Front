import create from "zustand";
import { IUserInterest, IFoundAdvertDTO, IFoundAdvert, IAuth0UserInfo } from "../interfaces";

// * State for found adverts coming from the webhook

interface UserInterestsState {
    userInterests: IUserInterest[];
    setUserInterests: (userInterests: IUserInterest[]) => void;
    addUserInterest: (userInterest: IUserInterest) => void;

    shownUserInterest: IUserInterest;
    setShownUserInterest: (userInterest: IUserInterest) => void;

    auth0UserInfo: IAuth0UserInfo;
    setAuth0UserInfo: (auth0info: IAuth0UserInfo) => void;

    userId: number | null;
    setUserId: (newUserId: number) => void;

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

    auth0UserInfo: {
        name: '', email: '', token: ''
    },
    setAuth0UserInfo: (auth0info: IAuth0UserInfo) => set(({ auth0UserInfo: auth0info })),

    userId: null,
    setUserId: (newUserId: number) => set({ userId: newUserId }),

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
                                // console.log('Gi kladov!')
                                ui.foundAdverts?.push(newFoundAd);
                            }
                            // ui.foundAdverts?.push(newFoundAd);

                            // console.log(ui)

                            return ui;
                        } else return ui;
                    })
        })
    ),
}))
