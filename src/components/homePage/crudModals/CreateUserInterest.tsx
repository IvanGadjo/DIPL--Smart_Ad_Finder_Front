import React, { FC, useState } from "react";
import { categories, regions } from "../../../utils/categoriesAndRegionsData";
import { createUserInterest } from "../../../utils/restServices/userInterestsService";
import { IUserInterest } from "../../../utils/interfaces";
import { useNavigate } from "react-router-dom";
import { useUI_ZustandStore } from "../../../utils/zustandStores/userInfoStore";
import shallow from 'zustand/shallow';




const CreateUserInterest: FC<{}> = () => {        

    const [ auth0UserInfo, userId ] = useUI_ZustandStore(state => [state.auth0UserInfo, state.userId], shallow);



    const [title, setTitle] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [region, setRegion] = useState<string>('');

    const navigate = useNavigate(); 
    

    const handleTitleChange = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();

        setTitle(e.currentTarget.value)
    }

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();

        setCategory(e.currentTarget.value);
    }

    const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();

        setRegion(e.currentTarget.value);

    }

    const handleBackButtonClick = () => {
        navigate('../home', { replace: true });       

    }

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        if(userId) {

            let userInterest:IUserInterest = {
                active: true,
                category,
                region,
                keywords: {
                    mainKeyword: title
                },
            };

            // console.log(userInterest);
            
            await createUserInterest(userInterest, userId, auth0UserInfo.token);

            navigate('../home', { replace: true });       // * Navigates to '/home', you can also pass state
        } else {
            console.error('UserID e UNDEFINED!')
        }
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
                <button type="reset">Ресетирај</button>
                <button onClick={()=>{handleBackButtonClick()}}>Назад</button>


            </form>
            
            
        </>
    );
}

export default CreateUserInterest;   