import React,{ useEffect, useReducer,useState } from 'react'
import { StyleSheet, View, Text,TextInput } from 'react-native'
import { Icon } from 'react-native-elements'
import SpacerTop from './SpacerTop';

const INPUT_CHANGE ='INPUT_CHANGE';
const ON_FOCUSED = "ON_FOCUSED"

const inputReducer = (state,action) =>{
    switch(action.type){
        case INPUT_CHANGE: return{
            ...state,
            value: action.value,
            isValid: action.isValid,
            errorMessage: action.errorMessage
        }
        case ON_FOCUSED: return{
            ...state,
            focused : action.isFocused
        }
        default : return state;
    }
};

const CustomInput = props=>{
    const [inputState,dispatch] = useReducer(inputReducer,{
        value: props.initialValue ? props.initialValue : '',
        isValid: props.initialValidated ? props.initialValidated : false,
        errorMessage: '',
        focused: false
    });
    
    const { onInputChange,id } = props

    useEffect(()=>{
        onInputChange(id,inputState.value, inputState.isValid)
    },[inputState,onInputChange,id])

    const textChangeHandler = text =>{
        dispatch({type: ON_FOCUSED,isFocused: true})
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValidated = true;
        let errorMessage = ''
        let t = text

        if(props.isNumOnly){
            t = text.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, '');
        }

        if (props.required && t.trim().length === 0) {
            isValidated = false;
            errorMessage = 'field can\'t be empty'
        }else{
            if (props.minLength != null && t.length < props.minLength) {
                isValidated = false;
                errorMessage = `field must be at least ${props.minLength} character`
            }
            if (props.mxLength != null && t.length > props.mxLength) {
                isValidated = false;
                errorMessage = `field max of ${props.mxLength} character`
            }
            if (props.email && !emailRegex.test(t.toLowerCase())) {
                isValidated = false;
                errorMessage = 'Email format is wrong'
            }
            if(props.id==='password_confirmation' && props.passwordValue.toLowerCase() !== t.toLowerCase()){
                isValidated = false
                errorMessage = 'Password is not matched'
            }
        }

        dispatch({type: INPUT_CHANGE,
        value: text,
        isValid: isValidated,
        errorMessage: errorMessage
        })
    };

    const onBlurHandler =()=>{
        dispatch({type: ON_FOCUSED,isFocused: false})
    }

    const colorVert = () =>{
        let def = 'black'

        if(props.isEditing!==null){
            if(!props.isEditing) def = 'gray'
        }
        if(!inputState.isValid && inputState.errorMessage!==''){
            def = 'red'
        }
        return def;
    }

    return(
        <View
        style={styles.container}
        >
            <Text style={styles.label}>{props.label}</Text>
            <TextInput
                {...props}
                style={styles.input}
                value={props.initialValue !==null ? props.initialValue : inputState.value}
                onChangeText={textChangeHandler}
                onBlur={onBlurHandler}
                placeholder={props.label}
                editable={props.isEditing!==null ? props.isEditing : true}
                secureTextEntry={props.secure ? props.secure : false}
            />
            { inputState.focused===false && !inputState.isValid && inputState.errorMessage!=='' && (
            <Text style={styles.error}>
                {inputState.errorMessage}
            </Text>)}
        </View>
    )

};

const styles = StyleSheet.create({
    container:{
        flexDirection: 'column',
        padding:5
    },
    label: {
        fontSize:14,
        marginStart:3,
        fontFamily:'rubik-bold',
        color: 'black'
    },
    input: {
        fontSize:14,
        fontFamily:'rubik-regular',
        color: 'black',
        borderBottomColor:'black',
        borderBottomWidth:1
    },
    error:{
        color:'red',
        fontFamily:'rubik-regular',
        fontSize:12,
        marginTop:5
    }
});

export default CustomInput;