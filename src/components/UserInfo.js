// UserInfo.js
import React from "react";
import styles from "./UserInfo.module.css";

const UserInfo = ({ userImage, userId, mbti }) => (
  <div className={styles.main}>
    <div className={styles.header}>
      <div className={styles.profile}>
        <img className={styles.profile_image} src={`http://localhost:8080/member/${userImage}`} />
      </div>

      <div className={styles.body}>
        <b>{userId}</b>
        <div>[{mbti}]</div>
      </div>

    </div>
  </div>
);

export default UserInfo;
