import axios, { isAxiosError } from '../axiosConfig';
import { IFoundAdvert } from '../interfaces';


export const getAllAdverts = async () => {

    try {
        let resp = await axios.delete(`/api/userAdverts/all`);
        return resp.data;
    } catch(err) {
        return handleError(err);        // ! Not tested
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