import React from 'react';
import { StyleSheet,View,Text,TouchableOpacity, SafeAreaView,ScrollView} from 'react-native';
import Colors from '../constants/Colors';
import CustomInput from '../components/CustomInput';
import RNPickerSelect from 'react-native-picker-select';
import {Icon} from 'react-native-elements';
import SpacerTop from '../components/SpacerTop';

const EditProfileScreen = props =>{
    return (
        <SafeAreaView
            style={styles.container}>
            <ScrollView
            keyboardShouldPersistTaps="always"
            contentContainerStyle={styles.scrollView}>
                <CustomInput
                id = 'username'
                label = 'Username'
                required = {true}
                onInputChange={()=>{}}
                />
                <SpacerTop spacer={8}/>
                <View
                style={styles.pickerContainer}
                >
                    <Text style={styles.pickerLabel}>Date of Birth</Text>
                    <RNPickerSelect
                    style={{ ...pickerSelectStyles }}
                    useNativeAndroidPickerStyle={false}
                    value={0}
                    placeholder={{ key: 0, label: "Date of Birth", value: 0 }}
                    onValueChange={(itemValue, itemIndex) => {
                        
                    }}
                    items={[]}
                    Icon={() => {
                        return <Icon type='ionicon' name='caret-down-circle-outline' color='black' />
                    }}
                />
                </View>
                <SpacerTop spacer={8}/>
                <View
                style={styles.pickerContainer}
                >
                    <Text style={styles.pickerLabel}>Sex</Text>
                    <RNPickerSelect
                    style={{ ...pickerSelectStyles }}
                    useNativeAndroidPickerStyle={false}
                    value={0}
                    placeholder={{ key: 0, label: "Sex", value: 0 }}
                    onValueChange={(itemValue, itemIndex) => {
                        
                    }}
                    items={[]}
                    Icon={() => {
                        return <Icon type='ionicon' name='caret-down-circle-outline' color='black' />
                    }}
                />
                </View>
                <SpacerTop spacer={8}/>
                <View
                style={styles.pickerContainer}
                >
                    <Text style={styles.pickerLabel}>Occupation</Text>
                    <RNPickerSelect
                    style={{ ...pickerSelectStyles }}
                    useNativeAndroidPickerStyle={false}
                    value={0}
                    placeholder={{ key: 0, label: "Occupation", value: 0 }}
                    onValueChange={(itemValue, itemIndex) => {
                        
                    }}
                    items={[]}
                    Icon={() => {
                        return <Icon type='ionicon' name='caret-down-circle-outline' color='black' />
                    }}
                />
                </View>
                <SpacerTop spacer={8}/>
                <View
                style={styles.pickerContainer}
                >
                    <Text style={styles.pickerLabel}>Area</Text>
                    <RNPickerSelect
                    style={{ ...pickerSelectStyles }}
                    useNativeAndroidPickerStyle={false}
                    value={0}
                    placeholder={{ key: 0, label: "Area", value: 0 }}
                    onValueChange={(itemValue, itemIndex) => {
                        
                    }}
                    items={[]}
                    Icon={() => {
                        return <Icon type='ionicon' name='caret-down-circle-outline' color='black' />
                    }}
                />
                </View>
                <SpacerTop spacer={8}/>
                <View
                style={styles.pickerContainer}
                >
                    <Text style={styles.pickerLabel}>Hobby</Text>
                    <RNPickerSelect
                    style={{ ...pickerSelectStyles }}
                    useNativeAndroidPickerStyle={false}
                    value={0}
                    placeholder={{ key: 0, label: "Hobby", value: 0 }}
                    onValueChange={(itemValue, itemIndex) => {
                        
                    }}
                    items={[]}
                    Icon={() => {
                        return <Icon type='ionicon' name='caret-down-circle-outline' color='black' />
                    }}
                />
                </View>
                <SpacerTop spacer={8}/>
                <View
                style={styles.pickerContainer}
                >
                    <Text style={styles.pickerLabel}>Character</Text>
                    <RNPickerSelect
                    style={{ ...pickerSelectStyles }}
                    useNativeAndroidPickerStyle={false}
                    value={0}
                    placeholder={{ key: 0, label: "Character", value: 0 }}
                    onValueChange={(itemValue, itemIndex) => {
                        
                    }}
                    items={[]}
                    Icon={() => {
                        return <Icon type='ionicon' name='caret-down-circle-outline' color='black' />
                    }}
                />
                </View>
                <CustomInput
                id = 'freeword'
                label = 'FreeWord'
                required = {true}
                onInputChange={()=>{}}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

EditProfileScreen.navigationOptions=navData=>{
    return{
        title: 'EditProfile',
        headerRight: ()=>(
            <TouchableOpacity
                style={styles.actionContainer}
                >
                <Text style={styles.actionSave}>Save</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'white',
    },
    pickerContainer:{
        flexDirection: 'column',
    },
    pickerLabel:{
        fontSize:14,
        marginStart:8,
        fontFamily:'rubik-bold',
        color: 'black' 
    },
    scrollView:{
        padding: 20,
        flexGrow: 1,
    },
    actionContainer: {
        padding: 8,
        marginEnd: 5,
    },
    actionSave:{
        fontFamily: 'rubik-bold',
        fontSize: 14,
        color: Colors.primary
    }
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 14,
        paddingVertical: 8,
        paddingHorizontal: 10,
        color: 'black',
        fontFamily: 'roboto-regular',
        paddingRight: 30, // to ensure the text is never behind the icon,
        borderBottomWidth: 1,
        borderBottomColor:'black'
    },
    inputAndroid: {
        fontSize: 14,
        paddingHorizontal: 10,
        paddingVertical: 8,
        color: 'black',
        fontFamily: 'roboto-regular',
        paddingRight: 30, // to ensure the text is never behind the icon
        borderBottomWidth: 0.5,
        borderBottomColor:'black',
    },
    iconContainer: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        right: 10
    }
});


export default EditProfileScreen;
