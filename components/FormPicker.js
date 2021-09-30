import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from "react-native";
import { Picker } from '@react-native-picker/picker';

function populateItems(items) {
    return items.map((item, index) => {
        return(<Picker.Item key={index} style={{fontSize: 10}} label={item.label} value={item.value} />)
    })
}

export default function FormPicker(props){
    const items = props.items
    const [selectedValue, setSelectedValue] = useState(null);
    
    return(
        <View style={styles.container}>
            <View style={styles.labelContainer}>
                {props.isRequired && 
                    <Text style={{color: '#b22222', fontSize: 13, fontWeight: 'bold'}}>* </Text>
                }
                <Text style={styles.label}>{props.label}</Text>
            </View>   
            <View style={styles.pickerContainer}>
                <Picker
                    value={props.value}
                    selectedValue={props.selectedValue}
                    style={styles.picker}
                    onValueChange={props.onValueChange}>
                    {
                        populateItems(items)
                    }
                </Picker>        
            </View>          
        </View>
        
    )
}

const {width, height} = Dimensions.get("screen");

const styles = StyleSheet.create({
    container: {      
        marginVertical: 4,
    },
    pickerContainer: {
        borderWidth : 1,
        borderColor: '#1e90ff',
        borderRadius: 5,
        marginTop: 5
    },
    picker: {
        width: width / 1.10,        
        height: 40,
        fontSize: 10,
        color:'gray',
    },
    labelContainer: {
        flexDirection: 'row'
    },
    label:{
        fontSize: 13,
        color: "#696969",
    }
});