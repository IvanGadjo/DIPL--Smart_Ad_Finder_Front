import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { IFoundAdvert, IUserInterest } from "../../utils/interfaces";
import { setActiveOnUserInterest, 
         getAllUserInterestsOfUser,
         getUserInterestById } from '../../utils/restServices/userInterestsService';
import { deleteFoundAdvert } from '../../utils/restServices/foundAdvertsService';


interface IProps {
    // userInterestsProps: [IUserInterest]      // * This is a TS tuple
    userInterestsProps: IUserInterest[]         // * This is a TS array

}

const UserInterestsTable: FC<IProps> = ({ userInterestsProps }) => {

    // const [userInterests, setUserInterests] = useState<[IUserInterest]>(userInterestsProps);     // * To trigger rerender you need to update both useStates
    const [userInterests, setUserInterests] = useState(userInterestsProps);
    const [shownUserInterest, setShownUserInterest] = useState<IUserInterest>(userInterests[0]);       


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


        let newUserInterests = await getAllUserInterestsOfUser(1);     // ! UserId na logged in user treba da e


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
            {/* {console.log(userInterests)} */}

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