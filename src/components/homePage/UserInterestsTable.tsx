import { FC } from "react";
import { IUserInterest } from "../../utils/interfaces";


interface IProps {
    userInterests: [IUserInterest]
}

const UserInterestsTable: FC<IProps> = ({ userInterests }) => {


    return (
        <>

            {

                userInterests.length > 0 
                ?
                <>
                    {
                        userInterests.map(ui => {
                            return <>
                                <h4 key={ui.id}>id: {ui.id}, word: {ui.keywords?.mainKeyword}</h4>

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