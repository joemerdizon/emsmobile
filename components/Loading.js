import React from 'react';
import { StyleSheet } from 'react-native';
import { SkypeIndicator } from 'react-native-indicators';
import { ActivityIndicator } from 'react-native-paper';


export default function Loading() {
    return(
        <SkypeIndicator style={styles.indicator} />
    )
}


const styles = StyleSheet.create({
    indicator: {
        color: '#94c34c'
    }
});