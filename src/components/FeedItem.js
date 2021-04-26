import React from 'react';
import { StyleSheet, View,Platform,Dimensions,Text } from 'react-native';
import {Image} from 'react-native-elements'
import Colors from '../constants/Colors';
import SpacerTop from './SpacerTop';

const num = 2
const itemWidth = Dimensions.get('window').width

const FeedItem = props=>{
    return (
    <View style={styles.container}>
        <View style={styles.imageContainer}>
            <Image source={{ uri: props.image ? props.image : "https://via.placeholder.com/150" }} style={styles.image} onPress={props.onPress}/>
        </View>
        <SpacerTop spacer={10}/>
        <Text style={styles.label}>{props.nickname}</Text>
    </View>
    );
}
const styles = StyleSheet.create({
    container:{
        width: (itemWidth/num),
        flexDirection: 'column',
        padding: 20,
    },
    imageContainer:{
        width:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    image:{
        width:150,
        aspectRatio: 1,
        borderRadius: 150/2
    },
    label:{
        width:'100%',
        alignSelf:'center',
        justifyContent:'flex-end',
        textAlign:'center',
        fontFamily:'rubik-regular',
        fontSize:14,
        color:'black'
    }
})

export default FeedItem;