import React from 'react';
import { View, TextInput, Text } from 'react-native'
import {styles} from '../FormTextInput/style'

export function FormTextInput({ label, placeholder }) {
    return(
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput style={styles.input} placeholder={placeholder} />
        </View>
    );
};
