import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import { Card, Title, Paragraph, Button, Chip } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';  

export default function CustomCard(props) {
    return (
        <Card style={styles.container}>
            <Card.Content>
                <Title style={styles.title}>{props.data.Title}</Title>
                {/* <Card.Cover style={styles.cover} source={{ uri: props.data.Cover }} /> */}
                <Card.Cover style={styles.cover} source={{ uri: props.data.Cover}} />
                <Paragraph style={styles.paragraph}>{props.data.PublishedDate}</Paragraph>
                <Paragraph style={styles.paragraph}>{props.data.Content}</Paragraph>
                <TouchableOpacity style={{marginTop: 5}}>
                    <Text style={{color: '#1e90ff'}}>View More</Text>
                </TouchableOpacity>
            </Card.Content>          
        </Card>
    )
}

const {width, height} = Dimensions.get("screen");

const styles = StyleSheet.create({
    container: {
        width: width / 1.08,
        marginVertical: 5
    },
    paragraph: {
        textAlign: 'justify',
        fontSize: 13
    },
    cover: {
        height: height * 0.2
    },
    title: {
        marginTop: 10,
        fontSize: 16
    },
    action: {
        marginTop: 0,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    button: {
        backgroundColor: '#ffa500',
        marginBottom: 10
    },  
})