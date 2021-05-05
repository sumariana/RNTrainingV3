import AsyncStorage from "@react-native-async-storage/async-storage";
import getClient from "../../api/getClient";
import { getErrorMessage,showErrorAlert } from "./commonActions";
import StorageKey from "../../src/constants/StorageKey";
import axios from "axios";

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

export const getProfile =(userId) =>{
    return async(dispatch) => {
            try {
            const token = await AsyncStorage.getItem(StorageKey.KEY_ACCESS_TOKEN)
            const response = await getClient.get('/ProfileCtrl/ProfileDisplay',{
                params:{
                    access_token: token,
                    user_id: userId
                }
            });
            const data = response.data
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
            const response = await getClient.delete('/AccountCtrl/DeleteAccount',{
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

const createFormData = (photo) => {
    const data = new FormData();
    data.append('data', {
        name: 'photo.jpg',
        uri: Platform.OS === 'android' ? photo : photo.replace('file://', ''),
        type: 'image/jpeg'
    });
    //data.append('_method','POST')

    return data;
};

export const uploadImageData = (imageData) =>{
    return async(dispatch)=>{
        try{
            const formData = createFormData(imageData)
            const token = await AsyncStorage.getItem(StorageKey.KEY_ACCESS_TOKEN);
            const userId = await AsyncStorage.getItem(StorageKey.KEY_USER_ID)
            const response = await axios.post('https://terraresta.com/app/api/MediaCtrl/ImageUpload',formData,{
                params:{
                    access_token: token,
                    location: 'Profile'
                },
            });
            if(response.data.status===1){
                const profilResponse = await getClient.get('/ProfileCtrl/ProfileDisplay',{
                    params:{
                        access_token: token,
                        user_id: userId
                    }
                });
                const data = profilResponse.data
                dispatch({type: GET_USER_DATA,payload: data})
            }else{
                showErrorAlert("upload image is failed !")
            }
        }catch(err){
            getErrorMessage(err);
        }
    }
}

export const editProfile = (formData) =>{
    return async (dispatch) =>{
        try{
            const queryString= require('query-string')
            const token = await AsyncStorage.getItem(StorageKey.KEY_ACCESS_TOKEN);
            const response = await getClient.post(`/ProfileCtrl/ProfileEdit?access_token=${token}`,queryString.stringify({
                nickname: formData.username,
                birthday: formData.birthday,
                residence: formData.area,
                gender: formData.sex,
                job: formData.occupation,
                personality: formData.character,
                hobby: formData.hobby,
                about_me: formData.freeword,
                image_id: formData.image_id,
                language: "en"
            }));
            const data = response.data
            return data
        }catch(error){
            getErrorMessage(error)
        }
    }
}
