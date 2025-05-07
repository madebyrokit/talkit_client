import React from "react";
import styled from "./RightNavModel.module.css";
import { useNavigate } from "react-router-dom";
import UserInfo from "./UserInfo";
import { useAuth } from "../utils/AuthContext";

const RightNavModel = ({ setModal }) => {
    const { isLoggedIn, setIsLoggedIn, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear("token")
        setIsLoggedIn(false);
        setModal(false);
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
                </div> :
                <div>

                </div>
            }
            <div className={styled.body}>
                {isLoggedIn ?
                    <>
                        <p className={styled.element} onClick={handleMypage}>마이페이지</p>
                        <p className={styled.element} onClick={handleLogout}>로그아웃</p>
                        <p className={styled.element} onClick={handleLogout}>글쓰기</p>
                    </> : <>
                        <p className={styled.element} onClick={() => { navigate('/login') }}>로그인</p>
                    </>}
                <p className={styled.element} onClick={() => { navigate('/') }}>토론하기</p>
                <p className={styled.element} onClick={() => { navigate('/chat') }}>채팅하기</p>
                <p className={styled.element} onClick={() => { navigate('/compatibility') }}>케미보기</p>
            </div>
            <div className={styled.footer}>
                &copy; {new Date().getFullYear()} MadeByRokit
            </div>

        </div>
    );
};

export default RightNavModel;
