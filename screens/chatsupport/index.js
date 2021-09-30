import React, {useCallback, useState, useEffect, useRef} from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles'
import ServiceNotYetAvailable from '../../components/ServiceNotYetAvailable';
import { GiftedChat } from 'react-native-gifted-chat';
//import createGuid from "react-native-create-guid";
import * as signalR from '@microsoft/signalr';


export function ChatSupportScreen() {
    const supportAvatarPath = require('../../assets/support_avatar.png');

    const [connection, setConnection] = useState(null)
    const [messages, setMessages] = useState([]);
    const recentChat = useRef(null);
  
    useEffect(() => {
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl('https://2060e971412c.ngrok.io/chat')
            .configureLogging(signalR.LogLevel.Information)
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, [])

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(result => {
                    console.log('Connected!');

                    connection.on("ReplyToClient", message => {

                        /*const newGuid = createGuid().then((guid) => {
                            return guid;
                        });*/
                        
                        const appendMessage = [
                            {
                                _id: Math.random(),
                                text: message.message,
                                createdAt: new Date(),
                                user: {
                                    _id: 2,
                                    name: message.user,
                                    avatar: supportAvatarPath,
                                },
                            },
                        ]

                        setMessages(previousMessages => GiftedChat.append(previousMessages, appendMessage))
                    });

                    connection.send('StartAsync', 'mobile', false)
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection]);

    useEffect(() => {
        //console.log(messages);
    },[messages])

    /*useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                _id: 2,
                name: 'React Native',
                avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ])
    }, [])*/

    const onSend = async (messages) => {
        console.log(messages);
        const chatMessage = {
            user: 'Mobile',
            message: messages[0].text
        };
        
        if(connection.connectionStarted) {
            try {
                await connection.send('SendMessageToSupport', chatMessage);

                setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
            }
            catch(e) {
                console.log(e);
            }
        } else {
            console.log('No connection to server yet.'); //Change to alert/modal
        }
    }
   

    /*async function sendMessageToHub() {
        const chatMessage = {
            user: 'Mobile',
            message: 'Hello from Mobile'
        };
        console.log(chatMessage);
        
        if(connection.connectionStarted) {
            try {
                await connection.send('SendMessage', chatMessage);
            }
            catch(e) {
                console.log(e);
            }
        } else {
            console.log('No connection to server yet.'); //Change to alert/modal
        }
    }*/

    return(
        <GiftedChat
            messages={messages}
            onSend={message => onSend(message)}
            user={{
                _id: 1,
                name: 'React Native',
                avatar: 'https://placeimg.com/140/140/any'
            }}
        />     
    );
}

export default ChatSupportScreen;