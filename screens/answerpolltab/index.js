import React from 'react';
import { createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs'
import { MaterialIcons } from '@expo/vector-icons';
import PendingAnswerPollScreen from '../pending_answer_poll';
import CompletedAnswerPollScreen from '../completed_answer_poll';

const Tab = createMaterialBottomTabNavigator();


export default function AnswerPollTabScreen() {
    return(
        <Tab.Navigator
            initialRouteName="Pending"
            activeColor="#ffffff"
            barStyle={{ backgroundColor: '#94c34c'}}
        >
            <Tab.Screen
                name="Pending" 
                component={PendingAnswerPollScreen}
                options={{
                    tabBarLabel: 'Pending',
                    tabBarIcon: ({color}) => (
                        <MaterialIcons name="pending-actions" color={color} size={26} />
                    )                      
                }}
            />
            <Tab.Screen
                name="Completed" 
                component={CompletedAnswerPollScreen}
                options={{
                    tabBarLabel: 'Completed',
                    tabBarIcon: ({color}) => (
                        <MaterialIcons name="add-task" color={color} size={26} />
                    )                      
                }}
            />
        </Tab.Navigator>
    )
}