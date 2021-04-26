import React,{useState,useCallback,useEffect,useRef} from 'react';
import { StyleSheet, View, Text,ScrollView,Platform,TouchableOpacity,SafeAreaView,Alert,ImageBackground } from 'react-native';
import CustomButton from '../components/CustomButton';
import SpacerTop from '../components/SpacerTop';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import {Icon, Image} from 'react-native-elements';
import Colors from '../constants/Colors';
import * as feedAction from '../../store/actions/feedAction';
import * as commonctions from '../../store/actions/commonActions';
import { useDispatch, useSelector } from 'react-redux';
import StorageKey from '../constants/StorageKey';
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileDisplay = props =>{
    const dispatch = useDispatch()
    const [image,setImage] = useState(null)
    const [name,setName] = useState("")
    const [aboutMe,setAboutMe] = useState("")
    const [sex,setSex] = useState("")
    const [hobby,setHobby] = useState("")
    const [age,setAge] = useState("")
    const [job,setJob] = useState("")
    return (
        <SafeAreaView style={styles.container}>
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
                <View style={{}}>
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