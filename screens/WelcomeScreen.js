import React, { useCallback, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import StorageKey from "../constants/StorageKey"
import { StyleSheet, View, Text,Image,ScrollView } from 'react-native';
import CustomButton from '../components/CustomButton';
import SpacerTop from '../components/SpacerTop';

const WelcomeScreen = props =>{

    const autoLogin = async()=>{
        const tkn = await AsyncStorage.getItem(StorageKey.KEY_ACCESS_TOKEN);
        if(tkn!==null){
            props.navigation.navigate('MainFlow') 
        }
    }

    useEffect(()=>{
        autoLogin()
    },[])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Training App</Text>
            <View style={{marginBottom: 60,width:'100%'}}>
                <CustomButton
                title="Login"
                buttonStyle={{borderWidth: 1}}
                onPress={()=>{
                    props.navigation.navigate('login')
                }}
                />
                <SpacerTop spacer={16}/>
                <CustomButton
                title="Register"
                type = "outline"
                buttonStyle={{borderWidth: 1}}
                onPress={()=>{
                    props.navigation.navigate('register')
                }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding: 16,
        backgroundColor:'white',
        alignItems:'center',
        justifyContent:'flex-end'
    },
    title:{
        fontSize:23,
        padding:20,
        fontFamily: 'rubik-bold'
    }
})

export default WelcomeScreen;
