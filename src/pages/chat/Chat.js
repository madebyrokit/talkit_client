import React, { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import styled from './Chat.module.css';

const Chat = () => {
    const [client, setClient] = useState(null);  // STOMP 클라이언트 상태
    const [messages, setMessages] = useState([]);  // 수신한 메시지 목록
    const [message, setMessage] = useState('');  // 입력된 메시지 상태
    const [userName, setUserName] = useState('');  // 사용자 이름
    const [isNameSet, setIsNameSet] = useState(false);  // 이름이 설정됐는지 여부
    const [isNameChanging, setIsNameChanging] = useState(false);  // 이름 변경 중 여부
    const [tempName, setTempName] = useState(userName);  // 임시 이름 저장 (이름 변경 시 사용)

    useEffect(() => {
        if (!isNameSet) return;  // 이름이 설정되지 않으면 WebSocket 연결을 하지 않음

        // STOMP 클라이언트 설정
        const stompClient = new Client({
            brokerURL: 'ws://192.168.31.181:8080/ws',
            connectHeaders: {},
            debug: (str) => {
                console.log(str);
            },
            onConnect: () => {
                // 메시지를 받을 때마다 상태에 추가
                stompClient.subscribe('/topic/message', (messageOutput) => {
                    const receivedMessage = JSON.parse(messageOutput.body);
                    setMessages((prevMessages) => [...prevMessages, receivedMessage]);
                });
            },
            onWebSocketError: (error) => {
                console.error('WebSocket error: ', error);
            },
            onDisconnect: () => {
                console.log('Disconnected');
            },
        });

        stompClient.activate(); // WebSocket 연결 시작
        setClient(stompClient);

        // Cleanup: 컴포넌트 언마운트 시 WebSocket 연결 종료
        return () => {
            if (client) {
                client.deactivate();
            }
        };
    }, [isNameSet]);  // 이름이 설정되었을 때만 WebSocket 연결을 시작

    // 사용자 이름 설정 함수
    const handleSetName = (name) => {
        if (name.trim() !== '') {
            setUserName(name);
            setTempName(name);  // 이름 변경 시 임시 저장
            setIsNameSet(true);  // 이름 설정 완료
        }
    };

    // 사용자 이름 변경 함수
    const handleChangeName = () => {
        setIsNameChanging(true);
    };

    const handleSubmitNewName = (newName) => {
        if (newName.trim() !== '') {
            setUserName(newName);
            setTempName(newName);  // 새로운 이름 저장
            setIsNameChanging(false);  // 이름 변경 완료
        }
    };

    // 메시지 전송 함수
    const sendMessage = () => {
        if (client && message.trim() !== '') {
            const messagePayload = {
                from: userName,  // 메시지 발신자 이름
                text: message,   // 메시지 내용
            };

            // 서버로 메시지 전송
            client.publish({
                destination: '/app/message',
                body: JSON.stringify(messagePayload),
            });
            setMessage('');  // 메시지 입력창 초기화
        }
    };

    // 사용자 이름을 설정하기 위한 UI
    if (!isNameSet) {
        return (
            <div className={styled.main}>
                <h2>Enter your name</h2>
                <input
                    type="text"
                    placeholder="Your Name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <button onClick={() => handleSetName(userName)}>Set Name</button>
            </div>
        );
    }

    return (
        <div className={styled.main}>
            <h2>WebSocket Chat</h2>

            {/* 이름 변경 버튼 */}
            <div className={styled.nameChangeContainer}>
                <span>Current Name: <strong>{userName}</strong></span>
                <button onClick={handleChangeName}>Change Name</button>
            </div>

            {/* 이름 변경 UI */}
            {isNameChanging && (
                <div className={styled.nameChangeForm}>
                    <input
                        type="text"
                        placeholder="New Name"
                        onChange={(e) => setTempName(e.target.value)}
                        value={tempName}
                    />
                    <button onClick={() => handleSubmitNewName(tempName)}>Submit</button>
                    <button onClick={() => setIsNameChanging(false)}>Cancel</button>
                </div>
            )}

            <div className={styled.messageContainer}>
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={msg.from === userName ? styled.myMessage : styled.otherMessage}
                    >
                        {/* 내 메시지일 경우에는 나만 보이도록 */}
                        {msg.from === userName ? (
                            <strong>{msg.text}</strong>
                        ) : (
                            // 다른 사람의 메시지는 발신자 이름 포함하여 표시
                            <strong>{msg.from}: {msg.text}</strong>
                        )}
                    </div>
                ))}
            </div>

            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chat;
