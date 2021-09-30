import React from 'react';
import StackNavigation from '../components/StackNavigator';
//import AnswerPollScreen from '../screens/answerpoll';
import AnswerPollTabScreen from '../screens/answerpolltab';

export function AnswerPollStack({navigation}) {
    return(       
        <StackNavigation title="Answer Poll" name="AnswerPoll" component={AnswerPollTabScreen} navigation={navigation} />
    )
}

export default AnswerPollStack;