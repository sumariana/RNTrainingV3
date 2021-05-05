import AsyncStorage from "@react-native-async-storage/async-storage";
import getClient from "../../api/getClient";
import { getErrorMessage,showErrorAlert } from "./commonActions";
import StorageKey from "../../src/constants/StorageKey";
import realm from "../realm";


export const getTalkList =(last_update_time) =>{
    return async(dispatch) => {
            try {
            const token = await AsyncStorage.getItem(StorageKey.KEY_ACCESS_TOKEN)
            const response = await getClient.get('/TalkCtrl/TalkList',{
                params:{
                    access_token: token,
                    last_update_time: last_update_time ? last_update_time : null
                }
            });
            const data = response.data
            if(data.status===1){
                realm.write(()=>{
                    data.items.forEach(item => {
                        const talkId = realm.objectForPrimaryKey("Talklist",item.talkId);
                        if(!talkId){
                            realm.create(
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
                                    time: item.userStatus,
                                    lastUpdateTime: item.lastUpdateTime
                                },
                                "modified"
                            )
                        }
                    });
                })
            }
            return data
        } catch (err) {
            getErrorMessage(err);
        }
    }
}

export const deleteTalkList =(talkListString) =>{
    return async(dispatch) => {
            try {
            const token = await AsyncStorage.getItem(StorageKey.KEY_ACCESS_TOKEN)
            const response = await getClient.delete('/TalkCtrl/Delete',{
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