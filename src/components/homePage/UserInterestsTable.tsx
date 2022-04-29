import { FC } from "react";
import { Link } from "react-router-dom";
import { IUserInterest } from "../../utils/interfaces";


interface IProps {
    userInterests: [IUserInterest]
}

const UserInterestsTable: FC<IProps> = ({ userInterests }) => {




    const handleEditInterest = (userInterest: IUserInterest) => {

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

                                <h4 key={ui.id}>id: {ui.id}, word: {ui.keywords.mainKeyword}   
                                    <Link to='/editUserInterest' state={ui}>
                                        <button>Edit</button>
                                    </Link>
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