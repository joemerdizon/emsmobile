import React from 'react';
import RootScreen from '../screens/root';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function RootStack({navigation}) {
    return(             
        <Stack.Navigator headerMode='none'>
            <Stack.Screen name="root" component={RootScreen} />
        </Stack.Navigator>
    )
}

