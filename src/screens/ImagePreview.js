
import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';

const logOutZoomState = (event, gestureState, zoomableViewEventObject) => {
    console.log('');
    console.log('');
    console.log('-------------');
    console.log('Event: ', event);
    console.log('GestureState: ', gestureState);
    console.log('ZoomableEventObject: ', zoomableViewEventObject);
    console.log('');
    console.log(`Zoomed from ${zoomableViewEventObject.lastZoomLevel} to  ${zoomableViewEventObject.zoomLevel}`);
  }

const ImagePreview = props =>{
    const imageUrl = props.navigation.getParam('url')
    return(
        <View style={styles.imageContainer}>
            <ReactNativeZoomableView
            maxZoom={1.5}
            minZoom={1}
            zoomStep={0.5}
            initialZoom={1}
            bindToBorders={true}
            onZoomAfter={logOutZoomState}
            style={{
                backgroundColor: 'transparent',
            }}
            >
                <Image resizeMode='contain' style={styles.image} source={{uri: imageUrl ? imageUrl : 'https://via.placeholder.com/150'}}/>
            </ReactNativeZoomableView>
        </View>  
    );
};


const styles = StyleSheet.create({
    imageContainer:{
        flex:1,
        backgroundColor:'black'
    },
    image:{
        height:'100%'
    }
  });

export default ImagePreview;