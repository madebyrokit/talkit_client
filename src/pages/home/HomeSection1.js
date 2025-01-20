import React from "react";
import { useNavigate } from "react-router-dom";
import mainImage from "../../assets/Chemi.png";
import styles from "./HomeSection1.module.css";


const HomeSection1 = () => {
  const navigate = useNavigate();

  const handle = () => { navigate('/compatibility') };
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <img src={mainImage} alt="Logo" />
      </div>

      <div className={styles.body}>
        <div className={styles.body_button} onClick={handle}>
          <p>케미 확인하기➜</p>
        </div>
      </div>

      <div className={styles.footer}>
        <p>상대방과의 얼마나 잘맞는지 궁금한가요?</p>
        <p>지금 바로 결과를 확인해 보세요.</p>
      </div>
    </div>
  );
};

export default HomeSection1;
