import React,{useState,useEffect,useCallback} from 'react';
import {View, StyleSheet,FlatList,Text,TextInput} from 'react-native';
import {Icon,Image} from 'react-native-elements';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import CustomToolbar from '../components/CustomToolbar';
import SpacerVertical from '../components/SpacerVertical';
import CustomButton from '../components/CustomButton';
import Colors from '../constants/Colors'
import ChatItem from '../components/ChatItem';

const ChatRoomScreen = props =>{
    const userId = props.navigation.getParam('userId')
    const image = props.navigation.getParam('image')
    const name = props.navigation.getParam('name')
    const [talkList,setTalkList] = useState([])



    return (
        <View style={styles.container}>
            <FocusAwareStatusBar
                barStyle='dark-content'
                backgroundColor='white' />
                <CustomToolbar
                style={styles.toolbar}
                >
                    <SpacerVertical spacer={15} />
                    <Icon type='ionicon' name='arrow-back-outline' color='black' onPress={()=>{
                        props.navigation.goBack()
                    }}/>
                    <Image source={{ uri: image ? image : "https://via.placeholder.com/150" }} style={styles.profileImage} onPress={()=>{
                        props.navigation.navigate('profileDisplay',{
                            userId: userId
                        })
                    }} />
                    <Text style={styles.title} onPress={()=>{
                        props.navigation.navigate('profileDisplay',{
                            userId: userId
                        })
                    }}>{name}</Text>
                </CustomToolbar>
                <View style={{flex:1}}>
                <ChatItem
                mediaType={0}
                chatType={1}
                chat = 'Whatsapp?'
                time='08:14 AM'
                />
                </View>
                {/* <FlatList
                inverted
                contentContainerStyle={{flex:1}}
                data={talkList}
                keyExtractor={item=> item.messageId.toString()}
                renderItem={(itemData)=>(
                    <ChatItem
                    mediaType={itemData.item.mediaType} //wheter it's chat, or image or video
                    chatType={itemData.item.messageKind} //wheter it's in or out
                    url = {itemData.item.mediaUrl} //media url if media type is not 0
                    chat = {itemData.item.message} //message if media type is 0
                    time={itemData.item.time}
                    />
                )}
                /> */}
                <View style={{...styles.toolbar,padding:10,borderTopWidth:2,borderColor:Colors.divider}}>
                    <Icon type='ionicon' name='add-outline' color='black' onPress={()=>{
                        
                    }}/>
                    <SpacerVertical spacer={5}/>
                    <TextInput
                    multiline={true}
                    style={styles.input}
                    />
                    <SpacerVertical spacer={5}/>
                    <View style={{width:'20%'}}>
                        <CustomButton
                        title='Send'
                        />
                    </View>
                </View>
        </View>
    );
}

const styles= StyleSheet.create({
    container:{
        flex:1
    },
    title:{
        fontFamily: 'rubik-bold',
        fontSize: 16,
        color: 'black'
    },
    input:{
        borderWidth:1,
        borderRadius:5,
        flex:1,
        maxHeight:60,
        padding:5
    },
    toolbar:{
        justifyContent:'flex-start',
        alignItems:'center',
        flexDirection:'row'
    },
    profileImage:{
        marginStart:15,
        marginEnd:10,
        height: 40,
        aspectRatio:1,
        borderRadius:40/2
    }
})

export default ChatRoomScreen;