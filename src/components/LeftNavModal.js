import React from "react";
import styled from "./LeftNavModal.module.css";
import { useNavigate } from "react-router-dom";
import UserInfo from "./UserInfo";
import { useAuth } from "../utils/AuthContext";

const LeftNavModal = ({ setModal }) => {
    const { isLoggedIn, setIsLoggedIn, user } = useAuth();
    const navigate = useNavigate();
    const handleClick = (category) => {
        navigate('/', { state: { category } });
        setModal(false);
    };

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
                <p onClick={() => handleClick('자유 토론')}>자유 토론</p>
                <p onClick={() => handleClick('국내 주식')}>국내 주식</p>
                <p onClick={() => handleClick('미국 주식')}>미국 주식</p>
                <p onClick={() => handleClick('코인')}>코인</p>
            </div>
            

        </div>
    )
}
export default LeftNavModal;
