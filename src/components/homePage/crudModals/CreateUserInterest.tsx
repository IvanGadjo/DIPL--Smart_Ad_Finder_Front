import { FC, useState } from "react";
import { categories, regions } from "../../../utils/categoriesAndRegionsData";
import { createUserInterest } from "../../../utils/restServices/userInterestsService";
import { IUserInterest } from "../../../utils/interfaces";
import { useNavigate } from "react-router-dom";




const CreateUserInterest: FC<{}> = () => {        

    const [title, setTitle] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [region, setRegion] = useState<string>('');

    const navigate = useNavigate(); 
    

    const handleTitleChange = (e:any) => {
        e.preventDefault();

        setTitle(e.target.value);
    }

    const handleCategoryChange = (e:any) => {
        e.preventDefault();

        setCategory(e.target.value);
    }

    const handleRegionChange = (e:any) => {
        e.preventDefault();

        setRegion(e.target.value);
    }

    const handleSubmit = async (e:any) => {

        e.preventDefault();

        let userInterest:IUserInterest = {
            active: true,
            category,
            region,
            keywords: {
                mainKeyword: title
            },
        };

        console.log(userInterest);
        await createUserInterest(userInterest, 1);        // ! UserId na logged in user treba da e

        navigate('../', { replace: true });       // * Navigates to '/', you can also pass state
    }

    return (
        <>      

            <h4>Додади ново барање:</h4>

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
                <button type="reset">Назад</button>

            </form>
            
            
        </>
    );
}

export default CreateUserInterest;   