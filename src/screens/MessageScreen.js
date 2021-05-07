import React,{useState,useEffect,useCallback} from 'react';
import { StyleSheet, View, Text,Image,ScrollView,SafeAreaView,TouchableOpacity,FlatList,Alert } from 'react-native';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import CustomButton from '../components/CustomButton';
import SpacerTop from '../components/SpacerTop';
import {Icon} from 'react-native-elements';
import Colors from '../constants/Colors';
import CustomToolbar from '../components/CustomToolbar';
import TalkListItem from '../components/TalkListItem';
import { useDispatch } from 'react-redux';
import * as talkAction from '../../store/actions/talkAction';
import * as commonActions from '../../store/actions/commonActions';
import realm from '../../store/realm';
import StorageKey from '../constants/StorageKey';
import AsyncStorage from "@react-native-async-storage/async-storage";


const MessageScreen = props =>{
    const dispatch = useDispatch();
    const [actionTitle,setActionTitle] = useState('Edit');
    const [editMode,setEditMode] = useState(false);
    const [talkList,setTalkList] = useState([]);
    const [deleteList,setDeleteList] = useState([]);
    const [lastUpdateTime, setLastUpdateTime] = useState(null);

    // const loadTalkListFromRealm = useCallback(async()=>{
    //     try{
    //         const userId = await AsyncStorage.getItem(StorageKey.KEY_USER_ID)
    //         const userIdInt = parseInt(userId)
    //         const realmTalkData = realm.objects("Talklist");
    //         console.log(`userid ${userIdInt}`)
    //         console.log(`this is realm data ${realmTalkData}`)
    //         //setTalkList(realmTalkData)
    //     }catch(err){
    //         commonActions.showErrorAlert(err.message)
    //     }
    // })

    // useEffect(()=>{
    //     loadTalkListFromRealm()
    // },[])

    const enterEditMode = () =>{
        if(!editMode){
            setActionTitle('Cancel')
            setEditMode(true)
        }else{
            if(deleteList.length>0){
                Alert.alert( "Confirmation", "Are you sure want to cancel?", [
                    {
                        text:"Cancel"
                    },
                    { 
                        text: "OK",
                        onPress:()=>{
                            setDeleteList([])
                            setActionTitle('Edit')
                            setEditMode(false)  
                        }
                    }
                ]);
            }else{
                setDeleteList([])
                setActionTitle('Edit')
                setEditMode(false)
            }
        }
    };

    useEffect(()=>{
        loadTalkList()
    },[])

    useEffect(()=>{
        realm.addListener('change',()=>{
            loadTalkList
        })
    },[])

    useEffect(()=>{
        const willFocusSub = props.navigation.addListener(
            'willFocus',
            ()=>{
                setLastUpdateTime(null)
                setDeleteList([])
                setEditMode(false)
                setActionTitle('Edit')
                loadTalkList()
            }
          );
          return () => {
            willFocusSub.remove();
          };
    },[setTalkList,loadTalkList,setEditMode,setDeleteList,setActionTitle])

    const loadTalkList = useCallback(async()=>{
        try{
            const response = await dispatch(talkAction.getTalkList(lastUpdateTime))
            if(response.status===1){
                //also save in realm
                setTalkList(response.items)
                //setLastUpdateTime(response.items[response.items.length-1].lastUpdateTime)
            }
        }catch(err){
            //commonActions.showErrorAlert(err.message)
        }
    },[])

    const doDeleteTaskList = async()=>{
        try{
            var deleteListString = ''
            for(var x in deleteList){
                deleteListString += deleteList[x]+","
            }
            const response = await dispatch(talkAction.deleteTalkList(deleteListString))
            if(response.status===1){
                //also delete in realm
                setLastUpdateTime(null)
                setDeleteList([])
                setEditMode(false)
                setActionTitle('Edit')
                loadTalkList()
            }
        }catch(err){
            commonActions.showErrorAlert(err.message)
        }
    }

    const checkedChangeHandler = useCallback((messageId)=>{
        console.log('her1')
        console.log(messageId)
        if(deleteList.includes(messageId)){
            console.log('her2')
            //already in list
            const array = [...deleteList]
            var index = array.indexOf(messageId)
            if(index!==-1){
                array.splice(index,1)
                setDeleteList(array)
            }
        }else{
            console.log('her3')
            //not in list
            setDeleteList([...deleteList,messageId])
        }
    },[deleteList])

    return (
        <SafeAreaView style={styles.container}>
             <FocusAwareStatusBar
                barStyle='dark-content'
                backgroundColor='white' />
                 <CustomToolbar>
                    <Text style={styles.title}>TrainingApps</Text>
                    {talkList.length>0 && <TouchableOpacity
                        style={styles.actionContainer}
                        onPress={()=>{
                            enterEditMode()
                        }}>
                        <Text style={styles.actionText}>{actionTitle}</Text>
                    </TouchableOpacity>}
                </CustomToolbar>
                <FlatList
                data={talkList}
                keyExtractor={item=> item.talkId.toString()}
                renderItem={(itemData)=>(
                    <TalkListItem
                    id = {itemData.item.talkId}
                    name = {itemData.item.nickname}
                    message = {itemData.item.message}
                    editMode = {editMode}
                    image = {itemData.item.imageUrl}
                    checked = {deleteList.includes(itemData.item.talkId)}
                    onCheckedChange = {checkedChangeHandler}
                    open={()=>{
                        props.navigation.navigate('chatRoom',{
                            userId: itemData.item.toUserId,
                            name: itemData.item.nickname,
                            image: itemData.item.imageUrl
                        })
                    }}
                    />
                )}
                />
                {editMode && <View style={{padding:20,backgroundColor:'transparent'}}>
                <CustomButton
                    title="Delete"
                    containerStyle={{backgroundColor:'transparent'}}
                    buttonStyle={{borderWidth: 1,padding:15,borderColor:'red',backgroundColor:'red'}}
                    titleStyle={{color:'white',fontFamily:'rubik-bold'}}
                    onPress={doDeleteTaskList}
                    />
                </View>}
        </SafeAreaView>
    );
};

MessageScreen.navigationOptions={
    title: 'Message',
    tabBarIcon: ({ tintColor }) => <Icon type='material' name='chat' color={tintColor} />
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        marginTop: Platform.OS == 'ios' ? StatusBar.currentHeight : 0
    },
    title:{
        fontFamily: 'rubik-bold',
        fontSize: 20,
        alignSelf: 'center',
        color: 'black'
    },
    actionContainer:{
        position: 'absolute',
        alignSelf: 'flex-end',
        right: 8,
        padding: 8
    },
    actionText:{
        fontFamily: 'rubik-bold',
        fontSize: 14,
        color: Colors.primary
    }
})

export default MessageScreen;
