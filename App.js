import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font';
import { ThemeProvider } from 'react-native-elements';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import Colors from './src/constants/Colors';
import authReducer from './store/reducers/authReducer';
import MainNavigator from './src/navigation/MainNavigator';
import NavigationService from './src/navigation/navigationRef'


const rootReducer = combineReducers({
  authReducer: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFont = () => {
  return Font.loadAsync({
      'rubik-medium': require('./assets/font/Rubik-Medium.ttf'),
      'rubik-bold': require('./assets/font/Rubik-Bold.ttf'),
      'rubik-regular': require('./assets/font/Rubik-Regular.ttf'),
  })
};

export default function App() {

  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.allowFontScaling = false;
  const theme = {
    colors: {
        primary: Colors.primary,
        colorPrimary: Colors.primary,
        primaryColor: Colors.primary
    }
  }
  const [fontLoaded, setFontLoaded] = useState(false);
  if (!fontLoaded) {
    return (
        <AppLoading
            startAsync={fetchFont}
            onError={err => { }}
            onFinish={() => {
                setFontLoaded(true)
            }} />
    )
  }


  return (
    <SafeAreaProvider>
      <ThemeProvider
          theme={theme}>
          <Provider store={store}>
              <MainNavigator ref={(navigator) => { NavigationService.setTopLevelNavigator(navigator) }} />
          </Provider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};
