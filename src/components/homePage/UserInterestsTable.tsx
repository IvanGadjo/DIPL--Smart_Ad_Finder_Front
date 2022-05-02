import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IUserInterest } from "../../utils/interfaces";
import { setActiveOnUserInterest, getAllUserInterestsOfUser } from '../../utils/restServices/userInterestsService';


interface IProps {
    userInterestsProps: [IUserInterest]
}

const UserInterestsTable: FC<IProps> = ({ userInterestsProps }) => {

    const [userInterests, setUserInterests] = useState(userInterestsProps);


    const handleSetActiveInterest = async (userInterest: IUserInterest) => {
        let newUserInt: IUserInterest;

        if(userInterest.active)
            newUserInt = await setActiveOnUserInterest(userInterest, 1, false);   // ! UserId na logged in user treba da e
        else
            newUserInt = await setActiveOnUserInterest(userInterest, 1, true);    // ! UserId na logged in user treba da e

        console.log(newUserInt)
        

        let newUserInterests = await getAllUserInterestsOfUser(1);     // ! UserId na logged in user treba da e
        setUserInterests(newUserInterests);     // * State change triggers rerender
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
                               

                                {ui.foundAdverts.map(fa => <div key={fa.id}>{fa.id} {fa.title} </div>)}

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