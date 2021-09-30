import React, { useState } from 'react'; 
import { View, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    Dimensions, TouchableWithoutFeedback } from 'react-native';
import { useFonts } from 'expo-font'
import { FONTPATH } from '../constants/paths';
import AppLoading from 'expo-app-loading';
import { ProgressBar, Colors } from 'react-native-paper';
import PollOption from './PollOption';

export default function Poll({question, options}) {

    const [showPercentage, setShowPercentage] = useState(false)
    const [selectedOption, setSelectedOption] = useState(0)

    let [fontsLoaded] = useFonts({
        'OpenSans-Regular': FONTPATH.OpenSansRegular,
     });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    function onClick() {
        setShowPercentage(true);
    }

    function testClick(option) {
        /*console.log(optionId)
        setSelectedOption(optionId)*/
    }

    function loadOptions(options){
        return options.map((data) => {
            return(
                <PollOption 
                    key={data.id}
                    id={data.id} 
                    optionText={data.text} 
                    voteCount={3}
                    showPercentage={showPercentage}
                    selectedOption={selectedOption}
                    onClick={onClick}
                    testClick={(e) => console.log(e)}
                    />
            )
        })
    }
   
    return(
        <View style={styles.container}>
            <Text style={styles.question}>{question}</Text>
            <View style={styles.options}>
                {loadOptions(options)}
            </View>        
        </View>
    )
}



const { width } = Dimensions.get("screen");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 15        
    },
    question: {
        textAlign: 'justify',
        fontSize: 16,
        marginBottom: 10
    },
    options: {
        marginTop: 7,
    },
    option: {
        borderRadius: 10,
        //backgroundColor: '#1e90ff',
        borderColor: '#1e90ff',
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderWidth: 1.5,
        width: width / 1.09,
        height: 40,
        marginBottom: 10
    },
    optiontext: {
        marginLeft: 5,
        fontSize: 15
    }
});