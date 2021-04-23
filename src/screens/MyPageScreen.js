import React,{useState,useCallback,useEffect,useRef} from 'react';
import { StyleSheet, View, Text,ScrollView,Platform,TouchableOpacity,SafeAreaView } from 'react-native';
import CustomButton from '../components/CustomButton';
import SpacerTop from '../components/SpacerTop';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import {Icon, Image} from 'react-native-elements';
import Colors from '../constants/Colors';
import CustomToolbar from '../components/CustomToolbar';
import CustomDialog from '../components/CustomDialog';
import * as authActions from '../../store/actions/authAction';
import * as commonctions from '../../store/actions/commonActions';
import { useDispatch, useSelector } from 'react-redux';
import StorageKey from '../constants/StorageKey';
import AsyncStorage from "@react-native-async-storage/async-storage";
import ImagePicker from 'react-native-image-crop-picker';
import BottomSheet from 'reanimated-bottom-sheet';
import Modal from 'react-native-modal';
import { check, checkMultiple, PERMISSIONS, request, requestMultiple, RESULTS } from 'react-native-permissions';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const CAMERA = 123;
const GALERY = 321;
const SHEET_HEIGHT = 200;

const MyPageScreen = props =>{
    const dispatch = useDispatch()
    const sheetRef = useRef(null);
    const imagePhoto = useSelector(state => state.authReducer.image);
    const email = useSelector(state => state.authReducer.email);
    const password = useSelector(state => state.authReducer.password);
    const aboutMe = useSelector(state => state.authReducer.aboutMe);
    const [showDialog,setShowDialog] = useState(false)
    const [deleteDialog,setDeleteDialog]=useState(false)
    const [modalVisible, setModalVisible] = useState(false)

    const loadProfile = useCallback(async()=>{
        try{
            await dispatch(authActions.getProfile())
        }catch(err){
            commonctions.showErrorAlert(err.message)
        }
    },[]);

    useEffect(()=>{
        loadProfile()
    },[])
    useEffect(()=>{
        const willFocusSub = props.navigation.addListener(
            'willFocus',
            ()=>{
                loadProfile()
            }
          );
          return () => {
            willFocusSub.remove();
          };
    },[loadProfile])

    const doLogout= async()=>{
        try{
            await AsyncStorage.removeItem(StorageKey.KEY_ACCESS_TOKEN)
            await AsyncStorage.removeItem(StorageKey.KEY_USER_ID)
            props.navigation.navigate('intro')
        }catch(e){
            console.log(e)
        }
    }

    const doDeleteAccount = async() =>{
        try {
            const response = await dispatch(authActions.deleteAccount());
            if(response.status===1){
                await AsyncStorage.removeItem(StorageKey.KEY_ACCESS_TOKEN)
                await AsyncStorage.removeItem(StorageKey.KEY_USER_ID)
                props.navigation.navigate('intro')
            }else{
                commonctions.showErrorAlert(response.error.errorMessage)
            }
        } catch (err) {
            setIsLoading(false)
            commonctions.showErrorAlert(err.message)
        }
    };

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
                    paddingTop: 8,
                    backgroundColor: 'white',
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20
                }}>
                <View
                    style={{
                        alignSelf: 'center',
                        width: '45%',
                        height: 4,
                        backgroundColor: Colors.greyLight,
                        borderRadius: 4
                    }} />
                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: 16,
                        marginHorizontal: 16
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'column',
                            margin: 16,
                            alignItems: 'center'
                        }}
                    >
                        <TouchableOpacity
                            style={{ borderRadius: 50 }}
                            onPress={checkPermission.bind(this, CAMERA)}>
                            {/* <Image
                                style={{ height: 50, width: 50 }}
                                source={require('../../assets/camera.png')} /> */}
                        </TouchableOpacity>
                        {/* <CustomText
                            style={{ fontFamily: 'roboto-regular', fontSize: 14, marginTop: 8 }}
                        >Kamera</CustomText> */}
                    </View>
                    <View
                        style={{
                            flexDirection: 'column',
                            margin: 16,
                            alignItems: 'center'
                        }}
                    >
                        <TouchableOpacity
                            style={{ borderRadius: 50 }}
                            onPress={checkPermission.bind(this, GALERY)}
                        >
                            {/* <Image
                                style={{ height: 50, width: 50 }}
                                source={require('../../assets/gallery.png')} /> */}
                        </TouchableOpacity>
                        {/* <CustomText
                            style={{ fontFamily: 'roboto-regular', fontSize: 14, marginTop: 8 }}
                        >Galeri</CustomText> */}
                    </View>
                </View>
                <View
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        borderTopWidth: 1,
                        width: '100%',
                        borderTopColor: Colors.greyLight,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                    <TouchableOpacity
                        onPress={() => showHideSheet()}
                        style={{ width: '100%', padding: 16 }}>
                        {/* <CustomText style={{ color: Colors.primary, textAlign: 'center' }}>Batal</CustomText> */}
                    </TouchableOpacity>
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
                        //updateUserImage(image.path)
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
                            //showErrorAlert(response.errorMessage)
                        } else if (!response.didCancel) {
                            //updateUserImage(response.uri)
                        }
                    })
                }
            } else {
                if (isChecking) {
                    requestPermission(type);
                } else {
                    if (type == CAMERA) {
                        showErrorAlert("Izin akses kamera telah ditolak\nUntuk dapat mengakses fitur, mohon agar memberi izin akses melalui pengaturan aplikasi")
                    } else {
                        showErrorAlert("Izin akses foto telah ditolak\nUntuk dapat mengakses fitur, mohon agar memberi izin akses melalui pengaturan aplikasi")
                    }
                }
            }
        }, 400);
    };

    return (
        <SafeAreaView style={styles.container}>
            <FocusAwareStatusBar
                barStyle='dark-content'
                backgroundColor='white' />
                <CustomToolbar>
                    <Text style={styles.title}>TrainingApps</Text>
                    <TouchableOpacity
                        style={styles.logoutContainer}
                        onPress={() => {
                            setShowDialog(true)
                        }}>
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>
                </CustomToolbar>
                {showDialog && 
            <CustomDialog
            message = 'Are you sure want to logout?'
            yesTitle = 'Ok'
            noTitle = 'Cancel'
            onOk ={doLogout}
            onCancel = {()=>{
                setShowDialog(false)
            }}
            />}
            {deleteDialog && 
            <CustomDialog
            message = 'Are you sure want to delete account?'
            yesTitle = 'Ok'
            noTitle = 'Cancel'
            onOk ={doDeleteAccount}
            onCancel = {()=>{
                setDeleteDialog(false)
            }}
            />}
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={{flexDirection:'row'}}>
                    <View style={styles.imageContainer}>
                        {imagePhoto==="" || imagePhoto===null ? <TouchableOpacity onPress={()=>{showHideSheet(true)}}><View style={{...styles.image,backgroundColor:Colors.grey}}/></TouchableOpacity> : 
                        <Image source={{ uri: imagePhoto }} style={styles.image} onPress={()=>{ showHideSheet(true) }}/>}
                    </View>
                    <View style={{flexDirection:'column',paddingStart:10,flex:1}}>
                        <Text style={{fontFamily:'rubik-bold',fontSize:14}}>{email}</Text>
                        <SpacerTop spacer={5}/>
                        <Text style={{fontFamily:'rubik-bold',fontSize:14}}>{password}</Text>
                        <SpacerTop spacer={7}/>
                        <CustomButton
                            title="Edit Profile"
                            type='outline'
                            buttonStyle={{borderWidth: 1}}
                            />
                    </View>
                </View>
                <SpacerTop spacer={40}/>
                <Text style={{fontFamily:'rubik-bold',fontSize:14}}>About Me</Text>
                <Text style={{fontFamily:'rubik-regular',fontSize:14}}>{aboutMe}</Text>
                <SpacerTop spacer={60}/>
                <CustomButton
                    title={"Term & Condition"}
                    buttonStyle={{padding:15,borderWidth: 1}}
                    onPress={()=>{
                        props.navigation.navigate("webView")
                    }}
                    />
                <SpacerTop spacer={20}/>
                <CustomButton
                    title="Delete Account"
                    type='outline'
                    buttonStyle={{borderWidth: 1,padding:15,borderColor:'red'}}
                    titleStyle={{color:'red'}}
                    onPress={()=>{
                        setDeleteDialog(true)
                    }}
                    />
            </ScrollView>
            <BottomSheet
                ref={sheetRef}
                snapPoints={[SHEET_HEIGHT, SHEET_HEIGHT, -50]}
                initialSnap={2}
                borderRadius={20}
                renderContent={bottomSheetComponent}
            />
        </SafeAreaView>
    );
};

MyPageScreen.navigationOptions={
    title: 'MyPage',
    tabBarIcon: ({ tintColor }) => <Icon type='material' name='person' color={tintColor} />,
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        marginTop: Platform.OS == 'ios' ? StatusBar.currentHeight : 0
    },
    image: {
        width: 100,
        aspectRatio: 1,
        borderRadius: 20,
    },
    imageContainer: {
        width: 100,
        aspectRatio: 1,
    },
    scrollView:{
        flexGrow:1,
        padding:20
    },
    title: {
        fontFamily: 'rubik-bold',
        fontSize: 20,
        alignSelf: 'center',
        color: 'black'
    },
    logoutContainer: {
        position: 'absolute',
        alignSelf: 'flex-end',
        right: 8,
        padding: 8
    },
    logoutText: {
        fontFamily: 'rubik-bold',
        fontSize: 14,
        color: Colors.primary
    },
})

export default MyPageScreen;
