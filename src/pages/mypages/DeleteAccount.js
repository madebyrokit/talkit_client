import React from "react";
import styles from "./Mypage.module.css";
import { Mypage } from "./Mypage";

const DeleteAccount = () => {
  return (
    <section className={styles.Myinfo}>
      <Mypage />
      <div className={styles.Box2}></div>
    </section>
  );
};

export default DeleteAccount;
