import React from "react";
import styled from "./NavModal.module.css";
import { useNavigate } from "react-router-dom";

const NavModal = ({ setModal, setIsLoggedIn }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token"); 
        setIsLoggedIn((e) => !e);
        setModal(false);
        navigate('/');
    }

    return (
        <div className={styled.main}>
            <div className={styled.section}>
                <div className={styled.header}>
                    현재 로그인 계정
                </div>
                <div className={styled.body}>
                <p onClick={() => navigate('/mypage')}>마이페이지</p>
                <p onClick={handleLogout}>로그아웃</p>
                </div>
            </div>
        </div>
    );
};

export default NavModal;