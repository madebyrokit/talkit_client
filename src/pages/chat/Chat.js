import React, { useEffect, useRef, useState } from 'react';
import styled from './Chat.module.css';
import { Client } from '@stomp/stompjs';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';

const Chat = () => {
    const [client, setClient] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState(''); 
    const [userName, setUserName] = useState('');

    const messagesEndRef = useRef(null);

    const [ref, inView] = useInView({
        threshold: 0.5,
    });

    const generateUUID = () => {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }


    const sendMessage = (event) => {
        event.preventDefault();
        if (client && message.trim() !== '') {
            const messagePayload = {
                username: userName,
                content: message, 
                uuid: sessionStorage.getItem("uuid"),
            };

            client.publish({
                destination: '/app/message',
                body: JSON.stringify(messagePayload)
            });
            setMessage('');
        }
    };

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/chat`)
            .then((result) => {
                setMessages(result.data);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });
        const stompClient = new Client({
            brokerURL: `${process.env.REACT_APP_WEBSOCKET_URL}/ws`,
            connectHeaders: {},
            debug: (str) => { }, 
            onConnect: () => {
                stompClient.subscribe('/topic/message', (messageOutput) => {
                    const receivedMessage = JSON.parse(messageOutput.body);
                    setMessages((prev) => [...prev, receivedMessage])
                });
            },
            onWebSocketError: (error) => {
                console.error('WebSocket 오류:', error);
            },
            onDisconnect: () => {
                console.log('WebSocket 연결 종료');
            },
        });

        stompClient.activate(); 
        setClient(stompClient);

        if (sessionStorage.getItem("uuid") == null) {
            sessionStorage.setItem("uuid", generateUUID());
        }

    }, []);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <div className={styled.main}>
            <div className={styled.messageContainer}>
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={msg.uuid === sessionStorage.getItem("uuid") ? styled.myMessage : styled.otherMessage}
                        ref={ref}
                    >

                        {msg.uuid === sessionStorage.getItem("uuid") ? (
                            <p>{msg.content}</p>
                        ) : (

                            <p>{msg.username}: {msg.content}</p>
                        )}
                    </div>
                ))}
                <div ref={messagesEndRef} />

            </div>
            <form onSubmit={sendMessage} className={styled.footer}>
                <input
                    className={styled.inputelement_name}
                    type="text"
                    placeholder="이름"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <input
                    type="text"
                    className={styled.inputelement}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="메세지를 입력하세요."
                />
                <button className={styled.button_element} id="chat" type="submit">&nbsp;</button>
            </form>




        </div>
    );
};

export default Chat;
