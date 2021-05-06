import React,{useState,useCallback,useEffect,useRef} from 'react';
import { StyleSheet, View, Text,ScrollView,Platform,TouchableOpacity,SafeAreaView,Alert,ImageBackground } from 'react-native';
import CustomButton from '../components/CustomButton';
import SpacerTop from '../components/SpacerTop';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import {Icon, Image} from 'react-native-elements';
import Colors from '../constants/Colors';
import * as authAction from '../../store/actions/authAction';
import * as commonctions from '../../store/actions/commonActions';
import { useDispatch, useSelector } from 'react-redux';

const ProfileDisplay = props =>{
    const dispatch = useDispatch()
    const [image,setImage] = useState(null)
    const [name,setName] = useState("")
    const [aboutMe,setAboutMe] = useState("")
    const [sex,setSex] = useState("")
    const [hobby,setHobby] = useState("")
    const [age,setAge] = useState("")
    const [job,setJob] = useState("")
    const userId = props.navigation.getParam('userId')
    const gender = useSelector(state => state.authReducer.GENDER_DATA);
    const jobArray = useSelector(state => state.authReducer.JOB_DATA);

    const getProfileDetail=useCallback(async()=>{
        try{
            const response = await dispatch(authAction.getProfile(userId))
            if(response.status===1){
                setImage(response.imageUrl)
                setName(response.nickname)
                setAboutMe(response.aboutMe ? response.aboutMe : "undefined")
                setSex(sexToString(response.gender))
                setHobby(response.hobby ? response.hobby : "undefined")
                setAge(getAge(response.birthday))
                setJob(jobToString(response.job))
            }
        }catch(err){
            commonctions.showErrorAlert(err.message)
        }
    },[])

    const sexToString = (value)=>{
        if(value)
            return gender.find(x=>x.value === value).label
        else
            return "undefined"
    }

    const jobToString = (value)=>{
        if(value)
            return jobArray.find(x=>x.value===value).label
        else
            return "undefined"
    }

    const getAge = (dateString)=>{
        if(dateString){
            var today = new Date();
            var birthDate = new Date(dateString);
            var age = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age+" years old";
        }else
            return "undefined"
    }

    useEffect(()=>{
        getProfileDetail()
    },[])

    return (
        <SafeAreaView style={styles.container}>
            <FocusAwareStatusBar
                barStyle='dark-content'
                backgroundColor='white' />
            <ScrollView
            keyboardShouldPersistTaps="always"
            contentContainerStyle={styles.scrollView}>
                <TouchableOpacity onPress={()=>{
                    props.navigation.navigate("imagePreview",{
                        url: image
                    })
                }}>
                <ImageBackground
                source={{ uri: image ? image : "https://via.placeholder.com/150" }}
                style={{width:'100%',height:200,justifyContent:'flex-end'}}
                >
                    <Text style={{fontFamily:'rubik-bold',fontSize:18,color:'white',paddingStart:20,paddingBottom:10}}>{name}</Text>
                </ImageBackground>
                </TouchableOpacity>
                <SpacerTop spacer={20}/>
                <View style={{padding:10}}>
                    <Text style={{fontFamily:'rubik-bold',color:'black',textAlign:'center',width:'100%',flex:1}}>{aboutMe}</Text>
                    <SpacerTop spacer={20}/>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{flex:0.5,margin:5,fontFamily:'rubik-medium',fontSize:14,color:'black'}}>Sex</Text>
                        <Text style={{flex:0.5,margin:5,fontFamily:'rubik-medium',fontSize:14,color:'black'}}>{sex}</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{flex:0.5,margin:5,fontFamily:'rubik-medium',fontSize:14,color:'black'}}>Hobby</Text>
                        <Text style={{flex:0.5,margin:5,fontFamily:'rubik-medium',fontSize:14,color:'black'}}>{hobby}</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{flex:0.5,margin:5,fontFamily:'rubik-medium',fontSize:14,color:'black'}}>Age</Text>
                        <Text style={{flex:0.5,margin:5,fontFamily:'rubik-medium',fontSize:14,color:'black'}}>{age}</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{flex:0.5,margin:5,fontFamily:'rubik-medium',fontSize:14,color:'black'}}>Occupation</Text>
                        <Text style={{flex:0.5,margin:5,fontFamily:'rubik-medium',fontSize:14,color:'black'}}>{job}</Text>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.bottomContainer}>
            <CustomButton
                title="Send Message"
                onPress={()=>{
                    props.navigation.navigate('chatRoom',{
                        userId: userId,
                        name: name,
                        image: image
                    })
                }}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        flex: 1
    },
    scrollView:{
        flexGrow: 1
    },
    bottomContainer:{
        padding:20
    }
});

ProfileDisplay.navigationOptions = {
    title: "ProfileDisplay"
}

export default ProfileDisplay;