import React from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const WebViewScreen = props =>{
    return (
        <WebView
        source={{ uri: 'https://www.tokopedia.com/terms' }}
        style={{ padding: 20 }}
        />
    );
};

WebViewScreen.navigationOptions={
    title: 'Term & Condition'
}


export default WebViewScreen;
