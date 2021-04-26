import AsyncStorage from "@react-native-async-storage/async-storage";
import getClient from "../../api/getClient";
import { getErrorMessage,showErrorAlert } from "./commonActions";
import StorageKey from "../../src/constants/StorageKey";

export const getFeed =(lastLoginTime) =>{
    return async(dispatch) => {
            try {
            const token = await AsyncStorage.getItem(StorageKey.KEY_ACCESS_TOKEN)
            const response = await getClient.get('/ProfileFeedCtrl/ProfileFeed',{
                params:{
                    access_token: token,
                    last_login_time: lastLoginTime ? lastLoginTime : null
                }
            });
            const data = response.data
            return data
        } catch (err) {
            getErrorMessage(err);
        }
    }
}