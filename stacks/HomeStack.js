import React from 'react';
import StackNavigation from '../components/StackNavigator';
import HomeScreen from '../screens/home';

export function HomeStack({navigation}) {
    return(       
        <StackNavigation title="Home" name="Home" component={HomeScreen} navigation={navigation} />
    )
}

export default HomeStack;