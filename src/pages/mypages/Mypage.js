import React from "react";
import styles from "./Mypage.module.css";
import UserInfo from "../../components/UserInfo";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";

export const Mypage = () => {
  const { isLoggedIn, setIsLoggedIn, user} = useAuth();
  const navigate = useNavigate();

  const deleteHandler = () => {
    axios.delete("http://ec2-43-200-178-68.ap-northeast-2.compute.amazonaws.com:8080/member", {
      headers : {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
    }).then(()=>{
      setIsLoggedIn(false);
      navigate('/');
    })
    .catch((e) => console.error(e))
  };

  return (
    
    <div className={styles.main}>
      <div className={styles.section}>
        
        <div className={styles.header}>
          <UserInfo userImage={user.profileImage} userId={user.username} mbti={user.mbtiType} />
          <p onClick={() => navigate('/account')} >계정 관리</p>
        </div>
        <div className={styles.body}>
        <p>내가 쓴 글(준비중)</p>
        <p>내가 쓴 댓글(준비중)</p>
        <p>좋아요 표시한 글(준비중)</p>
        <p>좋아요 표시한 댓글(준비중)</p>
        </div>
        <div onClick={deleteHandler} className={styles.footer}>
          <p>회원탈퇴</p>
        </div>

      </div>
    </div>
  );
};

export default Mypage;
