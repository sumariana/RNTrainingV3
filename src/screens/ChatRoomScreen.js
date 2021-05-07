import React,{useState,useEffect,useCallback,useRef} from 'react';
import {View, StyleSheet,FlatList,Text,TextInput} from 'react-native';
import {Icon,Image} from 'react-native-elements';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import CustomToolbar from '../components/CustomToolbar';
import SpacerVertical from '../components/SpacerVertical';
import CustomButton from '../components/CustomButton';
import Colors from '../constants/Colors'
import ChatItem from '../components/ChatItem';
import { useDispatch, useSelector } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import BottomSheet from 'reanimated-bottom-sheet';
import Modal from 'react-native-modal';
import { check, checkMultiple, PERMISSIONS, request, requestMultiple, RESULTS } from 'react-native-permissions';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import SpacerTop from '../components/SpacerTop';
import * as commonActions from '../../store/actions/commonActions';
import * as talkActions from '../../store/actions/talkAction';

const CAMERA = 123;
const GALERY = 321;
const SHEET_HEIGHT = 150;

const ChatRoomScreen = props =>{
    const dispatch = useDispatch()
    const sheetRef = useRef(null);
    const userId = props.navigation.getParam('userId')
    const image = props.navigation.getParam('image')
    const name = props.navigation.getParam('name')
    const [talkList,setTalkList] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const [chatText,setChatText]=useState("")
    const [borderId,setBorderId]=useState(0)
    const [howToRequest,setHowToRequest]=useState(0)

    const bottomSheetComponent = () => (
        <Modal
            isVisible={modalVisible}
            swipeDirection="down"
            onSwipeComplete={() => showHideSheet()}
            style={{ margin: 0, justifyContent: 'flex-end' }}
            onBackdropPress={() => showHideSheet()}>
            <View
                style={{
                    height: SHEET_HEIGHT,
                    paddingTop: 16,
                    paddingBottom:16,
                    backgroundColor: 'white',
                }}>
                    <View
                    style={{flex:1,marginHorizontal:20}}
                    >
                        <CustomButton
                    title={"Gallery"}
                    type='outline'
                    buttonStyle={{padding:15,borderWidth: 1}}
                    onPress={checkPermission.bind(this, GALERY)}
                    />
                    <SpacerTop spacer={5}/>
                    <CustomButton
                    title={"Camera"}
                    type='outline'
                    buttonStyle={{padding:15,borderWidth: 1}}
                    onPress={checkPermission.bind(this, CAMERA)}
                    />
                    <SpacerTop spacer={5}/>
                    </View>
            </View>
        </Modal>
    )

    const showHideSheet = (isShow) => {
        if (isShow === true) {
            sheetRef.current.snapTo(0);
            setModalVisible(true)
        } else {
            sheetRef.current.snapTo(2);
            setModalVisible(false)
        }
    };

    const checkPermission = (type) => {
        {
        Platform.OS === "ios" ?
            checkMultiple([PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.PHOTO_LIBRARY])
                .then((result) => {
                    const value = (result[PERMISSIONS.IOS.CAMERA] === RESULTS.GRANTED) && (result[PERMISSIONS.IOS.PHOTO_LIBRARY] === RESULTS.GRANTED)
                    handleResult(value, true, type);
                })
            :
            checkMultiple([PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE])
                .then((result) => {
                    const value = (result[PERMISSIONS.ANDROID.CAMERA] === RESULTS.GRANTED) && (result[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] === RESULTS.GRANTED)
                    handleResult(value, true, type);
                })
        }
    }

    const requestPermission = (type) => {
        {
        Platform.OS === "ios" ?
            requestMultiple([PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.PHOTO_LIBRARY])
                .then((result) => {
                    const value = (result[PERMISSIONS.IOS.CAMERA] === RESULTS.GRANTED) && (result[PERMISSIONS.IOS.PHOTO_LIBRARY] === RESULTS.GRANTED)
                    handleResult(value, false, type);
                })
            :
            requestMultiple([PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE])
                .then((result) => {
                    const value = (result[PERMISSIONS.ANDROID.CAMERA] === RESULTS.GRANTED) && (result[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] === RESULTS.GRANTED)
                    handleResult(value, false, type);
                })
        }
    }

    const handleResult = (value, isChecking, type) => {
        showHideSheet();
        setTimeout(() => {
            if (value === true) {
                if (type == CAMERA) {
                    console.log("auuuuuuu");
                    ImagePicker.openCamera({
                        width: 300,
                        height: 400,
                        cropping: true,
                      }).then(image => {
                        //console.log(image);
                        uploadPhoto(image.path)
                      });
                } else {
                    launchImageLibrary({
                        mediaType: 'photo',
                        includeBase64: false,
                        maxHeight: 200,
                        maxWidth: 200,
                        quality: 0.5
                    }, (response) => {
                        if (response.errorMessage) {
                            commonctions.showErrorAlert(response.errorMessage)
                        } else if (!response.didCancel) {
                            uploadPhoto(response.uri)
                        }
                    })
                }
            } else {
                if (isChecking) {
                    requestPermission(type);
                } else {
                    if (type == CAMERA) {
                        commonctions.showErrorAlert("Izin akses kamera telah ditolak\nUntuk dapat mengakses fitur, mohon agar memberi izin akses melalui pengaturan aplikasi")
                    } else {
                        commonctions.showErrorAlert("Izin akses foto telah ditolak\nUntuk dapat mengakses fitur, mohon agar memberi izin akses melalui pengaturan aplikasi")
                    }
                }
            }
        }, 400);
    };

    const loadTalk = useCallback(async()=>{
        try{
            const response = await dispatch(talkActions.getTalk(userId,borderId,howToRequest))
            if(response.status===1){
                if(howToRequest===0)
                    setTalkList(response.items)
                else
                    setTalkList([...talkList,...response.items])
                setHowToRequest(1)
            }
        }catch(err){
            commonActions.showErrorAlert(err.message)
        }
    },[])

    useEffect(()=>{
        loadTalk()
    },[])

    const sendText = async()=>{
        try{
            const response = await dispatch(talkActions.sendMessage(chatText,userId))
            if(response.status===1){
                setHowToRequest(0)
                setChatText("")
                loadTalk()
            }
        }catch(err){
            commonActions.showErrorAlert(err.message)
        }
    }

    const uploadPhoto = async(photo)=>{
        try {
            //send image to server then refetch the list
        } catch (err) {
            commonActions.showErrorAlert(err.message)
        }
    }


    return (
        <View style={styles.container}>
            <BottomSheet
                ref={sheetRef}
                snapPoints={[SHEET_HEIGHT, SHEET_HEIGHT, -50]}
                initialSnap={2}
                borderRadius={20}
                renderContent={bottomSheetComponent}
            />
            <FocusAwareStatusBar
                barStyle='dark-content'
                backgroundColor='white' />
                <CustomToolbar
                style={styles.toolbar}
                >
                    <SpacerVertical spacer={15} />
                    <Icon type='ionicon' name='arrow-back-outline' color='black' onPress={()=>{
                        props.navigation.goBack()
                    }}/>
                    <Image source={{ uri: image ? image : "https://via.placeholder.com/150" }} style={styles.profileImage} onPress={()=>{
                        props.navigation.navigate('profileDisplay',{
                            userId: userId
                        })
                    }} />
                    <Text style={styles.title} onPress={()=>{
                        props.navigation.navigate('profileDisplay',{
                            userId: userId
                        })
                    }}>{name}</Text>
                </CustomToolbar>
                <FlatList
                inverted
                contentContainerStyle={{flex:1}}
                data={talkList}
                keyExtractor={item=> item.messageId.toString()}
                renderItem={(itemData)=>(
                    <ChatItem
                    mediaType={itemData.item.mediaType} //wheter it's chat, or image or video
                    chatType={itemData.item.messageKind} //wheter it's in or out
                    url = {itemData.item.mediaUrl} //media url if media type is not 0
                    chat = {itemData.item.message} //message if media type is 0
                    time={commonActions.convertStringDate(itemData.item.time,"HH:mm")} //item
                    />
                )}
                />
                <View style={{...styles.toolbar,padding:10,borderTopWidth:2,borderColor:Colors.divider}}>
                    <Icon type='ionicon' name='add-outline' color='black' onPress={()=>{
                        setModalVisible(true)
                    }}/>
                    <SpacerVertical spacer={5}/>
                    <TextInput
                    multiline={true}
                    style={styles.input}
                    value={chatText}
                    onChangeText={(text)=>{
                        setChatText(text)
                    }}
                    />
                    <SpacerVertical spacer={5}/>
                    <View style={{width:'20%'}}>
                        <CustomButton
                        title='Send'
                        onPress={sendText}
                        />
                    </View>
                </View>
        </View>
    );
}

const styles= StyleSheet.create({
    container:{
        flex:1
    },
    title:{
        fontFamily: 'rubik-bold',
        fontSize: 16,
        color: 'black'
    },
    input:{
        borderWidth:1,
        borderRadius:5,
        flex:1,
        maxHeight:60,
        padding:5
    },
    toolbar:{
        justifyContent:'flex-start',
        alignItems:'center',
        flexDirection:'row'
    },
    profileImage:{
        marginStart:15,
        marginEnd:10,
        height: 40,
        aspectRatio:1,
        borderRadius:40/2
    }
})

export default ChatRoomScreen;