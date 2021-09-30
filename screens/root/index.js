import React, { useState, useContext, useEffect } from 'react'; 
import { View, Text, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { styles } from '../root/styles'
import * as Animatable from 'react-native-animatable'
import { MaterialIcons } from '@expo/vector-icons';
import { Button, TextInput } from 'react-native-paper';
import {useFonts} from 'expo-font'
import AppLoading from 'expo-app-loading';
import { FONTPATH } from '../../constants/paths'
import Constants from "expo-constants";
import { AuthContext } from '../../context/context';
import { StatusCode } from '../../constants/statuscode';
import Loading from '../../components/Loading';


const { manifest } = Constants;
const uri = `https://7744f3976ace.ngrok.io/api/Authentication/Login`;



export function ErrorText({error}) {
    return(
        <Text style={{marginTop: 10, color: '#b22222'}}>{error}</Text>
    )
}

export function ApiErrorText({error}) {
    return(
        <Text style={{color: '#b22222'}}>{error}</Text>
    )
}

export default function RootScreen(){

    const { signIn } = useContext(AuthContext);

    const [userCredentials, setUserCredentials] = useState({
        userName: '',
        password: ''
    });

    const [hasError, setHasError] = useState({
        isUsernameValid: true,
        isPasswordValid: true,
        hasApiError: false //Temporary
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        return () => console.log('cleanup');
    },[])

    useEffect(() => {
        return () => console.log('cleanup');
    },[])

    useEffect(() => {
        let unmounted = false;

        if(!unmounted) {
            setLoading(false)
        }
        return () => {
            unmounted = true;
        };
    },[])

    const [fontsLoaded] = useFonts({
        'Roboto-Bold': FONTPATH.RobotoBold,
    });
    
    if (!fontsLoaded) {
        return <Loading />;
    }

    const onLoginPress = () => {
        if(isFormValid()) {
            setLoading(true)
            signIn(userCredentials.userName, userCredentials.password).then(response => {
                if(response === StatusCode.UnAuthorized) {
                    setHasError({...hasError, apiCallStatusCode: true})
                }
                setLoading(false)
            });
        }       
    }
  
    /* Functions */

    function isFormValid(){
        if(userCredentials.userName === '') {
           setHasError(hasError.isUsernameValid = false)
        }
        
        if(userCredentials.password === '') {
            setHasError(hasError.isPasswordValid = false)
        }

        return (hasError.isUsernameValid === false || hasError.isPasswordValid === false) ? false : true
    }

    function handleUsernameChange(text) {
        if(text != ''){
            setHasError({...hasError, isUsernameValid: true})
        }       
        setUserCredentials({...userCredentials, userName: text})
    }

    function handlePasswordChange(text) {
        if(text !== ''){
            setHasError({...hasError, isPasswordValid: true})
        }
        setUserCredentials({...userCredentials, password: text})
    }

    /* End of Functions*/

    return(
        <View style={styles.container}>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <SafeAreaView style={styles.header}>
                        <Image style={styles.logo}  source={require('../../assets/logo.png')} />
                        <Text style={styles.brand}>Election{'\n'}Management{'\n'}System</Text>
                    </SafeAreaView>
                    <View style={styles.footer}>
                        <Text style={styles.signIn}>Sign in</Text>
                        <View style={styles.inputsContainer}>
                        { hasError.apiCallStatusCode && <ApiErrorText error='Invalid Username/Password' />}
                            <Text style={styles.label}>Username</Text>                  
                            <TextInput
                                value={userCredentials.userName}
                                style={styles.inputs}
                                autoCapitalize='none'
                                onChangeText={(text) => handleUsernameChange(text)}
                                underlineColorAndroid="transparent"
                                mode='outlined'
                                outlineColor='#0078fb' 
                                theme={{ colors: { primary: '#0078fb',underlineColor:'transparent',}}}
                                left={
                                    <TextInput.Icon style={{backgroundColor: 'none', color: 'none'}} name={() => <MaterialIcons style={{marginTop: 5}} name='person-outline' size={27} color='#0078fb'  />} />
                                }                         
                            />
                            { !hasError.isUsernameValid && <ErrorText error='Username is blank' />}
                        </View>
                        <View style={styles.inputsContainer}>
                            <Text style={styles.label}>Password</Text>
                            <TextInput
                                mode='outlined' 
                                value={userCredentials.password}
                                style={styles.inputs}
                                autoCapitalize='none'
                                secureTextEntry={true}
                                outlineColor='#0078fb' 
                                onChangeText={(text) => handlePasswordChange(text)}
                                underlineColorAndroid="transparent"
                                theme={{ colors: { primary: '#0078fb',underlineColor:'transparent',}}}
                                left={
                                    <TextInput.Icon style={{backgroundColor: 'none', color: 'none'}} name={() => <MaterialIcons outlineColor='transparent' style={{marginTop: 5}} name='lock-outline' size={27} color='#0078fb' />} />
                                }
                            />
                            { !hasError.isPasswordValid && <ErrorText error='Password is blank' />}
                        </View>
                        <View style={styles.inputsContainer}>
                            <TouchableOpacity style={styles.button} onPress={onLoginPress}>
                                <Text style={{fontSize: 16, color: 'white'}}>SIGN IN</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{alignSelf: 'baseline', marginLeft: 18, marginTop: 10}}>
                            <Text style={{color: '#1e90ff', fontSize: 14}}>Need help signing in?</Text>
                        </View> 
                    </View>
                </>         
            )}                        
        </View>
    )
}