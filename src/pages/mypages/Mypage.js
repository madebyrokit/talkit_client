import React from "react";
import styles from "./Mypage.module.css";
import Myinfor from "./Myinfor";

export const Mypage = () => {
  const menu = [
    "내가 만든 케미",
    "내가 만든 토론",
    "내 정보",
    "문의하기",
    "회원탈퇴",
  ];
  return (
    <div className={styles.main}>
      <div className={styles.section}>
        <p>마이페이지</p>
     
      </div>
    </div>
  );
};

export default Mypage;
