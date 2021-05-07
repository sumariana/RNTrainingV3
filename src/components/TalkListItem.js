import React,{useEffect} from 'react';
import { StyleSheet, View,Platform,Dimensions,Text } from 'react-native';
import {Image,CheckBox} from 'react-native-elements';
import Colors from '../constants/Colors';
import SpacerVertical from '../components/SpacerVertical';
import { TouchableOpacity } from 'react-native';

const TalkListItem = props=>{
    const {id,onCheckedChange} = props

    return (
    <TouchableOpacity
    onPress={props.open}
    >
        <View style={styles.container}>
        {
            props.editMode && <CheckBox 
            containerStyle={styles.checkbox}
            uncheckedColor = 'black'
            checkedColor = 'red'
            checked={props.checked}
            onPress={onCheckedChange.bind(this,id)}
            />
        }
        <Image source={{ uri: props.image ? props.image : "https://via.placeholder.com/150" }} style={styles.image}/>
        <SpacerVertical spacer={10}/>
        <View style={styles.textContainer}>
            <Text style={styles.name} numberOfLines={1} >{props.name}</Text>
            <Text style={styles.message} numberOfLines={1} >{props.message}</Text>
        </View>
    </View>
    </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    container:{
        margin:10,
        padding:10,
        flexDirection:'row',
        borderBottomWidth:2,
        borderBottomColor:Colors.divider
    },
    textContainer:{
        flex:1,
    },
    image:{
        width:50,
        height:50,
        borderRadius:50/2,
    },
    name:{
        fontFamily:'rubik-bold',
        fontSize:14,
        color:'black',
    },
    message:{
        fontFamily:'rubik-regular',
        fontSize:14,
        color:'black'
    },
    checkbox:{
        backgroundColor:'transparent',
        alignItems:'flex-start',
        justifyContent:'center'
    }
})

export default TalkListItem;