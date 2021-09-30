import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import {TextInput} from 'react-native-paper'

const {width, height} = Dimensions.get("screen");

export default function FormTextInput(props) {
    return(       
        <View style={styles.container}>
            <View style={styles.labelContainer}>
                {props.isRequired && 
                    <Text style={{color: '#b22222', fontSize: 13, fontWeight: 'bold'}}>* </Text>
                }
                <Text style={styles.label}>{props.label}</Text>
            </View>       
            <TextInput 
                mode='outlined' 
                outlineColor='#1e90ff' 
                style={styles.input}
                theme={{ colors: { primary: '#1e90ff',underlineColor:'transparent',}}}
                onChangeText={props.onChangeText}
                value={props.value}
           />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 4,
    },
    input: {
        width: width / 1.10,
        height: 40,
        fontSize: 14,    
    },
    labelContainer: {
        flexDirection: 'row'
    },
    label:{
        fontSize: 13,
        color: "#696969",
    }
});