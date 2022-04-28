import axios from 'axios';

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL as string}`,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});

// * From TS version 4 and the error in catch phrase is undefined and we must check the if the type is an axios error
export const isAxiosError = axios.isAxiosError;

export default instance;
