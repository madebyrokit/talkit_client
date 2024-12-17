import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NavBar.module.css";
import { useAuth } from "../utils/AuthContext";

const NavBar = () => {

  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const homeHandler= () =>{navigate('/')}

  const handler = ()=>{navigate('/lists');}
  const toInput = ()=>{navigate('/compatibility');}
  const login = ()=>{navigate('/login');}
  return (
    <div className={styles.body}>
    <nav className={styles.navBar}>
      
        <div className={styles.nav_header} type="button">
            <span type="button" className={styles.logotext} onClick={homeHandler}>Talkit</span>
        </div>

        <div className={styles.nav_body}>
        <div className={styles.nav_Item} onClick={handler}>토론</div>
        <div className={styles.nav_Item} onClick={toInput}>케미</div>
        <div className={styles.nav_Item}>채팅</div>
        </div>
        
      
      <div className={styles.nav_footer}>
        {isLoggedIn ? (
          <>
            <div className={styles.nav_Item}
            onClick={() => {localStorage.clear("token"); setIsLoggedIn((a) => !a)}}>
                로그아웃
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
