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



    const handleSetActiveInterest = async (userInterest: IUserInterest) => {

        if(userInterest.active)
            await setActiveOnUserInterest(userInterest, 1, false);   // ! UserId na logged in user treba da e
        else
            await setActiveOnUserInterest(userInterest, 1, true);    // ! UserId na logged in user treba da e


        let newUserInterests = await getAllUserInterestsOfUser(1);     // ! UserId na logged in user treba da e
        setUserInterests(newUserInterests);     // * State change triggers rerender
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
                        userInterests.map(ui => {
                            return <>

                                <h4 key={ui.id}>id: {ui.id}, word: {ui.keywords.mainKeyword}, active: {ui.active.toString()}
                                    <Link to='/editUserInterest' state={ui}>
                                        <button>Edit</button>
                                    </Link>

                                    <button onClick={() => handleSetActiveInterest(ui)}>Activate/deactivate</button>
                                </h4>
                               

                                { 
                                    ui.foundAdverts ? 
                                    ui.foundAdverts.map(fa => {
                                        return <>
                                            <div key={fa.id}>
                                                <button onClick={() => {if(ui.id) handleDeleteFoundAd(fa, ui.id);}}>X</button>
                                                {fa.id} {fa.title} 
                                            </div>
                                        </>
                                    }) :
                                    null
                                }

                            </>
                        })
                    }
                </>
                :
                <> Сеуште немате внесено барање! </>
            }

            
            
        </>
    );
}

export default UserInterestsTable;   