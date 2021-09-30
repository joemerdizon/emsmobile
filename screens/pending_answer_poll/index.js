import React from 'react'; 
import {ScrollView, View} from 'react-native'
import Poll from '../../components/Poll';


export default function PendingAnswerPollScreen() {

    const mockdata = [
        {
            Id: 1,
            Questiion: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            Options: [
                {
                    text: 'Option 1',
                    id: 1
                },
                {
                    text: 'Option 2',
                    id: 2
                },
                {
                    text: 'Option 3',
                    id: 3
                },
                {
                    text: 'Option 4',
                    id: 4
                }
            ] 
        },
        {
            Id: 2,
            Questiion: 'Contrary to popular belief.',
            Options: [
                {
                    text: 'Yes',
                    id: 1
                },
                {
                    text: 'No',
                    id: 2
                },            
            ] 
        },
        {
            Id: 3,
            Questiion: 'Where can I get some?',
            Options: [
                {
                    text: 'Here',
                    id: 1
                },
                {
                    text: 'Nowhere',
                    id: 2
                },
                {
                    text: 'Somewhere',
                    id: 3
                },               
            ] 
        }
    ]

    function loadPolls() { //Api call
        return mockdata.map((data) => {
            return (
                <Poll key={data.Id} question={data.Questiion} options={data.Options} />
            )
        })
    }
    return(
        <ScrollView>
            <View style={{flex: 1}}>
                {
                    loadPolls()
                }
            </View>
        </ScrollView>
        
    )
}