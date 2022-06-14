import axios, { isAxiosError } from '../axiosConfig';
import { IUser } from '../interfaces';


export const createUser = async (newUser:IUser, token: string) => {
    
    try {
        let resp = await axios.post(`/api/users/createUser`, newUser, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });         // * URL params directly in URL string
        console.log(resp.data);

        return resp.data;
    } catch (err) {
        return handleError(err);
    }
}

export const getUserByEmail = async (email:string, token: string) => {
    try {
        let resp = await axios.get(`/api/users/byEmail`, {
            params: {
                email
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });         // * URL params directly in URL string
        
       
        // console.log(resp.data)
        return resp.data;

    } catch (err) {
        return handleError(err);
    }
}









const handleError = (err: any) => {
    if(isAxiosError(err)) {
        console.log('---------- HANDLE AXIOS ERROR -----------');
        console.log(err)
        // @ts-ignore
        // return err.response?.data.message;
        return err.message;

    } else {
        console.log('---------- HANDLE OTHER ERROR -----------');
        console.log(err)        
        return err;
    }
}