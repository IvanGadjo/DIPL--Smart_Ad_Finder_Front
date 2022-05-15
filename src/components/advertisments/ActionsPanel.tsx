import { FC } from "react";
import { Link } from "react-router-dom";





const ActionsPanel: FC<{}> = () => {


    const handleToggle_advertsShownType = () => {

    }

    return (
        <>
            <Link to='/createUserAdvert'>
                <button>Ново барање</button>
            </Link>

            <br/>
            <br/>


            <button onClick={() => handleToggle_advertsShownType()}>Прикажи мои/останати</button>

        </>
    );
}

export default ActionsPanel;   