import React from 'react';
import StackNavigation from '../components/StackNavigator';
import RegistrationTabScreen from '../screens/registrationtab';
import AddMemberScreen from '../screens/addmember';

export function RegistrationStack({navigation}) {
    return(       
        <StackNavigation title="Member Registration" name="Registration" component={AddMemberScreen} navigation={navigation} />
    )
}

export default RegistrationStack;