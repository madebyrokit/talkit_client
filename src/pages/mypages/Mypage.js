import React from "react";
import styles from "./Mypage.module.css";
import Myinfor from "./Myinfor";
import UserInfo from "../../components/UserInfo";

export const Mypage = () => {

  return (
    <div className={styles.main}>
      <div className={styles.section}>
        
        <div className={styles.header}>
          <UserInfo />
          <p>계정 관리</p>
        </div>
        <div className={styles.body}>
        <p>내가 쓴 글</p>
        <p>내가 쓴 댓글</p>
        <p>좋아요 표시한 글</p>
        <p>좋아요 표시한 댓글</p>
        </div>
        <div className={styles.footer}>
          <p>푸터</p>
        </div>

      </div>
    </div>
  );
};

export default Mypage;
