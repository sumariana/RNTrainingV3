import React from 'react';
import { StyleSheet, View, Text,Image,ScrollView,Platform,TouchableOpacity,SafeAreaView } from 'react-native';
import CustomButton from '../components/CustomButton';
import SpacerTop from '../components/SpacerTop';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import {Icon} from 'react-native-elements';
import Colors from '../constants/Colors';

const headerHeight = Platform.OS === "android" ? 56 : 46;
const MyPageScreen = props =>{
    return (
        <SafeAreaView style={styles.container}>
            <FocusAwareStatusBar
                barStyle='dark-content'
                backgroundColor='white' />
                <View style={{overflow:'hidden',paddingBottom:5}}>
                    <View 
                        style={styles.customToolbar}>
                        <Text style={styles.title}>TrainingApps</Text>
                        <TouchableOpacity
                            style={styles.logoutContainer}
                            onPress={() => {}}>
                            <Text style={styles.logoutText}>Keluar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            <ScrollView contentContainerStyle={{flexGrow:1}}>

            </ScrollView>
        </SafeAreaView>
    );
};

MyPageScreen.navigationOptions={
    title: 'MyPage',
    tabBarIcon: ({ tintColor }) => <Icon type='material' name='person' color={tintColor} />,
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        marginTop: Platform.OS == 'ios' ? StatusBar.currentHeight : 0
    },
    customToolbar: {
        height: headerHeight,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity:  0.4,
        shadowRadius: 3,
        elevation: 10,
        shadowOffset: { width: 1, height: 1 },
    },
    title: {
        fontFamily: 'rubik-bold',
        fontSize: 20,
        alignSelf: 'center',
        color: 'black'
    },
    logoutContainer: {
        position: 'absolute',
        alignSelf: 'flex-end',
        right: 8,
        padding: 8
    },
    logoutText: {
        fontFamily: 'rubik-bold',
        fontSize: 14,
        color: Colors.primary
    },
})

export default MyPageScreen;
