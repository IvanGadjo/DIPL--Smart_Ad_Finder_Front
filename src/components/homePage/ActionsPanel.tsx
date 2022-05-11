import { FC } from "react";
import { Link } from "react-router-dom";
import { categories, regions } from "../../utils/categoriesAndRegionsData";
import { useZustandStore } from "../../utils/zustandStores/renderUserInterestsInfoStore";
import shallow from 'zustand/shallow';



const ActionsPanel: FC<{}> = () => {

    const [ setCategory, 
            setRegion, 
            setShowActiveUserInterests,
            showActiveUserInterests] = useZustandStore(state => [state.setCategory, state.setRegion, state.setShowActiveUserInterests, state.showActiveUserInterests], shallow)


    // * These 3 values go into Zustand state / renderUserInterestsInfo context, that decides how userInterests are rendered in Home page
    // * Now I work with Zustand state

    const handleCategoryChange = (e:any) => {       // * Filter done on backend
        setCategory(e.target.value);
    }

    const handleRegionChange = (e:any) => {         // * Filter done on backend
        setRegion(e.target.value)
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