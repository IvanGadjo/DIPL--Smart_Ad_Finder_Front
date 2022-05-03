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

    // const [userInterests, setUserInterests] = useState<[IUserInterest]>(userInterestsProps);
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

    const handleWebsiteChoiceChange = (e:any) => {
        e.preventDefault();

        console.log(e.target.value)
    }

    const handleDeleteFoundAd = async (foundAdvert: IFoundAdvert, userInterestId: number) => {
        
        await deleteFoundAdvert(foundAdvert);
        let newUserInterest = await getUserInterestById(userInterestId);

        let oldUserInterest = userInterests.find(ui => ui.id === newUserInterest.id);

        if(oldUserInterest) {

            console.log(userInterests);

            let usrInts = userInterests.splice(userInterests.indexOf(oldUserInterest), 1);
            usrInts.push(newUserInterest);
            setUserInterests(usrInts);
        } else {
            console.log('Greska bratmoj')
        }

    }


    return (
        <>

            {

                userInterests.length > 0 
                ?
                <>
                    {
                        // userInterests.map(ui => {
                        //     return <>

                        //         <h4 key={ui.id}>id: {ui.id}, word: {ui.keywords.mainKeyword}, active: {ui.active.toString()}
                        //             <Link to='/editUserInterest' state={ui}>
                        //                 <button>Edit</button>
                        //             </Link>

                                    // <button onClick={() => handleSetActiveInterest(ui)}>Activate/deactivate</button>

                                    // <select onChange={handleWebsiteChoiceChange}>
                                    //     <option value='all' key='all'>Сите</option>
                                    //     <option value='pazar3' key='pazar3'>Пазар 3</option>
                                    //     <option value='reklama5' key='reklama5'>Реклама 5</option>
                                    // </select>
                        //         </h4>
                               

                        //         { 
                        //             ui.foundAdverts ? 
                        //             ui.foundAdverts.map(fa => {
                        //                 return <>
                        //                     <div key={fa.id}>
                        //                         <button onClick={() => {if(ui.id) handleDeleteFoundAd(fa, ui.id);}}>X</button>
                        //                         {fa.id} {fa.url.split('/')[2]} --- {fa.title}  
                        //                     </div>
                        //                 </>
                        //             }) :
                        //             null
                        //         }

                        //     </>
                        // })

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

                            <Link to='/editUserInterest' state={shownUserInterest}>
                                <button>Edit</button>
                            </Link>
                            
                            <button onClick={() => handleSetActiveOnInterest(shownUserInterest)}>Activate/deactivate</button>

                            <select onChange={handleWebsiteChoiceChange}>
                                <option value='all' key='all'>Сите</option>
                                <option value='pazar3' key='pazar3'>Пазар 3</option>
                                <option value='reklama5' key='reklama5'>Реклама 5</option>
                            </select>


                            {/* // * Found ads table */}
                            {
                                shownUserInterest.foundAdverts ? 
                                shownUserInterest.foundAdverts.map(fa => {
                                    return <>
                                            <div key={fa.id}>
                                                <button onClick={() => {if(shownUserInterest.id) handleDeleteFoundAd(fa, shownUserInterest.id);}}>X</button>
                                                {fa.id} {fa.url.split('/')[2]} --- {fa.title}  
                                            </div>
                                        </>
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