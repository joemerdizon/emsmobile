import React, {useRef, useEffect, useState} from 'react';
import {
    Animated,
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native'

export default function PollOption({
    id, 
    optionText, 
    voteCount, 
    showPercentage, 
    selectedOption,
    onClick,
    testClick })   
    {
    //console.log(testClick);
    const animatedValue = useRef(new Animated.Value(-1000)).current;
    const reactive =  useRef(new Animated.Value(-1000)).current;
    const [width, setWidth] = useState(0);
    const [step, setStep] = useState(0);


    useEffect(() => {
        Animated.timing(animatedValue,  {
            toValue: reactive,
            duration: 300,
            useNativeDriver: true
        }).start();
    }, [])

    useEffect(() => {
        reactive.setValue(-width + (width * step) / 10);
    }, [step, width])

    function handlePress() {
        /*if(selectedOption == 0) {
            const newVal = 3 + step;
            setStep(newVal);
            onClick();
            testClick(id);
        }       
        console.log(selectedOption);*/
        testClick();
    }

    return(
        <TouchableOpacity onPress={handlePress} disabled={false}>
            <View
                onLayout={e => {
                    const newWidth = e.nativeEvent.layout.width;
                    setWidth(newWidth);
                }} 
                style={{
                height: 40,
                backgroundColor: '#ffffff',
                borderRadius: 40,
                marginBottom: 7,
                overflow: 'hidden',
                borderColor: '#1e90ff'
                
            }}>
                <Animated.View 
                    style={{
                        height: 40,
                        width: '100%',
                        backgroundColor: '#1e90ff',
                        borderRadius: 40,
                        position: 'absolute',                      
                        transform: [{
                            translateX: animatedValue 
                        }]
                }} />
                <View style={{flex:2, flexDirection:"row", justifyContent:'space-between'}}>
                    <Text style={styles.optiontext}>{optionText}</Text>
                    { showPercentage ? (
                        <Text style={styles.percentage}>{voteCount}%</Text>
                        ) : ( null )
                    }        
                </View>
               
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    /*option: {
        borderRadius: 10,
        //backgroundColor: '#1e90ff',
        borderColor: '#1e90ff',
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderWidth: 1.5,
        width: width / 1.09,
        height: 40,
        marginBottom: 10
    }*/
    optiontext: {
        marginLeft: 15,
        marginTop: 10,
        fontSize: 13,
    },
    percentage: {
        fontSize: 13,
        marginTop: 10,
        marginRight: 15,
        color: '#a6a6a6'
    }

})