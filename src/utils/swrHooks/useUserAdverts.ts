import useSWR from 'swr';
import { getAllAdverts } from '../restServices/userAdvertsService';


export const useUserAdverts = () => {
    const { data, error, mutate } = useSWR('getAllAdverts', getAllAdverts); 
  
    const allAdverts = data || []
    const isLoadingData = !data
    const setAdverts = mutate
  
    return { allAdverts, setAdverts, error, isLoadingData };
  };