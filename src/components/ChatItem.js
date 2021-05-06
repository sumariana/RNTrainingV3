import React,{useEffect} from 'react';
import { StyleSheet, View,Platform,Dimensions,Text } from 'react-native';
import {Image,CheckBox} from 'react-native-elements';
import Colors from '../constants/Colors';
import SpacerVertical from '../components/SpacerVertical';

const ChatItem = props=>{

    if(props.mediaType===1){
        //if the media type is image
        return(
            <View>

            </View>
        );
    }

    //if the media type is text
    return (
    <View style={styles.container}>
        <View style={{backgroundColor:'blue',borderRadius:10}}>
            <Text>Test</Text>
        </View>
    </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        borderWidth:1
    }
})

export default ChatItem;