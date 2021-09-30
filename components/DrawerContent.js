import React, {useContext, useEffect, useState} from 'react';
import { View, StyleSheet, Image } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch,
} from 'react-native-paper'
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import { MaterialIcons } from '@expo/vector-icons';
import { LOGOPATH, AVARTARPATH, FONTPATH } from '../constants/paths'
import {useFonts} from 'expo-font'
import AppLoading from 'expo-app-loading';
import { AuthContext } from '../context/context';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function DrawerContent(props) {

    const { signOut} = useContext(AuthContext)
    const [isDarkTheme, setIsDarkTheme] = React.useState(false);
    const [userDetails, setUserDetails] = useState({
        userName: null,
        userFullName: null,
        userToken: null
    });

    useEffect(() => {
        retrieveUserDetails()
    },[]);


    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    }

    let [fontsLoaded] = useFonts({
       'OpenSans-ExtraBold': FONTPATH.OpenSansExtraBold,
    });

    async function retrieveUserDetails() {
        try {
            const userDto = await AsyncStorage.getItem('userDetails');
            if(userDto != null) {
                setUserDetails(JSON.parse(userDto));
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...[props]}>
                <View style={styles.drawerContent}>
                    <Drawer.Section>
                        <View style={styles.logoSection}>
                            <Image source={LOGOPATH} style={styles.logo}/>
                            <Text style={styles.logoTitle}>Election Management System</Text>
                        </View>
                    </Drawer.Section>                  

                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection: 'row'}}>
                            <Avatar.Image source={AVARTARPATH} size={50} style={{marginTop: 7}} />
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={styles.title}>{userDetails.userFullName}</Title>
                                <Caption style={styles.caption}>{userDetails.userName}</Caption>
                            </View>
                        </View>                   
                    </View>

                    <Drawer.Section title="Navigation" style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <MaterialIcons 
                                name='home'
                                color={color}
                                size={size}
                                />
                            )}
                            label="Home"
                            onPress={() => {props.navigation.navigate('Home')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <MaterialIcons 
                                name='group-add'
                                color={color}
                                size={size}
                                />
                            )}
                            label="Member Registration"
                            onPress={() => {props.navigation.navigate('Registration')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <MaterialIcons 
                                name='notifications'
                                color={color}
                                size={size}
                                />
                            )}
                            label="Notifications"
                            onPress={() => {props.navigation.navigate('Notifications')}}
                        />                      
                        <DrawerItem 
                            icon={({color, size}) => (
                                <MaterialIcons 
                                name='poll'
                                color={color}
                                size={size}
                                />
                            )}
                            label="Answer Poll"
                            onPress={() => {props.navigation.navigate('AnswerPoll')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <MaterialIcons 
                                name='perm-phone-msg'
                                color={color}
                                size={size}
                                />
                            )}
                            label="Chat Support"
                            onPress={() => {props.navigation.navigate('ChatSupport')}}
                        />
                    </Drawer.Section>
                    <Drawer.Section title="Preferences">
                        <TouchableRipple onPress={() => {toggleTheme()}}>
                            <View style={styles.preference}>
                                <Text>Dark Theme</Text>
                                <View pointerEvents="none">
                                    <Switch value={isDarkTheme}/>
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                </View>
              
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({color, size}) => (
                        <MaterialIcons 
                        name='exit-to-app'
                        color={color}
                        size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => signOut()}
                />
            </Drawer.Section>
        </View>
    )
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
      //marginTop: 50
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    logoSection: {
        marginTop: 15,
        //flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        width: 70,
        height: 70,
    },
    logoTitle: {
        marginTop: 12,
        marginBottom: 12,
        fontSize: 15,
        //fontWeight: 'bold',
        fontFamily: 'OpenSans-ExtraBold',
        color: 'dodgerblue'
    }
});