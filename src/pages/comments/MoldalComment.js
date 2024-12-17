import React from "react";
import styled from "./ModalComment.module.css";

const ModalComment = ({ setModal }) => {
    return (
        <div className={styled.main}>
            <div className={styled.header}>
                <p>댓글 설정하기</p>
                <div onClick={() => { setModal(null) }}
                    className={styled.header_button}>
                    X
                </div>
            </div>
            <div className={styled.body}>
                <div className={styled.header_button}>신고하기</div>
                <div className={styled.header_button}>삭제하기</div>
            </div>
        </div>
    )
}

export default ModalComment;