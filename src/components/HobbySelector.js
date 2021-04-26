import React,{useState,useEffect} from 'react'
import { TouchableOpacity,FlatList } from 'react-native'
import { StyleSheet, View, Text } from 'react-native'
import CustomButton from './CustomButton'
import Modal from 'react-native-modal';
import {CheckBox} from 'react-native-elements';

const HobbySelector = props =>{

    const [checkedList,setCheckedList] = useState([])
    const [checkedLabel,setCheckedLabel] = useState([])

    const handleSelectHobby = (value,label) =>{

        if(checkedList.includes(value)){
            //already in list
            const array = [...checkedList]
            const labelArray = [...checkedLabel]
            var index = array.indexOf(value)
            if(index!==-1){
                array.splice(index,1)
                labelArray.splice(index,1)
                setCheckedList(array)
                setCheckedLabel(labelArray)
            }
            console.log("already in list")
        }else{
            console.log("not in list")
            //not in list
            setCheckedList([...checkedList,value])
            setCheckedLabel([...checkedLabel,label])
        }
        console.log(value)
    }

    return (
        <Modal
            animationType='fade'
            onSwipeComplete={props.onCancel}
            onBackdropPress={props.onCancel}
            isVisible={props.isShowModal}
            style={{justifyContent:'center',alignItems:'center'}}
            >
                <View style={styles.modalCard}> 
                    <FlatList
                        data={props.lists}
                        keyExtractor={item=> item.key}
                        renderItem={(itemData)=>(
                            <CheckBox
                            containerStyle={{backgroundColor:'transparent',borderColor:'white',alignItems:'flex-start',justifyContent:'center'}}
                            title={itemData.item.label}
                            checkedColor='red'
                            uncheckedColor = 'black'
                            checked={checkedList.includes(itemData.item.value)}
                            onPress={handleSelectHobby.bind(this,itemData.item.value,itemData.item.label)}
                            />
                        )}
                        />
                        <View style={{flexDirection:'column',flex:1}}>
                        <CustomButton
                        title="Save"
                        onPress={props.onSave.bind(this,checkedList,checkedLabel)}
                        />
                        </View>
                    </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalView:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    },
    modalCard:{
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {width: 0,height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        padding: 20,
        position:'absolute'
    },
});
export default HobbySelector;