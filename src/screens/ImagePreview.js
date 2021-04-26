
import React from 'react';
import { ScrollView, StyleSheet, View, Text, Image } from 'react-native';


const ImagePreview = props =>{
    const imageUrl = props.navigation.getParam('url')
    return(        
        <View style={styles.imageContainer}>
                <Image style={styles.image} source={{uri: imageUrl ? imageUrl : 'https://via.placeholder.com/150'}}/>
        </View>
    );
};


const styles = StyleSheet.create({
    imageContainer:{
        width:'100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'black'
    },
    image:{
        width:'100%',
        aspectRatio: 1,
    }
  });

export default ImagePreview;