import React from "react";
import styled from "./Chat.module.css";

const Chat = () => {
    return (
        <div className={styled.main}>
            <div className={styled.section}>
                <div className={styled.header}>
                    <p>헤더</p>
                </div>
                <div className={styled.body}>
                    <p>바디</p>
                </div>
                <div className={styled.footer}>
                    <p>푸터</p>
                </div>
            </div>
        </div>
    );
}

export default Chat;