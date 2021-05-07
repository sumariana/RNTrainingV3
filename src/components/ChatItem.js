import React,{useEffect} from 'react';
import { StyleSheet, View,Platform,Dimensions,Text } from 'react-native';
import {Image,CheckBox} from 'react-native-elements';
import Colors from '../constants/Colors';
import SpacerVertical from '../components/SpacerVertical';

const ChatItem = props=>{

    if(props.mediaType===1){
        //if the media type is image
        return(
            <View style={{...styles.container,
                justifyContent: props.chatType===1 ? 'flex-start' : 'flex-end'
            }}>
                {props.chatType===2 && <Text style={styles.time}>{props.time}</Text>}
                {props.chatType===2 && <SpacerVertical spacer={5} />}
                <View
                    style={{...styles.text,
                    backgroundColor: props.chatType==1 ? Colors.inChat : Colors.outChat ,
                }}
                >
                    <Image source={{ uri: props.url }} style={{height:150,aspectRatio:1}} onPress={()=>{
                                            
                                        }} />
                </View>
                {props.chatType===1 && <SpacerVertical spacer={5} />}
                {props.chatType===1 && <Text style={styles.time}>{props.time}</Text>}
            </View>
        );
    }

    //if the media type is text
    return (
    <View style={{...styles.container,
        justifyContent: props.chatType===1 ? 'flex-start' : 'flex-end'
    }}>
        {props.chatType===2 && <Text style={styles.time}>{props.time}</Text>}
        {props.chatType===2 && <SpacerVertical spacer={5} />}
        <Text
            style={{...styles.text,
            backgroundColor: props.chatType==1 ? Colors.inChat : Colors.outChat ,
        }}
        >{props.chat}</Text>
        {props.chatType===1 && <SpacerVertical spacer={5} />}
        {props.chatType===1 && <Text style={styles.time}>{props.time}</Text>}
    </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:5,
        paddingBottom:5
    },
    time:{
        fontSize:10,
        fontFamily:'rubik-regular',
        color:Colors.grey,
        alignSelf:'flex-end'
    },
    text:{
        padding:10,
        fontFamily:'rubik-regular',
        borderRadius:10,
        maxWidth:'80%',
        fontSize:14,
        color:'white'
    },
    imageContainer:{
        padding:10,
        fontFamily:'rubik-regular',
        borderRadius:10,
        width:'80%',
        aspectRatio:1,
        fontSize:14,
        color:'white'
    }
})

export default ChatItem;