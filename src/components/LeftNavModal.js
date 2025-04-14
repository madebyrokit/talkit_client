import React from "react";
import styled from "./LeftNavModal.module.css";
import { useNavigate } from "react-router-dom";
import UserInfo from "./UserInfo";
import { useAuth } from "../utils/AuthContext";

const LeftNavModal = ({ setModal }) => {
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
            <div className={styled.header}>
            </div>
            <div className={styled.body}>
                <p onClick={() => { navigate('/') }}>자유 토론</p>
                <p onClick={() => { navigate('/chat') }}>국내 주식</p>
                <p onClick={() => { navigate('/compatibility') }}>미국 주식</p>
                <p onClick={() => { navigate('/compatibility') }}>코인</p>
            </div>
            <div className={styled.footer}>
                &copy; {new Date().getFullYear()} MadeByRokit
            </div>

        </div>
    )
}
export default LeftNavModal;
