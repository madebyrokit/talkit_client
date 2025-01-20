import React from "react";
import styled from "./NavModal.module.css";
import { useNavigate } from "react-router-dom";
import UserInfo from "./UserInfo";
import { useAuth } from "../utils/AuthContext";

const NavModal = ({ setModal }) => {
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
            <div className={styled.section}>
                <div className={styled.header}>
                    현재 로그인 계정
                    <UserInfo mbti={user.mbtiType} userImage={user.profileImage} userId={user.username} />
                </div>
                <div className={styled.body}>
                    <p onClick={handleMypage}>마이페이지</p>
                    <p onClick={handleLogout}>로그아웃</p>
                </div>
                <div className={styled.footer}>
                    &copy; {new Date().getFullYear()} MadeByRokit
                </div>
            </div>
        </div>
    );
};

export default NavModal;
