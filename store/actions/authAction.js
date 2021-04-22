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
        }catch(error){
            getErrorMessage(error)
        }
    }
}

export const register = (formData) =>{
    return async (dispatch) =>{
        try{
            const response = await getClient.get('/SignUpCtrl/SignUp',{
                params:{
                    login_id: formData.email,
                    password: formData.password,
                    nickname: formData.username,
                    language: "en"
                }
            });
            const data = response.data
            return data
        }catch(error){
            getErrorMessage(error)
        }
    }
}