import { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { categories, regions } from "../../utils/categoriesAndRegionsData";




const ActionsPanel: FC<{}> = () => {

    // ! Prvive 2 treba da bidat isto kao u intel proekt - so onefilterqueries, twofilterqueries ...
    

    const handleCategoryChange = () => {

    }

    const handleRegionChange = () => {

    }

    const handleToggle_activeNotActiveInterests = () => {

    }


    return (
        <>
            <Link to='/createUserInterest'>
                <button>Ново барање</button>
            </Link>

            <br/>
            <br/>

            <label>Филтрирај по категорија:</label>
            <select onChange={handleCategoryChange}>
                {
                    categories.map(cat => {
                        return <option value={cat.value} key={cat.value}>{cat.text}</option>
                    })
                }
            </select>

            <br/>
            <br/>

            <label>Филтрирај по регион:</label>
            <select onChange={handleRegionChange}>
                {
                    regions.map(reg => {
                        return <option value={reg.value} key={reg.value}>{reg.text}</option>
                    })
                }
            </select>

            <br/>
            <br/>

            <button onClick={() => {}}>Прикажи активни/неактивни</button>

        </>
    );
}

export default ActionsPanel;   