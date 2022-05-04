import { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { categories, regions } from "../../utils/categoriesAndRegionsData";




const ActionsPanel: FC<{}> = () => {

    const [category, setCategory] = useState('all');
    const [region, setRegion] = useState('all');
    const [showActiveUserInterests, setShowActiveUserInterests] = useState(true);


    // * These 3 values go into Zustand state or renderUserInterestsInfo context, that decides how userInterests are rendered in Home page

    const handleCategoryChange = (e:any) => {       // * Filter done on backend
        setCategory(e.target.value)

        console.log(category)
    }

    const handleRegionChange = (e:any) => {         // * Filter done on backend
        setRegion(e.target.value)

        console.log(region)

    }

    const handleToggle_activeInterests = () => {        // * Filter done when rendering on front
        if(showActiveUserInterests)
            setShowActiveUserInterests(false);
        else
            setShowActiveUserInterests(true);
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
                <>
                <option value='all'>Сите</option>
                {
                    categories.map(cat => {
                        return <option value={cat.value} key={cat.value}>{cat.text}</option>
                    })
                }
                </>
            </select>

            <br/>
            <br/>

            <label>Филтрирај по регион:</label>
            <select onChange={handleRegionChange}>
                <>
                <option value='all'>Сите</option>
                {
                    regions.map(reg => {
                        return <option value={reg.value} key={reg.value}>{reg.text}</option>
                    })
                }
                </>
            </select>

            <br/>
            <br/>

            <button onClick={() => handleToggle_activeInterests()}>Прикажи активни/неактивни</button>

        </>
    );
}

export default ActionsPanel;   