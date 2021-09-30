import React from 'react';
import StackNavigation from '../components/StackNavigator';
import NotificationScreen from '../screens/notification';

export function NotificationsStack({navigation}) {
    return(       
        <StackNavigation title="Notifications" name="Notifications" component={NotificationScreen} navigation={navigation} />
    )
}

export default NotificationsStack;