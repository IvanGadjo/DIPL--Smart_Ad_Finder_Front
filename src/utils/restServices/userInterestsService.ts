import axios, { isAxiosError } from '../axiosConfig';
import { IUserInterest } from '../interfaces';

export const getAllUserInterestsOfUser = async (userId: number) => {

    try {
        let resp = await axios.get(`/api/userInterests/all/byUser/${userId}`);
        // console.log(resp.data);

        return resp.data;
    } catch(err) {
        return handleError(err);        // ! Not tested
    }
    
}

export const getAllUserInterestsOfUserByCategory = async (category: string, userId: number) => {

    try {
        let resp = await axios.get(`/api/userInterests/byCategory/byUser`, {
            params: {
                category,
                userId
            }
        });
        // console.log(resp.data);

        return resp.data;
    } catch(err) {
        return handleError(err);        // ! Not tested
    }
    
}

export const getAllUserInterestsOfUserByRegion = async (region: string, userId: number) => {

    try {
        let resp = await axios.get(`/api/userInterests/byRegion/byUser`, {
            params: {
                region,
                userId
            }
        });
        // console.log(resp.data);

        return resp.data;
    } catch(err) {
        return handleError(err);        // ! Not tested
    }
    
}

export const getAllUserInterestsOfUserByCatrgoryAndRegion = async (category: string, region: string, userId: number) => {

    try {
        let resp = await axios.get(`/api/userInterests/byCategoryAndRegion/byUser`, {
            params: {
                category,
                region,
                userId
            }
        });
        // console.log(resp.data);

        return resp.data;
    } catch(err) {
        return handleError(err);        // ! Not tested
    }
    
}

export const getUserInterestById = async (userInterestId: number) => {
    try {
        let resp = await axios.get(`/api/userInterests/${userInterestId}`);
        // console.log(resp.data);

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

export const setActiveOnUserInterest = async (userInterest:IUserInterest, userId: number, active: boolean) => {

    userInterest.active = active;

    try {
        let resp = await axios.patch(`/api/userInterests/editUserInterest`, userInterest, {
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