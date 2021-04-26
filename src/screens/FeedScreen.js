import React, { useState,useEffect,useCallback } from 'react';
import { StyleSheet, View, Text,Image,ScrollView } from 'react-native';
import CustomButton from '../components/CustomButton';
import SpacerTop from '../components/SpacerTop';
import {Icon} from 'react-native-elements';
import { SafeAreaView } from 'react-native';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import CustomToolbar from '../components/CustomToolbar';
import { FlatList } from 'react-native';
import FeedItem from '../components/FeedItem';
import * as feedAction from '../../store/actions/feedAction';
import * as commonActions from '../../store/actions/commonActions';
import { useDispatch } from 'react-redux';

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 0;
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
};

const FeedScreen = props =>{
    const dispatch = useDispatch()
    const [swipeRefresh,setSwipeRefresh]= useState(false)
    const [lastLoginTime,setLastLoginTime] = useState(null)
    const [feedData, setFeedData] = useState([])

    useEffect(()=>{
        loadFeed()
    },[]);

    useEffect(()=>{
        const willFocusSub = props.navigation.addListener(
            'willFocus',
            ()=>{
                loadFeed()
            }
          );
          return () => {
            willFocusSub.remove();
          };
    },[loadFeed])

    const loadFeed = useCallback(async()=>{
        try{
            const response = await dispatch(feedAction.getFeed(null))
            console.log(response)
            if(response.status===1){
                const llt = response.lastLoginTime
                setLastLoginTime(llt)
                setFeedData(response.items)
            }
        }catch(err){
            commonActions.showErrorAlert(err.message)
        }
    },[]);

    const loadMore = async()=>{
        try{
            const response = await dispatch(feedAction.getFeed())
            console.log(response)
            if(response.status===1){
                const llt = response.lastLoginTime
                setLastLoginTime(llt)
                //setFeedData(response.items)
                setFeedData([...feedData,...response.items])
            }
        }catch(err){
            commonActions.showErrorAlert(err.message)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <FocusAwareStatusBar
                barStyle='dark-content'
                backgroundColor='white' />
                <CustomToolbar>
                    <Text style={styles.title}>TrainingApps</Text>
                </CustomToolbar>
                <FlatList
                onRefresh={loadFeed}
                refreshing = {swipeRefresh}
                data={feedData}
                numColumns={2}
                keyExtractor={item=> item.userId.toString()}
                onScroll={({ nativeEvent }) => {
                    if (isCloseToBottom(nativeEvent) && lastLoginTime!==null) {
                        loadMore();
                    }
                }}
                renderItem={(itemData)=>(
                    <FeedItem
                    image={itemData.item.imageUrl}
                    nickname={itemData.item.nickname}
                    onPress={()=>{
                        props.navigation.navigate('profileDisplay',{
                            userId: itemData.item.userId
                        })
                    }}
                    />
                )}
                />
        </SafeAreaView>
    );
};

FeedScreen.navigationOptions={
    title: 'Feed',
    tabBarIcon: ({ tintColor }) => <Icon type='material' name='collections' color={tintColor} />
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        marginTop: Platform.OS == 'ios' ? StatusBar.currentHeight : 0
    },
    title: {
        fontFamily: 'rubik-bold',
        fontSize: 20,
        alignSelf: 'center',
        color: 'black'
    },
})
export default FeedScreen;
