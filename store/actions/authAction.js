import AsyncStorage from "@react-native-async-storage/async-storage";
import getClient from "../../api/getClient";
import { getErrorMessage } from "./commonActions";
import StorageKey from "../../constants/StorageKey"

export const GET_USER_DATA = "GET_USER_DATA";

export const login = (email, password) =>{
    return async (dispatch) =>{
        try{
            const response = await getClient.get('/LoginCtrl/Login',{
                params:{
                    login_id: email,
                    password: password,
                    language: "en"
                }
            });
            const data = response.data
            return data
            // await AsyncStorage.setItem(StorageKey.KEY_ACCESS_TOKEN, data.access_token);
        }catch(error){
            getErrorMessage(error)
        }
    }
}