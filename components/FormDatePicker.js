import React, { useState } from 'react';
import { View, Platform , StyleSheet, Dimensions, Text} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {TextInput} from 'react-native-paper'

export function FormDatePicker(props) {
    //const defaultDateValue = new Date(1598051730000);
    //value={date !== defaultDateValue ? formatDate(date) : ''}
    console.log(props.value)
    const [date, setDate] = useState(new Date(1598051730000));
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        console.log(currentDate);
        //setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };
    
    const showMode = () => {
        setShow(!show);
    };

    function handelOnChange() {
        props.onChange;
        console.log('foo')
    }
    
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('/').toString();
    }

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
                value={formatDate(props.value)}
                outlineColor='#1e90ff' 
                onFocus={showMode} 
                style={styles.input}
                theme={{ colors: { primary: '#1e90ff',underlineColor:'transparent',}}}
                />
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={props.value}
                    mode='date'
                    is24Hour={true}
                    display="default"
                    onChange={() => {
                        setShow(Platform.OS === 'ios');
                        props.onChange;
                    }}
                />
            )}
        </View>
        
    );
}

const {width, height} = Dimensions.get("screen");

const styles = StyleSheet.create({
    container: {      
        marginVertical: 4,
    },
    input: {
        width: width / 1.10,
        height: 40,
        marginVertical: 4,
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

export default FormDatePicker;