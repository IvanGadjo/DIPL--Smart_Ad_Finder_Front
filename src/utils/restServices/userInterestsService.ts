import axios, { isAxiosError } from '../axiosConfig';
import { IUserInterest } from '../interfaces';

export const getAllUserInterestsOfUser = async (userId: number) => {

    try {
        let resp = await axios.get(`/api/userInterests/all/byUser/${userId}`);
        console.log(resp.data);

        return resp.data;
    } catch(err) {
        return handleError(err);        // ! Not tested
    }
    
}

export const editUserInterest = async (userInterest:IUserInterest, userId: number) => {
    try {
        let resp = await axios.patch(`/api/userInterests/editUserInterest`, userInterest, {             // * URL params via axiosConfig
            params: {
                userId
            }
        });
        console.log(resp.data);

        return resp.data
    } catch (err) {
        return handleError(err);        // ! Not tested
    }
}

export const createUserInterest = async (newUserInterest:IUserInterest, userId: number) => {
    
    try {
        let resp = await axios.post(`/api/userInterests/createUserInterest?userId=${userId}`, newUserInterest);         // * URL params directly in URL string
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

export const deactivateUserInterest = async (userInterest:IUserInterest, userId: number) => {

    userInterest.active = false;

    try {
        let resp = await axios.patch(`/api/userInterests/editUserInterest`, userInterest, {             // * URL params via axiosConfig
            params: userId
        });
        console.log(resp.data);

        return resp.data
    } catch (err) {
        return handleError(err);        // ! Not tested
    }
}



const handleError = (err: any) => {
    if(isAxiosError(err)) {
        return err.response?.data;
    } else {
        console.log(err)        
        return err;
    }
}