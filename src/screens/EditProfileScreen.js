import React,{useReducer,useCallback,useEffect,useState} from 'react';
import { StyleSheet,View,Text,TouchableOpacity, SafeAreaView,ScrollView} from 'react-native';
import Colors from '../constants/Colors';
import CustomInput from '../components/CustomInput';
import * as commonActions from '../../store/actions/commonActions';
import RNPickerSelect from 'react-native-picker-select';
import {Icon} from 'react-native-elements';
import SpacerTop from '../components/SpacerTop';
import { useDispatch, useSelector } from 'react-redux';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import HobbySelector from '../components/HobbySelector';

const EDIT = 'EDIT';

const formReducer = (state,action)=>{
    if(action.type===EDIT){
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        }
        const updatedValidities={
            ...state.inputValidities,
            [action.input]: action.isValid
        }
        let updatedFormIsValid = true
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid : updatedFormIsValid,
            inputValues: updatedValues,
            inputValidities: updatedValidities
        };
    }
    return state
}

const EditProfileScreen = props =>{
    const GenderData = useSelector(state => state.authReducer.GENDER_DATA);
    const JobData = useSelector(state => state.authReducer.JOB_DATA);
    const AreaData = useSelector(state => state.authReducer.AREA_DATA);
    const HobbyData = useSelector(state => state.authReducer.HOBBY_DATA);
    const CharacterData = useSelector(state => state.authReducer.CHARACTER);
    const [showDatePicker,setShowdatePicker] = useState(false)
    const [showHobbySelector,setShowHobbySelector] = useState(false)

    const dispatch = useDispatch()
    const [formState, dispatchFormState]=useReducer(formReducer,{
        inputValues:{
            username:useSelector(state => state.authReducer.nickname),
            birthday: useSelector(state => state.authReducer.birthday),
            freeword: useSelector(state => state.authReducer.aboutMe),

            //selector value
            sex: useSelector(state => state.authReducer.gender),
            occupation: useSelector(state => state.authReducer.aboutMe),
            area: useSelector(state => state.authReducer.residence),
            hobby: useSelector(state => state.authReducer.hobby),
            character: useSelector(state => state.authReducer.personality)
        },
        inputValidities:{
            username: true,
            birthday: true,
            freeword: true,

            //selector value
            sex: true,
            occupation: true,
            area:true,
            hobby: true,
            character: true
        },
        formIsValid:false
    });

    const inputChangeHandler = useCallback((inputIdentifier, inputValue,inputValidity)=>{
        dispatchFormState({type: EDIT,value: inputValue,isValid: inputValidity,input:inputIdentifier});
    },[dispatchFormState]);

    const handleDate = (date)=>{
        setShowdatePicker(false)
        const stringDate = commonActions.getDateTime(date,"yyyy/MM/DD");
        inputChangeHandler("birthday",stringDate,true)
        console.log(date)
        console.log(stringDate)
    }

    return (
        <SafeAreaView
            style={styles.container}>
            <DateTimePickerModal
                isVisible={showDatePicker}
                mode="date"
                maximumDate={new Date()}
                onConfirm={handleDate}
                onCancel={()=>{ setShowdatePicker(false) }}
            />
            <HobbySelector
            isShowModal={showHobbySelector}
            onCancel = {()=>{
                setShowHobbySelector(false)
            }}
            lists= {HobbyData}
            onSave={(valueList,labelList)=>{
                setShowHobbySelector(false)
                console.log(labelList)
                var text = ""
                for(var x in labelList){
                    text += labelList[x]+" "
                }
                console.log(text)
            }}
            />
            <ScrollView
            keyboardShouldPersistTaps="always"
            contentContainerStyle={styles.scrollView}>
                <CustomInput
                id = 'username'
                label = 'Username'
                onInputChange={inputChangeHandler}
                />
                <SpacerTop spacer={8}/>
                <View
                style={styles.pickerContainer}
                >
                    <Text style={styles.pickerLabel}>Date of Birth</Text>
                    <View style={{flexDirection:'row'}}>
                        <Text 
                        style={{flex: 1,fontSize:14,paddingHorizontal:9,paddingVertical:8,fontFamily:'rubik-regular',color: formState.inputValues.birthday===null ? Colors.greyLight : 'black' }}
                        onPress={()=>{
                            setShowdatePicker(true)
                        }}
                            >{formState.inputValues.birthday===null ? 'Date of Birth' : `${formState.inputValues.birthday}`}
                        </Text>
                        <Icon style={{marginRight:10}} type='ionicon' name='caret-down-circle-outline' color='black' />
                    </View>
                    <SpacerTop spacer={5} />
                    <View style={{borderBottomWidth:0.5,borderBottomColor:'black'}} />
                </View>
                <SpacerTop spacer={8}/>
                <View
                style={styles.pickerContainer}
                >
                    <Text style={styles.pickerLabel}>Sex</Text>
                    <RNPickerSelect
                    style={{ ...pickerSelectStyles }}
                    useNativeAndroidPickerStyle={false}
                    value={formState.inputValues.sex}
                    placeholder={{ key: 0, label: "Sex", value: 0 }}
                    onValueChange={(itemValue, itemIndex) => {
                        inputChangeHandler("sex",itemValue,true)
                    }}
                    items={GenderData}
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
                    value={formState.inputValues.occupation}
                    placeholder={{ key: 0, label: "Occupation", value: 0 }}
                    onValueChange={(itemValue, itemIndex) => {
                        inputChangeHandler("occupation",itemValue,true)
                    }}
                    items={JobData}
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
                    value={formState.inputValues.area}
                    placeholder={{ key: 0, label: "Area", value: "" }}
                    onValueChange={(itemValue, itemIndex) => {
                        inputChangeHandler("area",itemValue,true)
                    }}
                    items={AreaData}
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
                    <View style={{flexDirection:'row'}}>
                        <Text 
                        style={{flex: 1,fontSize:14,paddingHorizontal:9,paddingVertical:8,fontFamily:'rubik-regular',color: formState.inputValues.hobby===null ? Colors.greyLight : 'black' }}
                        onPress={()=>{
                            setShowHobbySelector(true)
                        }}
                            >{formState.inputValues.hobby==="" ? 'Hobby' : `${formState.inputValues.hobby}`}
                        </Text>
                        <Icon style={{marginRight:10}} type='ionicon' name='caret-down-circle-outline' color='black' />
                    </View>
                    <SpacerTop spacer={5} />
                    <View style={{borderBottomWidth:0.5,borderBottomColor:'black'}} />
                </View>
                <SpacerTop spacer={8}/>
                <View
                style={styles.pickerContainer}
                >
                    <Text style={styles.pickerLabel}>Character</Text>
                    <RNPickerSelect
                    style={{ ...pickerSelectStyles }}
                    useNativeAndroidPickerStyle={false}
                    value={formState.inputValues.character}
                    placeholder={{ key: 0, label: "Character", value: 0 }}
                    onValueChange={(itemValue, itemIndex) => {
                        inputChangeHandler("character",itemValue,true)
                    }}
                    items={CharacterData}
                    Icon={() => {
                        return <Icon type='ionicon' name='caret-down-circle-outline' color='black' />
                    }}
                />
                </View>
                <CustomInput
                id = 'freeword'
                label = 'FreeWord'
                onInputChange={inputChangeHandler}
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
        fontFamily: 'rubik-regular',
        paddingRight: 30, // to ensure the text is never behind the icon,
        borderBottomWidth: 1,
        borderBottomColor:'black'
    },
    inputAndroid: {
        fontSize: 14,
        paddingHorizontal: 10,
        paddingVertical: 8,
        color: 'black',
        fontFamily: 'rubik-regular',
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
