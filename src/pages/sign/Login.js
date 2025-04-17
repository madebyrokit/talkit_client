import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Login.module.css";
import naver from "../../assets/naver_login.png";

import { useAuth } from "../../utils/AuthContext";
import axios from "axios";

import { MdClose } from "react-icons/md";

import Resister from "./Resister";

function Login({ setLoginModal }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resisterModal, setResisterMode] = useState(false);

  const REST_API_KEY = "9394c1ee0de2fd55a8ccc154f6cc5114";
  const REDIRECT_URI = "http://localhost:3000/auth/kakao/callback";
  const KAKAO_LOGIN_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;

  const [errmsg, setErrmsg] = useState(false);

  const handleKakaoLogin = () => {
    window.location.href = KAKAO_LOGIN_URL;
  };

  let from = { pathname: "/lists" };
  if (location && location.state && location.state.from) {
    from = location.state.from;
  }
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/login",
        {
          email: email,
          password: password,
        }, { withCredentials: true, }
      )

      .then((response) => {
        let accessToken = response.headers["authorization"];
        localStorage.setItem("token", accessToken.substring(accessToken.lastIndexOf(" ") + 1));
        setIsLoggedIn(true);
        navigate('/');
      })
      .catch((error) => {
        console.error("로그인 요청 실패:", error);
        setErrmsg(true);
      });
  };

  return (
    <div className={styles.main} onClick={(e) => setLoginModal(false)}>

      <div className={styles.section} onClick={(e) => { e.stopPropagation() }} >

        <div className={styles.header}>
          <MdClose className={styles.close_icon} size={30} onClick={(e) => setLoginModal(false)}/>
          <h2 className={styles.login_text}>로그인</h2>
          <p className={styles.login_term}>계속해서 귀하는 당사의 사용자 계약에 동의하고 개인정보 보호정책을 이해하고 있음을 인정합니다.</p>
          
        </div>

        <div className={styles.body} >
        <img
            src={naver}
            className={styles.oauth_image}
            alt="kakao"
          />
          <input
            className={styles.input_element}
            type="text"
            id="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className={styles.input_element}
            type="password"
            id="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>


        <div className={styles.footer}>
          <button className={styles.register_button} onClick={() => setResisterMode(!resisterModal)} >회원가입</button>

          <button className={styles.login_button} onClick={handleLogin} >로그인</button>
        </div>



      </div>

    </div>
  );
}

export default Login;
