import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default function ServiceNotYetAvailable() {
    return(
        <View style={styles.container}>
            <Text>Service Not Yet Available!!!</Text>
        </View>
    )
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})