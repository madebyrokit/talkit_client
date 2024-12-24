import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Login.module.css";
import naver from "../../assets/naver_login.png";
import useInput from "../../utils/useInput";
import { useAuth } from "../../utils/AuthContext";
import axios from "axios";
import CustomButton from "../../components/CustomButton";
import Resister from "./Resister";

function Login() {
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
      .post("http://ec2-43-200-178-68.ap-northeast-2.compute.amazonaws.com:8080/signin",
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
    <div className={styles.main}>
      {resisterModal == false ?
        <div className={styles.section}>
          <div>

            <div className={styles.header}>
              
              {errmsg ? <div>아이디 혹은 비밀번호가 다릅니다.</div> : <p>Talkit</p>}
            </div>

            <div className={styles.body} >

              <img
                src={naver}
                className={styles.oauth_image}
                alt="kakao"
                // onClick={handleKakaoLogin}
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
              <CustomButton onClick={handleLogin} label="로그인" />
              <CustomButton onClick={() => setResisterMode(!resisterModal)} label="회원가입" />
            </div>



          </div>
        </div>
        : <Resister />}
    </div>
  );
}

export default Login;
