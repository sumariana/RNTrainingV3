import AsyncStorage from "@react-native-async-storage/async-storage";
import StorageKey from "../constants/StorageKey";
import React,{useState,useCallback} from 'react';
import { StyleSheet, View, Text,Image,ScrollView } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import SpacerTop from '../components/SpacerTop';
import * as commonctions from '../store/actions/commonActions';
import SafeAreaView from 'react-native-safe-area-view';
import { useSelector, useDispatch } from 'react-redux';
import * as authActions from '../store/actions/authAction';

const LoginScreen = props =>{
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isEmailValid, setEmailValid] = useState(false);
    const [isPassValid, setPassValid] = useState(false);
    const [isAllValid, setAllValid] = useState(false)

    const inputChangeHandler = (id, text, isValid) => {
        if (id === 'email') {
            setEmail(text);
            setEmailValid(isValid);
        }
        if (id === 'password') {
            setPassword(text);
            setPassValid(isValid);
        }
        setAllValid(isEmailValid === true && isPassValid === true );
    }

    const doLogin = async() =>{
        setIsLoading(true)
        try {
            const response = await dispatch(authActions.login(email, password));
            setIsLoading(false);
            console.log(response)
            if(response.status===1){
                await AsyncStorage.setItem(StorageKey.KEY_ACCESS_TOKEN, response.accessToken);
                await AsyncStorage.setItem(StorageKey.KEY_USER_ID, JSON.stringify(response.userId));
                props.navigation.navigate('MainFlow')
            }else{
                commonctions.showErrorAlert(response.error.errorMessage)
            }
        } catch (err) {
            setIsLoading(false)
            commonctions.showErrorAlert(err.message)
        }
    };
    return (
        <SafeAreaView
            style={styles.container}>
            <ScrollView
            keyboardShouldPersistTaps="always"
            contentContainerStyle={styles.scrollView}
                >
                <CustomInput
                id = 'email'
                label = 'Email'
                email = {true}
                required = {true}
                inputType="email"
                onInputChange={inputChangeHandler}
                />
                <SpacerTop spacer={10}/>
                <CustomInput
                id='password'
                label = 'Password'
                isPassword = {true}
                required = {true}
                minLength={5}
                mxLength ={9}
                inputType="password"
                onInputChange={inputChangeHandler}
                />
            </ScrollView>
            <View style={styles.bottomContainer}>
            <CustomButton
                title="Login"
                disabled={!isAllValid}
                onPress={doLogin}
                />
            </View>
        </SafeAreaView>
    );
};

LoginScreen.navigationOptions = {
    title: 'Login'
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'white',
    },
    scrollView:{
        padding: 20,
        flexGrow: 1
    },
    bottomContainer:{
        padding: 20,
        backgroundColor:'white'
    }
})

export default LoginScreen;
