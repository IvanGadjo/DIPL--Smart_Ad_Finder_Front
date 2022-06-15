import React, { FC, useState } from "react";
import { categories, regions } from "../../../utils/categoriesAndRegionsData";
import { IUserAdvert } from "../../../utils/interfaces";
import { useNavigate, useLocation } from "react-router-dom";
import { editUserAdvert } from "../../../utils/restServices/userAdvertsService";
import { useUI_ZustandStore } from "../../../utils/zustandStores/userInfoStore";
import shallow from 'zustand/shallow';



const EditUserAdvert: FC<{}> = () => {        

    const [ auth0UserInfo, userId ] = useUI_ZustandStore(state => [state.auth0UserInfo, state.userId], shallow);

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [contactInfo, setContactInfo] = useState<string>('');
    const [image, setImage] = useState<File | undefined>();

    const [category, setCategory] = useState<string>('');
    const [region, setRegion] = useState<string>('');
    

    const navigate = useNavigate(); 
    const location = useLocation();
    const userAdvert: any = location.state;
    



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

    const handleDescriptionChange = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        setDescription(e.currentTarget.value);
    }

    const handlePriceChange = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        setPrice(e.currentTarget.value);
    }

    const handleContactInfoChange = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        setContactInfo(e.currentTarget.value);
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const fileList = e.target.files;
        if (!fileList) return;

        console.log(fileList[0]);
        setImage(fileList[0]);
    }

    const handleBackButtonClick = () => {
        navigate('../advertisments', { replace: true });       
    }

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        if(userId) {

            let userAd:IUserAdvert = {
                id: userAdvert.id,
                isActive: true,
                category,
                region,
                title,
                description,
                price,
                contactInfo
            };

            const frmData = new FormData();

            if(image){
                frmData.append('image', image)
            }

            // await editUserAdvert(userAd, frmData, 1);        // ! MOCK USER ID !
            await editUserAdvert(userAd, frmData, userId, auth0UserInfo.token);


            navigate('../advertisments', { replace: true });     
        } else {
            console.error('UserID e UNDEFINED!')
        }
    }

    return (
        <>      

            <h4>Променете го вашиот оглас:</h4>

            <form onSubmit={handleSubmit}>

                <label>Наслов:</label>
                <input type='text' onChange={handleTitleChange}/>
                <br/>

                <label>Опис:</label>
                <input type='text' onChange={handleDescriptionChange}/>
                <br/>


                <label>Цена:</label>
                <input type='text' onChange={handlePriceChange}/>
                <br/>

                <label>Информации за контакт:</label>
                <input type='text' onChange={handleContactInfoChange}/>
                <br/>

                <label>Слика:</label>
                <input
                    accept="image/*"
                    id="image"
                    name="image"
                    type="file"
                    multiple={false}
                    onChange={handleImageChange}
                />
                <br/>


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

export default EditUserAdvert;   