import React from "react";
import HomeSection0 from "./HomeSection0";
import HomeSection1 from "./HomeSection1";
import styles from "./home.module.css";

const Home = () => {
  return (
    <div className={styles.main}>
    <HomeSection0/>
    <HomeSection1/>
    </div>
  );
};

export default Home;
