import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const getClient = axios.create({
    baseURL: "https://terraresta.com/app/api/"
});

getClient.interceptors.request.use(
    async (config) => {
        config.headers.Accept = "application/json"
        // config.headers["Content-Type"] = "application/x-www-form-urlencoded"
        // config.headers["Content-Length"] = 82
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

// getClient.interceptors.request.use((x) => {
//     const printable = `--Request--\nMethod: ${x.method.toUpperCase()} \nURL: ${
//       x.baseURL
//     }${x.url} \nParams: ${JSON.stringify(
//       x.params,
//       null,
//       2,
//     )} \nData: ${JSON.stringify(x.data, null, 2)}`;
//     console.log(printable);
//     return x;
//   });
  
//   getClient.interceptors.response.use((x) => {
//     const printable = `--Response--\nStatus: ${
//       x.status
//     } \nResponse: ${JSON.stringify(x.data, null, 2)}`;
//     console.log(printable);
//     return x;
//   });

export default getClient;