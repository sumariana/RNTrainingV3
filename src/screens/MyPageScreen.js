import React,{useState,useCallback,useEffect,useRef} from 'react';
import { StyleSheet, View, Text,ScrollView,Platform,TouchableOpacity,SafeAreaView,Alert } from 'react-native';
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
                    height: imagePhoto!==null ? SHEET_HEIGHT : 150,
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
                    {imagePhoto!==null ? <CustomButton
                    title={"Delete"}
                    type='outline'
                    titleStyle={{color:'red'}}
                    buttonStyle={{padding:15,borderWidth: 1,borderColor:'red'}}
                    onPress={()=>{
                        
                    }}
                    /> : null}
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

    const uploadPhoto = async(photo)=>{
        try {
            await dispatch(authActions.uploadImageData(photo))
            setTimeout(() => {
                Alert.alert("Selamat", "Profil Anda Berhasil Diperbarui", [
                    {
                        text: "OK"
                    }
                ]);
            }, 200)
        } catch (err) {
            commonctions.showErrorAlert(err.message)
        }
    }

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
                        <Image source={{ uri: imagePhoto!==null ? imagePhoto : "https://via.placeholder.com/150" }} style={styles.image} onPress={()=>{ showHideSheet(true) }}/>
                    </View>
                    <View style={{flexDirection:'column',paddingStart:10,flex:1}}>
                        <Text style={{fontFamily:'rubik-bold',fontSize:14,color:'black'}}>{email}</Text>
                        <SpacerTop spacer={5}/>
                        <Text style={{fontFamily:'rubik-bold',fontSize:14,color:'black'}}>{password}</Text>
                        <SpacerTop spacer={7}/>
                        <CustomButton
                            title="Edit Profile"
                            type='outline'
                            buttonStyle={{borderWidth: 1}}
                            onPress={()=>{
                                props.navigation.navigate('editProfile')
                            }}
                            />
                    </View>
                </View>
                <SpacerTop spacer={40}/>
                <Text style={{fontFamily:'rubik-bold',fontSize:14,color:'black'}}>About Me</Text>
                <Text style={{fontFamily:'rubik-regular',fontSize:14,color:'black'}}>{aboutMe}</Text>
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
