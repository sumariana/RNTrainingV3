import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const getClient = axios.create({
    baseURL: "https://terraresta.com/app/api/"
});

getClient.interceptors.request.use(
    async (config) => {
        config.headers.Accept = "application/json"
        // const token = await AsyncStorage.getItem(authAction.KEY_ACCESS_TOKEN);
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`
        // }
        return config;
    }, 
    (err) => {
        return Promise.reject(err);
    }
);

export default getClient;