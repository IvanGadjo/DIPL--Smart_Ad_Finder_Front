import { FC, useState } from "react";
import { useLocation } from 'react-router-dom';
import { categories, regions } from "../../../utils/categoriesAndRegionsData";
import { editUserInterest } from "../../../utils/restServices/userInterestsService";
import { useNavigate } from "react-router-dom";



const EditUserInterest: FC<{}> = () => {        // ! Pocetni values za kategorija i region treba da se zemaat od userInterest

    const location = useLocation();
    const navigate = useNavigate();                  // * Navigate programatically with react-router v6
    const userInterest: any = location.state;        // * Pass props via <Link> component in react router v6 - via state prop in Link & useLocation() hook in component
    

    const [title, setTitle] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [region, setRegion] = useState<string>('');

    



    const handleTitleChange = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();

        setTitle(e.currentTarget.value);
        // console.log(e.target.value)
    }

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();

        setCategory(e.currentTarget.value);
        // console.log(e.target.value)
    }

    const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();

        setRegion(e.currentTarget.value);
        // console.log(e.target.value)
    }

    const handleBackButtonClick = () => {
        navigate('../', { replace: true });       
    }

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        userInterest.category = category;
        userInterest.region = region;
        userInterest.keywords = {
            mainKeyword: title
        };

        console.log(userInterest);
        await editUserInterest(userInterest, 1);        // ! MOCK USER ID !

        navigate('../', { replace: true });       // * Navigates to '/', you can also pass state
    }

    return (
        <>      

            <h4>Променете го вашето барање:</h4>

            <form onSubmit={handleSubmit}>

                <label>Наслов:</label>
                <input type='text' onChange={handleTitleChange}/>

                <label>Категорија:</label>
                <select onChange={handleCategoryChange}>
                    {
                        categories.map(cat => {
                            return <option value={cat.value} key={cat.value}>{cat.text}</option>
                        })
                    }
                </select>

                <label>Регион:</label>
                <select onChange={handleRegionChange}>
                    {
                        regions.map(reg => {
                            return <option value={reg.value} key={reg.value}>{reg.text}</option>
                        })
                    }
                </select>

                <button type="submit">Зачувај</button>
                <button type="reset">Ресетирај</button>
                <button onClick={()=>{handleBackButtonClick()}}>Назад</button>


            </form>
            
            
        </>
    );
}

export default EditUserInterest;   