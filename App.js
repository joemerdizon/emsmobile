import React, {useState, useEffect, useMemo , useReducer} from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer  } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeStack from './stacks/HomeStack';
import AnswerPollStack from './stacks/AnswerPollStack';
import RegistrationStack from './stacks/RegistrationStack';
import ChatSupportStack from './stacks/ChatSupportStack';
import DrawerContent from './components/DrawerContent';
import RootStack from './stacks/RootStack';
import NotificationsStack from './stacks/NotificationsStack';
import AppLoading from 'expo-app-loading';
import { AuthContext } from './context/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getToken } from './helpers/apiHelpers';
import { StatusCode } from './constants/statuscode';
import { WaveIndicator, MaterialIndicator, SkypeIndicator, PulseIndicator } from 'react-native-indicators';


const Drawer = createDrawerNavigator();

export default function App() {

  const initialLoginState = {
    isLoading: true,
    userName: null,
    password: null,
    userToken: null
  }

  const loginReducer = (prevState, action) => {
    switch(action.type) {
      case 'RETRIEVE_TOKEN' :
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false
        }
      case 'SIGNIN' :
        return {
          ...prevState,
          userName: action.userName,
          //password: action.password,
          userToken: action.token,
          isLoading: false
        }
      case 'SIGNOUT' :
        return {
          ...prevState,
          userName: null,
          //password: null,
          userToken: null,
          isLoading: false
        }
    }
  }

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState)

  const authContext = useMemo(() => ({
    signIn: async (userName, password) => {
      let apiGeneratedToken = null;
      let error = null;

      try {

        apiGeneratedToken = await getToken(userName, password).then(response => {
              return JSON.parse(response);
          }).then(parseJson => {
              console.log(parseJson.data);
              return parseJson.data.token;          
          }).catch(err => {
            if (err.response.status === StatusCode.UnAuthorized) {
              error = StatusCode.UnAuthorized
            }
          });
        
        console.log(error);
        
        if(!error) {
          const userDetails = {
            userName: userName,
            userToken: apiGeneratedToken
          }          
          await AsyncStorage.setItem('userDetails', JSON.stringify(userDetails));
        }      
      } catch(e) {
        console.log(e);
      }

      if(!error) {
        dispatch({type: 'SIGNIN', id: userName, token: apiGeneratedToken})
        return StatusCode.Ok;
      } else {
        return StatusCode.UnAuthorized;
      }

    },
    signOut: async() => {
      try {     
        await AsyncStorage.removeItem('userDetails');
      } catch(e) {
        console.log(e);
      }
      dispatch({type: 'SIGNOUT'})
    }
  }), []);

  useEffect(() => {
    setTimeout(async() => {
      let userToken = null;
      try {
        const userDetails = await AsyncStorage.getItem('userDetails');
        console.log(userDetails);
        userToken = JSON.parse(userDetails)["userToken"];
      } catch(e) {}
      dispatch({type: 'RETRIEVE_TOKEN', token: userToken})
    }, 1000);
  }, []);

  if(loginState.isLoading) {
      return ( 
        <SkypeIndicator />
      )
  }

  return (  
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        { loginState.userToken !== null ? (
          <Drawer.Navigator initialRouteName="Home" drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name="Home" component={HomeStack} />
            <Drawer.Screen name="Notifications" component={NotificationsStack} />
            <Drawer.Screen name="ChatSupport" component={ChatSupportStack} />
            <Drawer.Screen name="AnswerPoll" component={AnswerPollStack} />
            <Drawer.Screen name="Registration" component={RegistrationStack} />
          </Drawer.Navigator>
        ) :   <RootStack /> }      
      </NavigationContainer>
    </AuthContext.Provider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
