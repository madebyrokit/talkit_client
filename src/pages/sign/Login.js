import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Login.module.css";
import kakao from "../../assets/kakao_login.png";
import useInput from "../../utils/useInput";
import { useAuth } from "../../utils/AuthContext";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = useInput("");
  const password = useInput("");
  const [errorMessage, setErrorMessage] = useState("");
  const REST_API_KEY = "9394c1ee0de2fd55a8ccc154f6cc5114";
  const REDIRECT_URI = "http://localhost:3000/auth/kakao/callback";
  const KAKAO_LOGIN_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;

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
      .post("http://localhost:8080/signin",
        {
          email: email.value,
          password: password.value,
        })
      .then((response) => {
        let accessToken = response.headers["authorization"];
        localStorage.setItem("token", accessToken.substring(accessToken.lastIndexOf(" ") + 1));
        setIsLoggedIn(true);
        navigate('/');
      })
      .catch((error) => {
        console.error("Login error:", error);
        setErrorMessage(
          "로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요."
        );
      });
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className={styles.body}>
      <div className={styles.card}>
        <form id="form" onSubmit={handleLogin}>
          <h1 className={styles.text}>Talkit</h1>
          <div className={styles.part}>
            <input

              type="text"
              id="email"
              placeholder="Email"
              value={email.value}
              onChange={email.onChange}
              required
            />
          </div>
          <div className={styles.part}>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password.value}
              onChange={password.onChange}
              required
            />
          </div>

          <div className={styles.part}>
            <button type="submit">Login</button>
            <button onClick={handleSignUp}>가입하기</button>
          </div>

          <div className={styles.part}>
            <img
              src={kakao}
              className={styles.kakao_image}
              alt="kakao"
              onClick={handleKakaoLogin}
            />
          </div>




        </form>
      </div>
    </div>
  );
}

export default Login;
