import React from 'react';
import { StyleSheet, View, Text,Image,ScrollView } from 'react-native';
import CustomButton from '../components/CustomButton';
import SpacerTop from '../components/SpacerTop';
import {Icon} from 'react-native-elements';

const MyPageScreen = props =>{
    return (
        <ScrollView style={styles.container}>
            
        </ScrollView>
    );
};

MyPageScreen.navigationOptions={
    title: 'MyPage',
    tabBarIcon: ({ tintColor }) => <Icon type='material' name='person' color={tintColor} />,
}

const styles = StyleSheet.create({
    container: {
        flexGrow:1,
        backgroundColor:'white'
    }
})

export default MyPageScreen;
