import React from "react";
import styled from "./RightNavModel.module.css";
import { useNavigate } from "react-router-dom";
import UserInfo from "./UserInfo";
import { useAuth } from "../utils/AuthContext";

const RightNavModel = ({ setModal }) => {
    const { isLoggedIn, setIsLoggedIn, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        setIsLoggedIn(false);
        setModal(false);
        navigate('/');
    };

    const handleMypage = () => {
        navigate('/mypage');
        setModal(false);
    };

    return (
        <div className={`${styled.main}`}>

            {isLoggedIn ?
                <div className={styled.header}>
                    현재 로그인 계정
                    <UserInfo mbti={user.mbti_type} userImage={user.avatar} userId={user.username} />
                </div> : <></>
            }
            <div className={styled.body}>
                {isLoggedIn ?
                    <>
                        <p onClick={handleMypage}>마이페이지</p>
                        <p onClick={handleLogout}>로그아웃</p>
                        <p onClick={handleLogout}>글쓰기</p>
                    </> : <>
                        <p onClick={() => { navigate('/login') }}>로그인</p>
                    </>}
                <p onClick={() => { navigate('/') }}>토론하기</p>
                <p onClick={() => { navigate('/chat') }}>채팅하기</p>
                <p onClick={() => { navigate('/compatibility') }}>케미보기</p>
            </div>
            <div className={styled.footer}>
                &copy; {new Date().getFullYear()} MadeByRokit
            </div>

        </div>
    );
};

export default RightNavModel;
