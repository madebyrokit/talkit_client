import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NavBar.module.css";
import { useAuth } from "../utils/AuthContext";
import NavModal from "./NavModel";
const NavBar = () => {

  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [modal, setModal] = useState(false);

  const homeHandler= () =>{navigate('/')}

  const handler = ()=>{navigate('/lists');}
  const toInput = ()=>{navigate('/compatibility');}
  const login = ()=>{navigate('/login');}
  return (
    <div className={styles.main}>
      {modal ? <NavModal setModal={setModal} setIsLoggedIn={setIsLoggedIn} /> : <div/>}
    <nav className={styles.navBar}>
    
        <div className={styles.nav_header} type="button">
            <span type="button" className={styles.logotext} onClick={homeHandler}>Talkit</span>
        </div>

        <div className={styles.nav_body}>
        <div className={styles.nav_Item} onClick={handler}>토론</div>
        <div className={styles.nav_Item} onClick={toInput}>케미</div>
        <div className={styles.nav_Item} onClick={() => {navigate('/chat')}}>채팅</div>
        </div>
        
        
      
      <div className={styles.nav_footer}>
        {isLoggedIn ? (
          <>
            <div className={styles.nav_Item}
            onClick={() => {setModal((e)=> !e)}}>
                더보기
            </div>
          </>
        ) : (
          <>
            <div
            className={styles.nav_Item}
            onClick={login}>
                로그인
            </div>
          </>
        )}
      </div>
    </nav>
    </div>
  );
};

export default NavBar;
