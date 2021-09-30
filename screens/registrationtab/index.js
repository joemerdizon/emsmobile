import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { MaterialIcons } from '@expo/vector-icons';
import AddMemberScreen from '../addmember';
import MemberListScreen from '../memberlist';

const Tab = createMaterialBottomTabNavigator();


export default function RegistrationTabScreen() {
    return(
        <Tab.Navigator
            initialRouteName="AddMember"
            activeColor="#ffffff"
            barStyle={{ backgroundColor: '#94c34c' }}
        >
            <Tab.Screen
                name="AddMember" 
                component={AddMemberScreen}
                options={{
                    tabBarLabel: 'Add Member',
                    tabBarIcon: ({color}) => (
                        <MaterialIcons name="group-add" color={color} size={26} />
                    )                      
                }}
            />
            <Tab.Screen
                name="MemberList" 
                component={MemberListScreen}
                options={{
                    tabBarLabel: 'Member List',
                    tabBarIcon: ({color}) => (
                        <MaterialIcons name="list" color={color} size={26} />
                    )                      
                }}
            />
        </Tab.Navigator>
    )
}