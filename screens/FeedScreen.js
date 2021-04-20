import React from 'react';
import { StyleSheet, View, Text,Image,ScrollView } from 'react-native';
import CustomButton from '../components/CustomButton';
import SpacerTop from '../components/SpacerTop';

const FeedScreen = props =>{
    return (
        <View style={styles.container}>
            <Text>Training App</Text>
            <View>
                <CustomButton
                title="Login"
                />
                <SpacerTop/>
                <CustomButton
                title="Register"
                type = "outline"
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
        fontSize:14,
        fontWeight:'bold'
    }
})

export default FeedScreen;
