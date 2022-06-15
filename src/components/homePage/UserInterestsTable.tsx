import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IFoundAdvert, IUserInterest } from "../../utils/interfaces";
import { setActiveOnUserInterest, 
         getAllUserInterestsOfUser,
         getUserInterestById } from '../../utils/restServices/userInterestsService';
import { deleteFoundAdvert } from '../../utils/restServices/foundAdvertsService';
import { useUI_ZustandStore } from '../../utils/zustandStores/userInfoStore';
import shallow from 'zustand/shallow';
import CarFiltersInputs from './CarFiltersInputs';



interface IProps {
    // userInterestsProps: [IUserInterest]      // * This is a TS tuple
    userInterests: IUserInterest[],         // * This is a TS array
    setUserInterests: (userInterests: IUserInterest[]) => void
}

const UserInterestsTable: FC<IProps> = ({ userInterests, setUserInterests }) => {

    const [ shownUserInterest, 
            setShownUserInterest, 
            auth0UserInfo,
            userId ] = useUI_ZustandStore(state => [state.shownUserInterest, state.setShownUserInterest, state.auth0UserInfo, state.userId], shallow);
    const [ shownAds, setShownAds ] = useState<IFoundAdvert[] | undefined>();
    const [ prevShownAds, setPrevShownAds ] = useState<IFoundAdvert[] | undefined>();


    const [ carYear, setCarYear ] = useState<string>('');
    const [ carMileage, setCarMileage ] = useState<string>('');


    useEffect(() => {
        if(shownUserInterest)setShownAds(shownUserInterest.foundAdverts)
    },[shownUserInterest])

    const handleShownInterestChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {

        const ui = userInterests.find(ui => ui.id === parseInt(e.currentTarget.value));
            
        if(ui)
            setShownUserInterest(ui);
        else console.log('Error in handleShownInterestChange()');

    } 

    const handleSetActiveOnInterest = async (userInterest: IUserInterest) => {

        if(userId) {

            if(userInterest.active){
                // await setActiveOnUserInterest(userInterest, 1, false, auth0UserInfo.token);   // ! MOCK USER ID !
                await setActiveOnUserInterest(userInterest, userId, false, auth0UserInfo.token);

            }
            else {
                // await setActiveOnUserInterest(userInterest, 1, true, auth0UserInfo.token);    // ! MOCK USER ID !
                await setActiveOnUserInterest(userInterest, userId, true, auth0UserInfo.token);

            }


            // let newUserInterests: IUserInterest[] = await getAllUserInterestsOfUser(1, auth0UserInfo.token);     // ! MOCK USER ID !
            let newUserInterests: IUserInterest[] = await getAllUserInterestsOfUser(userId, auth0UserInfo.token);


            newUserInterests.sort((prev, next) => {       // * Sort userInterests by id and then show them in dropdown
                if(prev.id && next.id){
                    if(prev.id > next.id) 
                        return 1
                    else  return -1
                }
                else return 1
            })


            setUserInterests(newUserInterests);     // * State change triggers rerender
        } else {
            console.error('UserID e UNDEFINED!')
        }
    }

    const handleWebsiteChoiceChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();

        // * Sredi da e funkcionalno posle UI design

        // console.log(e.currentTarget.value)

        // const unchangedUserInt = userInterests.find(ui => ui.id === shownUserInterest?.id);

        // if(e.target.value !== 'all') {

        //     console.log(unchangedUserInt?.foundAdverts?.filter(fa => fa.url.split('/')[2] === e.target.value))

        //     if(unchangedUserInt && unchangedUserInt.foundAdverts) {
        //         unchangedUserInt.foundAdverts = unchangedUserInt?.foundAdverts?.filter(fa => fa.url.split('/')[2] === e.target.value)
        //         console.log(unchangedUserInt)

        //         setShownUserInterest(unchangedUserInt)
        //     }
        // } else {

        // }
    }

    const handleDeleteFoundAd = async (foundAdvert: IFoundAdvert, userInterestId: number) => {

        if(userId) {
        
            await deleteFoundAdvert(foundAdvert, auth0UserInfo.token);
            let newUserInterest = await getUserInterestById(userInterestId, auth0UserInfo.token);
            let oldUserInterest = userInterests.find(ui => ui.id === newUserInterest.id);


            if(oldUserInterest) {
                userInterests.splice(userInterests.indexOf(oldUserInterest), userId);        // * Splice returns array of deleted elements :/

                userInterests.push(newUserInterest)
                setUserInterests(userInterests);
                setShownUserInterest(newUserInterest)
            } else {
                console.log('Error in handleDeleteFoundAd')
            }

            // await deleteFoundAdvert(foundAdvert);        // * Another way of deleting, refetches data from back
            // let newUserInterests: IUserInterest[] = await getAllUserInterestsOfUser(1);     // ! MOCK USER ID !
            // setUserInterests(newUserInterests);     

            // let updatedUserInterest = newUserInterests.find(ui => ui.id === userInterestId)

            // if(updatedUserInterest)
            //     setShownUserInterest(updatedUserInterest)
        } else {
            console.error('UserID e UNDEFINED!')
        }

    }

    // * Car filters handle methods    
    // ! KRSH SE OVIE
    const handleCarYearChange = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        setCarYear(e.currentTarget.value);


        if(e.currentTarget.value !== ''){       // ? Ne e prazno godina poleto

            const godina = parseInt(e.currentTarget.value);

            if(carMileage !== '') {
                const newFoundAds = prevShownAds?.filter(fa => fa.carYear === godina);

                console.log(newFoundAds)

                if(newFoundAds?.length===0){
                    setShownAds([]);
                } else {
                    setShownAds(newFoundAds)
                    setPrevShownAds(newFoundAds)
                }

            } else {
                const newFoundAds = shownUserInterest.foundAdverts?.filter(fa => fa.carYear === godina);

                setShownAds(newFoundAds)
                setPrevShownAds(newFoundAds)
            }
            
        } else {            // ? Prazno e godina poleto

            if(carMileage === '') {
                setShownAds(shownUserInterest.foundAdverts)
                setPrevShownAds(shownUserInterest.foundAdverts)
            }

       
        }
    }

    const handleCarMileageChange = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        setCarMileage(e.currentTarget.value);


        if(e.currentTarget.value !== ''){

            const km = parseInt(e.currentTarget.value);

            if(carYear !== ''){         // ? raboti so prevShownAds
                console.log('KEC')
                console.log(prevShownAds)
                const newFoundAds = prevShownAds?.filter(fa => fa.carMileage <= km);

                console.log(newFoundAds)

                if(newFoundAds?.length===0){
                    setShownAds([]);
                } else {
                    setShownAds(newFoundAds)
                    setPrevShownAds(newFoundAds)
                }
            } else {            // ? raboti so shownUserInterest.foundAdverts
                console.log('DVA')
                const newFoundAds = shownUserInterest.foundAdverts?.filter(fa => fa.carMileage <= km);

                console.log(newFoundAds)
                setShownAds(newFoundAds)
                setPrevShownAds(newFoundAds)
            }

        } else {
            setShownAds(shownUserInterest.foundAdverts)
            setPrevShownAds(shownUserInterest.foundAdverts)
        }
    }

 

    return (
        <>  
            {/* {console.log(userInterests)} */}
            {/* {console.log(shownAds)} */}

            {

                userInterests.length > 0 
                ?
                <>
                    {

                        <>

                            <br/>
                            <br/>
                            <br/>
                            <br/>



                            {/* // * User interests dropdown */}
                            <select onChange={handleShownInterestChange}>
                                {
                                    userInterests.map(ui => {
                                        return <option key={ui.id} value={ui.id}>
                                            {ui.id}, word: {ui.keywords.mainKeyword}, active: {ui.active.toString()}
                                        </option>
                                    })
                                }
                            </select>


                            {/* //* Tools for user interests */}
                            <Link to='/editUserInterest' state={shownUserInterest}>
                                <button>Промени</button>
                            </Link>
                            
                            <button onClick={() => handleSetActiveOnInterest(shownUserInterest)}>Активирај/Деактивирај</button>

                            <select onChange={handleWebsiteChoiceChange}>
                                <option value='all' key='all'>Сите</option>
                                <option value='www.pazar3.mk' key='pazar3'>Пазар 3</option>
                                <option value='reklama5.mk' key='reklama5'>Реклама 5</option>
                            </select>


                            {/* //* Car filters */}
                            { 
                                shownUserInterest.category === 'Avtomobili' ?
                                <CarFiltersInputs handleCarMileageChange={handleCarMileageChange} handleCarYearChange={handleCarYearChange}/> :
                                null
                            }





                            {/* // * Found ads table */}
                            {
                                shownAds ? 
                                shownAds.map(fa => {
                                    return <div key={fa.id}>
                                                <button onClick={() => {
                                                    if(shownUserInterest.id) handleDeleteFoundAd(fa, shownUserInterest.id);
                                                }}>
                                                    X
                                                </button>
                                                {fa.id} {fa.url.split('/')[2]} --- {fa.title}  
                                                --- {fa.carYear}, {fa.carMileage}km
                                            </div>
                                        
                                }) :
                                <> Сеуште нема пронајдени огласи! </>
                            }
                            {/* {
                                shownUserInterest.foundAdverts ? 
                                shownUserInterest.foundAdverts.map(fa => {
                                    return <div key={fa.id}>
                                                <button onClick={() => {
                                                    if(shownUserInterest.id) handleDeleteFoundAd(fa, shownUserInterest.id);
                                                }}>
                                                    X
                                                </button>
                                                {fa.id} {fa.url.split('/')[2]} --- {fa.title}  
                                                --- {fa.carYear}, {fa.carMileage}km
                                            </div>
                                        
                                }) :
                                <> Сеуште нема пронајдени огласи! </>
                            } */}

                        </>
                    }
                </>
                :
                <> Сеуште немате внесено барање! </>
            }

            
            
        </>
    );
}

export default UserInterestsTable;   