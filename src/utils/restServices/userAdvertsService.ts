import axios, { isAxiosError } from '../axiosConfig';
import { IUserAdvert } from '../interfaces';


export const getAllAdverts = async () => {

    try {
        let resp = await axios.get(`/api/userAdverts/all`);
        // console.log(resp.data);

        let sortedAdverts = resp.data.sort((prev: IUserAdvert, next: IUserAdvert) => {       // * Sort userInterests by id and then show them in dropdown

            if(prev.id && next.id){
                if(prev.id > next.id) 
                    return 1
                else  return -1
            }
            else return 1
            
        })

        // console.log(sortedAdverts);
        return sortedAdverts;
    } catch(err) {
        return handleError(err);
    }
}

export const getAllAdvertsByUserId = async (userId: number, token: string) => {

    try {
        let resp = await axios.get(`/api/userAdverts/all/byUser/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        // console.log(resp.data);

        let sortedAdverts = resp.data.sort((prev: IUserAdvert, next: IUserAdvert) => {       // * Sort userInterests by id and then show them in dropdown

            if(prev.id && next.id){
                if(prev.id > next.id) 
                    return 1
                else  return -1
            }
            else return 1
            
        })

        // console.log(sortedAdverts);
        return sortedAdverts;
    } catch(err) {
        return handleError(err);
    }
}

export const createUserAdvert = async (newAd:IUserAdvert, formData: FormData, userId: number, token: string) => {
    
    try {
        let resp = await axios.post(`/api/userAdverts/createUserAdvert?userId=${userId}`, formData, {
            params: {
                isActive: true,
                category: newAd.category,
                region: newAd.region,
                title: newAd.title,
                description: newAd.description,
                price: newAd.price,
                contactInfo: newAd.contactInfo
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });         

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


export const editUserAdvert = async (userAdvert: IUserAdvert, formData: FormData, userId: number, token: string) => {
    
    console.log(formData.get("image"));

    try {
        let resp = await axios.patch(`/api/userAdverts/editUserAdvert?userId=${userId}`, formData, {
            params: {
                id: userAdvert.id,
                isActive: true,
                category: userAdvert.category,
                region: userAdvert.region,
                title: userAdvert.title,
                description: userAdvert.description,
                price: userAdvert.price,
                contactInfo: userAdvert.contactInfo
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });         

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


export const setActiveOnUserAdvert = async (userAdvert: IUserAdvert, userId: number, isActive: boolean, token: string) => {

    userAdvert.isActive = isActive;

    try {

        let resp = await axios.patch(`/api/userAdverts/setIsActive`, userAdvert, {
            params: {
                userId
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // console.log(resp.data);

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
        return err.message;
    } else {
        console.log('---------- HANDLE OTHER ERROR -----------');
        console.log(err)        
        return err;
    }
}