import React from 'react'
import { TouchableOpacity } from 'react-native'
import { StyleSheet, View, Text,Modal } from 'react-native'
import CustomButton from './CustomButton'

const CustomDialog = props =>{
    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={props.isShowModal}
            >
                <View style={styles.modalView}>
                    <View style={{backgroundColor:'black',flex:1,opacity:0.5,width:'100%',height:'100%'}}/>
                    <View style={styles.modalCard}>
                        <Text style={{fontSize:14, textAlign:'center',fontFamily:'rubik-bold'}}>{props.message}</Text>
                        <View style={{flexDirection:'row',height:30,marginTop:20,flex:1}}>
                            <View style={{flex:0.5,margin:5}}>
                                <CustomButton
                                    title={props.noTitle}
                                    onPress={props.onCancel}
                                    buttonStyle={{borderWidth:1}}
                                    type='outline'
                                    />
                            </View>
                            <View style={{flex:0.5,margin:5}}>
                                <CustomButton
                                    title={props.yesTitle}
                                    onPress={props.onOk}
                                    />
                            </View>
                            {/* <Text style={{fontSize:16,textAlign:'center',fontWeight:'bold',flex:1}} onPress={props.onOk}>{props.yesTitle}</Text>
                            <Text style={{fontSize:16,textAlign: 'center',fontWeight:'bold',flex:1}} onPress={props.onCancel}>{props.noTitle}</Text> */}
                        </View>
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
        padding: 30,
        position:'absolute'
    },
});
export default CustomDialog;