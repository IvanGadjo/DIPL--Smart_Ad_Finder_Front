import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IFoundAdvert, IUserInterest } from "../../utils/interfaces";
import { setActiveOnUserInterest, 
         getAllUserInterestsOfUser,
         getUserInterestById } from '../../utils/restServices/userInterestsService';
import { deleteFoundAdvert } from '../../utils/restServices/foundAdvertsService';
import { useUI_ZustandStore } from '../../utils/zustandStores/userInterestsStore';
import shallow from 'zustand/shallow';



interface IProps {
    // userInterestsProps: [IUserInterest]      // * This is a TS tuple
    userInterests: IUserInterest[],         // * This is a TS array
    setUserInterests: (userInterests: IUserInterest[]) => void
}

const UserInterestsTable: FC<IProps> = ({ userInterests, setUserInterests }) => {

    // const [shownUserInterest, setShownUserInterest] = useState<IUserInterest>(userInterests[0]);

    const [ shownUserInterest, setShownUserInterest ] = useUI_ZustandStore(state => [state.shownUserInterest, state.setShownUserInterest], shallow);


    // useEffect(() => {                       // ! Treba shownUserInt da e vo global state mesto vaka da se updejta
    //     // console.log(userInterests)
    //     if(userInterests.length !== 0){     // ! Ova napravi go nekako so druga logika da se desava
    //         // console.log(shownUserInterest)
    //         // setShownUserInterest(userInterests[0])

    //     }
    //     else setShownUserInterest({
    //         active: true,
    //         category: '',
    //         keywords: {
    //             mainKeyword: ''
    //         },
    //         region: '',
    //     })
    // },[userInterests])


    const handleShownInterestChange = async (e:any) => {
        const ui = userInterests.find(ui => ui.id === parseInt(e.target.value));
            
        if(ui)
            setShownUserInterest(ui);
        else console.log('Error in handleShownInterestChange()')            
    } 

    const handleSetActiveOnInterest = async (userInterest: IUserInterest) => {

        if(userInterest.active)
            await setActiveOnUserInterest(userInterest, 1, false);   // ! UserId na logged in user treba da e
        else
            await setActiveOnUserInterest(userInterest, 1, true);    // ! UserId na logged in user treba da e


        let newUserInterests: IUserInterest[] = await getAllUserInterestsOfUser(1);     // ! UserId na logged in user treba da e

        newUserInterests.sort((prev, next) => {       // * Sort userInterests by id and then show them in dropdown
            if(prev.id && next.id){
                if(prev.id > next.id) 
                    return 1
                else  return -1
            }
            else return 1
        })


        setUserInterests(newUserInterests);     // * State change triggers rerender
    }


    // ! Ovie 2 metoda podole ke bide mn polesno da se rabotat ako imas samo use eden usestate so shownFoundAds
    const handleWebsiteChoiceChange = (e:any) => {
        e.preventDefault();

        // * Sredi da e funkcionalno posle UI design

        // console.log(e.target.value)

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
        
        await deleteFoundAdvert(foundAdvert);
        let newUserInterest = await getUserInterestById(userInterestId);
        let oldUserInterest = userInterests.find(ui => ui.id === newUserInterest.id);


        if(oldUserInterest) {
            userInterests.splice(userInterests.indexOf(oldUserInterest), 1);        // * Splice returns array of deleted elements :/

            userInterests.push(newUserInterest)
            setUserInterests(userInterests);
            setShownUserInterest(newUserInterest)
        } else {
            console.log('Error in handleDeleteFoundAd')
        }

        // await deleteFoundAdvert(foundAdvert);        // * Another way of deleting, refetches data from back
        // let newUserInterests: IUserInterest[] = await getAllUserInterestsOfUser(1);     // ! UserId na logged in user treba da e
        // setUserInterests(newUserInterests);     

        // let updatedUserInterest = newUserInterests.find(ui => ui.id === userInterestId)

        // if(updatedUserInterest)
        //     setShownUserInterest(updatedUserInterest)

    }


    return (
        <>  
            {console.log(userInterests)}

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

                            {/* //* Tools for user interest */}
                            <Link to='/editUserInterest' state={shownUserInterest}>
                                <button>Edit</button>
                            </Link>
                            
                            <button onClick={() => handleSetActiveOnInterest(shownUserInterest)}>Activate/deactivate</button>

                            <select onChange={handleWebsiteChoiceChange}>
                                <option value='all' key='all'>Сите</option>
                                <option value='www.pazar3.mk' key='pazar3'>Пазар 3</option>
                                <option value='reklama5.mk' key='reklama5'>Реклама 5</option>
                            </select>





                            {/* // * Found ads table */}
                            {
                                shownUserInterest.foundAdverts ? 
                                shownUserInterest.foundAdverts.map(fa => {
                                    return <div key={fa.id}>
                                                <button onClick={() => {
                                                    if(shownUserInterest.id) handleDeleteFoundAd(fa, shownUserInterest.id);
                                                }}>
                                                    X
                                                </button>
                                                {fa.id} {fa.url.split('/')[2]} --- {fa.title}  
                                            </div>
                                        
                                }) :
                                <> Сеуште нема пронајдени огласи! </>
                            }

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