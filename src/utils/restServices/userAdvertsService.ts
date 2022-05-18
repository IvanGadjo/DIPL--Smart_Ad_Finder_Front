import axios, { isAxiosError } from '../axiosConfig';
import { IUserAdvert } from '../interfaces';


export const getAllAdverts = async () => {

    try {
        let resp = await axios.get(`/api/userAdverts/all`);
        console.log(resp.data);
        return resp.data;
    } catch(err) {
        return handleError(err);
    }
}



export const createUserAdvert = async (newAd:IUserAdvert, formData: FormData, userId: number) => {
    
    try {
        let resp = await axios.post(`/api/userAdverts/createUserAdvert?userId=${userId}`, formData, {
            params: {
                isActive: true,
                category: newAd.category,
                region: newAd.region,
                title: newAd.title,
                description: newAd.description,
                price: newAd.price,
            }
        });         // * URL params directly in URL string
        console.log(resp.data);

        return resp.data;
    } catch (err) {
        if(isAxiosError(err)) {             // ! Posle testiranje samo povikaj handleError()
            return err.response?.data;
        } else {
            console.log(err)        // ! Not tested
            return err;
        }
    }
}


const handleError = (err: any) => {
    if(isAxiosError(err)) {
        console.log('---------- HANDLE AXIOS ERROR -----------');
        console.log(err)
        // @ts-ignore
        return err.response?.data.message;
    } else {
        console.log('---------- HANDLE OTHER ERROR -----------');
        console.log(err)        
        return err;
    }
}