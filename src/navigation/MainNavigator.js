import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Colors from "../constants/Colors";

import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import FeedScreen from '../screens/FeedScreen';
import MessageScreen from '../screens/MessageScreen';
import MyPageScreen from '../screens/MyPageScreen';
import WebViewScreen from '../screens/WebViewScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import ProfileDisplay from '../screens/ProfileDisplay';
import ImagePreview from '../screens/ImagePreview';
import ChatRoomScreen from '../screens/ChatRoomScreen';

const defaultNavOptions = {
    headerTitleAlign: 'left',
    headerBackTitleVisible: false,
    headerTitleStyle: {
        fontFamily: 'rubik-medium',
        fontSize: 20,
        color: 'black'
    },
    headerTintColor: Platform.OS === 'android' ? 'black' : Colors.primary
};

const MainTab = createBottomTabNavigator({
    Feed: FeedScreen,
    Message: MessageScreen,
    MyPage: MyPageScreen
},{
    defaultNavigationOptions: ({ navigation }) => ({
        tabBarOptions: {
            allowFontScaling: false,
            activeTintColor: Colors.primary,
            style: {
                paddingTop:10,
                ...Platform.select({
                    android: {
                        borderTopWidth: 0,
                        elevation: 8
                    
                    }
                }),
            },
            labelStyle: {
                fontSize: 12,
            }
        },
        tabBarOnPress: ({ navigation, defaultHandler }) => {
            defaultHandler();
        }
    }),
    lazy: true
});

MainTab.navigationOptions={
    header: ()=> false
}

const MainNavigator = createSwitchNavigator({
    intro: createStackNavigator({
            welcome: {
                screen: WelcomeScreen,
                navigationOptions:{
                    headerShown:false,
                }
            },
            login: LoginScreen,
            register: RegisterScreen
        },{
            defaultNavigationOptions : defaultNavOptions
        }),
    MainFlow: createStackNavigator({
        MainTab,
        webView : WebViewScreen,
        editProfile: EditProfileScreen,
        profileDisplay : ProfileDisplay,
        chatRoom: {
            screen: ChatRoomScreen,
            navigationOptions:{
                header: ()=> false
            }
        },
        imagePreview: {
            screen: ImagePreview,
            navigationOptions:{
                headerTitleStyle: {
                    fontFamily: 'rubik-medium',
                    fontSize: 20,
                    color: 'white'
                },
                headerStyle:{
                    backgroundColor:'black'
                },
                headerTintColor: 'white'
            }
        }
        },{
            defaultNavigationOptions: {
                headerStyle: {
                    elevation: 10,
                    shadowOpacity: 10
                },
                ...defaultNavOptions
            },
            headerMode: 'screen'
        })
});

export default createAppContainer(MainNavigator);