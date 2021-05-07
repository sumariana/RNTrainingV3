import AsyncStorage from "@react-native-async-storage/async-storage";
import getClient from "../../api/getClient";
import { getErrorMessage,showErrorAlert } from "./commonActions";
import StorageKey from "../../src/constants/StorageKey";
import realm from "../realm";

export const getTalk = (userId,borderId,howtoRequest)=>{
    return async(dispatch)=>{
        try{
            const token = await AsyncStorage.getItem(StorageKey.KEY_ACCESS_TOKEN)
            const response = await getClient.get('TalkCtrl/Talk',{
                params:{
                    access_token: token,
                    to_user_id:userId,
                    border_message_id:borderId,
                    how_to_request:howtoRequest
                }
            });
            const data = response.data
            // if(data.status===1){

            // }
            return data
        }catch(err){
            getErrorMessage(err)
        }
    }
}

export const sendMessage = (message,userId)=>{
    return async(dispatch)=>{
        try{
            const queryString= require('query-string')
            const token = await AsyncStorage.getItem(StorageKey.KEY_ACCESS_TOKEN)
            const response = await getClient.post(`TalkCtrl/SendMessage?access_token=${token}&to_user_id=${userId}`,queryString.stringify({
                message: message
            }));
            const data = response.data
            return data
        }catch(err){
            getErrorMessage(err)
        }
    }
}

export const getTalkList =(last_update_time) =>{
    return async(dispatch) => {
            try {
            const token = await AsyncStorage.getItem(StorageKey.KEY_ACCESS_TOKEN)
            const response = await getClient.get('TalkCtrl/TalkList',{
                params:{
                    access_token: token,
                    last_update_time: last_update_time ? last_update_time : null
                }
            });
            const data = response.data
            if(data.status===1){
                realm.write(()=>{
                    data.items.forEach(item => {
                        const task = realm.create(
                            "Talklist",
                            {
                                talkId: item.talkId,
                                toUserId: item.toUserId,
                                messageId: item.messageId,
                                userId: item.userId,
                                nickname: item.nickname,
                                imageId: item.imageId,
                                imageSize: item.imageSize,
                                imageUrl: item.imageUrl,
                                message: item.message,
                                mediaType: item.mediaType,
                                userStatus: item.userStatus,
                                time: item.time,
                                lastUpdateTime: item.lastUpdateTime
                            }
                        )
                        console.log(`create 1`)
                        console.log(`create ${task}`)
                    });
                })
                const list = realm.objects("Talklist")
                console.log(`here list 1`)
                console.log(`here list ${list}`)
            }
            return data
        } catch (err) {
            //getErrorMessage(err);
        }
    }
}

export const deleteTalkList =(talkListString) =>{
    return async(dispatch) => {
            try {
            const token = await AsyncStorage.getItem(StorageKey.KEY_ACCESS_TOKEN)
            const response = await getClient.delete('TalkCtrl/Delete',{
                params:{
                    access_token: token,
                    talk_ids: talkListString
                }
            });
            const data = response.data
            return data
        } catch (err) {
            getErrorMessage(err);
        }
    }
}