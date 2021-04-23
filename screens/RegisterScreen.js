import React,{useCallback,useReducer,useState} from 'react'
import { StyleSheet, View,ScrollView,Alert } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import SpacerTop from '../components/SpacerTop';
import * as commonctions from '../store/actions/commonActions';
import SafeAreaView from 'react-native-safe-area-view';
import { useSelector, useDispatch } from 'react-redux';
import * as authActions from '../store/actions/authAction'

const REGISTER = 'REGISTER';

const formReducer = (state,action)=>{
    if(action.type===REGISTER){
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        }
        const updatedValidities={
            ...state.inputValidities,
            [action.input]: action.isValid
        }
        let updatedFormIsValid = true
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid : updatedFormIsValid,
            inputValues: updatedValues,
            inputValidities: updatedValidities
        };
    }
    return state
}

const RegisterScreen = props =>{
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false);
    const [formState, dispatchFormState]=useReducer(formReducer,{
        inputValues:{
            username:'',
            email: '',
            password:'',
            password_confirmation:''
        },
        inputValidities:{
            username:false,
            email: false,
            password:false,
            password_confirmation:false
        },
        formIsValid:false
    });

    const inputChangeHandler = useCallback((inputIdentifier, inputValue,inputValidity)=>{
        dispatchFormState({type: REGISTER,value: inputValue,isValid: inputValidity,input:inputIdentifier});
    },[dispatchFormState]);

    const doRegister = async()=>{
        setIsLoading(true)
        try{
            const response = await dispatch(authActions.register(formState.inputValues))
            setIsLoading(false)
            console.log(formState.inputValidities)

            if(response.status===1){
                await AsyncStorage.setItem(StorageKey.KEY_ACCESS_TOKEN, response.accessToken);
                await AsyncStorage.setItem(StorageKey.KEY_USER_ID, response.userId);
                Alert.alert( "Register Success", "Register success you will redirect to login page", [
                    { 
                        text: "OK",onPress: ()=>{
                            props.navigation.navigate('MainFlow')
                        }
                    }
                ]);
            }else{
                commonctions.showErrorAlert(response.error.errorMessage)
            }
        }catch(err){
            setIsLoading(false)
            commonctions.showErrorAlert(err.message)
        }
    }

    return (
        <SafeAreaView
            style={styles.container}>
            <ScrollView
            keyboardShouldPersistTaps="always"
            contentContainerStyle={styles.scrollView}
                >
                <CustomInput
                id = 'username'
                label = 'Username'
                required = {true}
                mxLength={20}
                inputType="email"
                onInputChange={inputChangeHandler}
                />
                <SpacerTop spacer={10}/>
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
                <SpacerTop spacer={10}/>
                <CustomInput
                id='password_confirmation'
                label = 'Password Confirm'
                isPassword = {true}
                required = {true}
                minLength={5}
                mxLength ={9}
                isPassword = {true}
                passwordValue = {formState.inputValues.password}
                inputType="password"
                onInputChange={inputChangeHandler}
                />
            </ScrollView>
            <View style={styles.bottomContainer}>
            <CustomButton
                title="Register"
                disabled={!formState.formIsValid}
                onPress={doRegister}
                />
            </View>
        </SafeAreaView>
    );
};

RegisterScreen.navigationOptions = navData =>{
    return{
        title: 'Register'
    }
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

export default RegisterScreen;
