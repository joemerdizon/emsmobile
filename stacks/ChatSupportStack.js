import React from 'react';
import StackNavigation from '../components/StackNavigator';
import ChatSupportScreen from '../screens/chatsupport';

export function ChatSupportStack({navigation}) {
    return(       
        <StackNavigation title="Chat Support" name="ChatSupport" component={ChatSupportScreen} navigation={navigation} />
    )
}

export default ChatSupportStack;