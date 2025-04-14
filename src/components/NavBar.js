import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NavBar.module.css";
import { useAuth } from "../utils/AuthContext";
import RightNavModel from "./RightNavModel";
import logo from '../assets/logo.png';

import { FaSearch } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { MdMoreHoriz } from "react-icons/md";
import LeftNavModal from "./LeftNavModal";

const NavBar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const [modal, setModal] = useState(false);
  const [leftModal, setLeftModal] = useState(false);
  const homeHandler = () => { navigate('/') }
  const handler = () => {
    navigate('/lists');
    setModal(false);
  }

  const toInput = () => {
    navigate('/compatibility');
    setModal(false);
  }

  const login = () => {
    navigate('/login');
    setModal(false);
  }

  return (
    <nav className={styles.navbar}>
      {modal ? <RightNavModel setModal={setModal} setIsLoggedIn={setIsLoggedIn} /> : <div />}
      {leftModal ? <LeftNavModal setModal={setLeftModal} setIsLoggedIn={setIsLoggedIn} /> : <div />}

      <div className={styles.navbar_header} >
        <button className={styles.detail_button} onClick={() => { setLeftModal((e) => !e) }}>
          <FaBars size={20} color="white" />
        </button>
        <button className={styles.logo_element} onClick={homeHandler} >
          <img src={logo} className={styles.logo_img}></img>
          <p className={styles.logo_text}>Stocking</p>
        </button>
      </div>

      <div className={styles.nav_body}>
        <FaSearch className={styles.search_icon} />
        <input className={styles.input_element} type="text" placeholder="검색하기" />
      </div>



      <div className={styles.nav_footer}>

        <button className={styles.login_button} onClick={() => { navigate('/login') }}>
          로그인
        </button>
        <button className={styles.detail_button} onClick={() => { setModal((e) => !e) }}>
          <MdMoreHoriz size={30} color="white" />
        </button>

      </div>
    </nav>

  );
};

export default NavBar;
