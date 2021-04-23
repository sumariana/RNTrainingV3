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

export const getProfile =() =>{
    return async(dispatch) => {
            try {
            const token = await AsyncStorage.getItem(StorageKey.KEY_ACCESS_TOKEN)
            const userId = await AsyncStorage.getItem(StorageKey.KEY_USER_ID)
            const response = await getClient.get('/ProfileCtrl/ProfileDisplay',{
                params:{
                    access_token: token,
                    user_id: userId
                }
            });
            const data = response.data
            console.log(data)
            dispatch({type: GET_USER_DATA,payload: data})
        } catch (err) {
            getErrorMessage(err);
        }
    }
}

export const deleteAccount =() =>{
    return async(dispatch) => {
            try {
            const token = await AsyncStorage.getItem(StorageKey.KEY_ACCESS_TOKEN)
            const response = await getClient.post('/AccountCtrl/DeleteAccount',{
                params:{
                    access_token: token
                }
            });
            const data = response.data
            return data
        } catch (err) {
            getErrorMessage(err);
        }
    }
}
