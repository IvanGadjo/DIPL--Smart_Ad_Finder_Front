import create from "zustand";
import { IUserInterest, IFoundAdvertDTO, IFoundAdvert } from "../interfaces";

// * State for found adverts coming from the webhook

interface UserInterestsState {
    userInterests: IUserInterest[];
    setUserInterests: (userInterests: IUserInterest[]) => void;
    addUserInterest: (userInterest: IUserInterest) => void;

    addFoundAdvert: (foundAdvert: IFoundAdvertDTO) => void;
}



export const useUI_ZustandStore = create<UserInterestsState>()((set) => ({
    userInterests: [],
    setUserInterests: (newUserInterests: IUserInterest[]) => set({ userInterests: newUserInterests}),
    addUserInterest: (newUserInterest: IUserInterest) => set(state => ({ userInterests: [...state.userInterests, newUserInterest]})),

    // addFoundAdvert: (newFoundAdDTO: IFoundAdvertDTO) => set((state) => {

    //     let newFoundAd: IFoundAdvert = {        // * Make new ad from DTO
    //         alreadyShownToUser: false,
    //         imageUrl: newFoundAdDTO.imageUrl,
    //         price: newFoundAdDTO.price,
    //         title: newFoundAdDTO.title,
    //         url: newFoundAdDTO.url
    //     }

    //     state.userInterests.map(ui => {         // * Find needed userInterest, update it
    //         if(ui.id === newFoundAdDTO.userInterestId){
    //             ui.foundAdverts?.push(newFoundAd);
    //             return ui;
    //         } else return ui;
    //     })

    //     return {
    //         userInterests: state.userInterests
    //     }
    // })


    addFoundAdvert: (newFoundAdDTO: IFoundAdvertDTO) => set((state) => ({
            userInterests: state.userInterests.map(ui => {         // * Find needed userInterest, update it
                            if(ui.id === newFoundAdDTO.userInterestId){
                                let newFoundAd: IFoundAdvert = {        // * Make new ad from DTO
                                    alreadyShownToUser: false,
                                    imageUrl: newFoundAdDTO.imageUrl,
                                    price: newFoundAdDTO.price,
                                    title: newFoundAdDTO.title,
                                    url: newFoundAdDTO.url
                                }

                                ui.foundAdverts?.push(newFoundAd);
                                return ui;
                            } else return ui;
                        })
            })
        )}
    ))
