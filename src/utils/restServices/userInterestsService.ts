import axios, { isAxiosError } from '../axiosConfig';

export const getAllUserInterestsOfUser = async (userId: number) => {

    try {
        let resp = await axios.get(`/api/userInterests/all/byUser/${userId}`);
        console.log(resp.data);

        return resp.data
    } catch(err) {
        if(isAxiosError(err)) {
            return err.response?.data;
        } else {
            console.log(err)        // ! Not tested
            return err;
        }
    }
    
}