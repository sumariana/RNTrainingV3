import React from 'react';
import { StyleSheet, View, Text,Image,ScrollView } from 'react-native';
import CustomButton from '../components/CustomButton';
import SpacerTop from '../components/SpacerTop';
import {Icon} from 'react-native-elements';

const FeedScreen = props =>{
    return (
        <View style={styles.container}>
            <Text>Training App</Text>
            <View>
            
            </View>
        </View>
    );
};

FeedScreen.navigationOptions={
    title: 'Feed',
    tabBarIcon: ({ tintColor }) => <Icon type='material' name='collections' color={tintColor} />
}

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
