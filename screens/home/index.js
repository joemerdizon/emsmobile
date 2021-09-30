import React from 'react';
import { render } from 'react-dom';
import { Text, View, ScrollView } from 'react-native';
import CustomCard from '../../components/CustomCard';
import { CardMockData } from '../../mockdata/cardsmockdata';
import { styles } from './styles'

const mockdata = CardMockData;

function displayCards() {
    return mockdata.map((data) => {
        return ( <CustomCard key={data.Id} data={data} /> );
    });
}

export function HomeScreen() {
    return(
        <View style={styles.container}>
            {/* <ScrollView>
                <View style={styles.cards}>
                    {displayCards()}                
                </View>
            </ScrollView> */}
        </View>
    );
}

export default HomeScreen;