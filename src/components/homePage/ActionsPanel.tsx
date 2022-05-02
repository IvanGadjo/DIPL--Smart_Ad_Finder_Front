import { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";



const ActionsPanel: FC<{}> = () => {




    return (
        <>
            <Link to='/createUserInterest'>
                <button>Ново барање</button>
            </Link>
        </>
    );
}

export default ActionsPanel;   