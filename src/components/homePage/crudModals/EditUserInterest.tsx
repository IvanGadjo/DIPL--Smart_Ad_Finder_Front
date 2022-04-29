import { FC, useState } from "react";
import { useLocation } from 'react-router-dom';
import { categories, regions } from "../../../utils/categoriesAndRegionsData";
import { IUserInterest } from "../../../utils/interfaces";
import { editUserInterest } from "../../../utils/restServices/userInterestsService";



const EditUserInterest: FC<{}> = () => {        // ! Pocetni values za kategorija i region treba da se zemaat od userInterest

    const location = useLocation();
    const userInterest: any = location.state;        // * Pass props via <Link> component in react router v6 - via state in Link & useLocation() hook in component
    

    const [title, setTitle] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [region, setRegion] = useState<string>('');

    



    const handleTitleChange = (e:any) => {
        e.preventDefault();

        setTitle(e.target.value);
        // console.log(e.target.value)
    }

    const handleCategoryChange = (e:any) => {
        e.preventDefault();

        setCategory(e.target.value);
        // console.log(e.target.value)
    }

    const handleRegionChange = (e:any) => {
        e.preventDefault();

        setRegion(e.target.value);
        // console.log(e.target.value)
    }

    const handleSubmit = async (e:any) => {

        e.preventDefault();

        userInterest.category = category;
        userInterest.region = region;
        userInterest.keywords = {
            mainKeyword: title
        };

        console.log(userInterest);
        await editUserInterest(userInterest, 1);
    }

    return (
        <>      

            <h4>Променете го вашиот интерес:</h4>

            <form onSubmit={handleSubmit}>

                <label>Наслов:</label>
                <input type='text' onChange={handleTitleChange}/>

                <label>Категорија:</label>
                <select onChange={handleCategoryChange}>
                    {
                        categories.map(cat => {
                            return <option value={cat.value}>{cat.text}</option>
                        })
                    }
                </select>

                <label>Регион:</label>
                <select onChange={handleRegionChange}>
                    {
                        regions.map(reg => {
                            return <option value={reg.value}>{reg.text}</option>
                        })
                    }
                </select>

                <button type="submit">Зачувај</button>
                <button type="reset">Назад</button>

            </form>
            
            
        </>
    );
}

export default EditUserInterest;   