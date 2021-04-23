import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import Colors from '../constants/Colors';

const CustomButton = props =>{
    return <Button
        {...props}
        disabledTitleStyle={{ ...styles.disabledTitle }}
        disabledStyle={{ ...styles.buttonDisabled }}
        buttonStyle={{ ...styles.button, ...props.buttonStyle }}
        titleStyle={{...styles.title, ...props.titleStyle}}
    />
};

const styles = StyleSheet.create({
    title:{
        fontSize: 16,
        fontFamily:'rubik-bold'
    },
    disabledTitle:{
        fontSize: 16,
        color: 'white',
        fontFamily:'rubik-bold'
    },
    button:{
        borderRadius:10,
        width:'100%'
    },
    buttonDisabled:{
        borderRadius:10,
        backgroundColor: Colors.greyLight
    }
});

export default CustomButton;