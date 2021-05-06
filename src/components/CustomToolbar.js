import React from 'react';
import { StyleSheet, View,Platform } from 'react-native';

const headerHeight = Platform.OS === "android" ? 51 : 41;
const customToolbar = props=>{
    return (
        <View style={{...styles.container,...props.containerStyle}}>
            <View 
                style={{...styles.customToolbar,...props.style}}>
                {props.children}
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        overflow:'hidden',
        paddingBottom:5,
    },
    customToolbar: {
        height: headerHeight,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity:  0.4,
        shadowRadius: 3,
        elevation: 10,
        shadowOffset: { width: 1, height: 1 },
    },
})

export default customToolbar;