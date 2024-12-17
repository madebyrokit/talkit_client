import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Resister.module.css";
import useInput from "../../utils/useInput";
import axios from "axios";
import { MBTI_TYPES, validators, errorMessages } from "../../utils/sign";


function Resister() {
  const navigate = useNavigate();
  const username = useInput("", validators.id);
  const password = useInput("", validators.pw);
  const email = useInput("", validators.email);
  const [showMbtiSuggestions, setShowMbtiSuggestions] = useState(false);
  const [birthdate, setBirthdate] = useState(null);
  const [birthdateInput, setBirthdateInput] = useState("");
  const [nick, setNick] = useState("");
  const [term, setTerm] = useState(false);
  const [notAllow, setNotAllow] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [mbti, setMbti] = useState("");
  const [showMbtiError, setShowMbtiError] = useState(false);
  const [mbtiSuggestions, setMbtiSuggestions] = useState([]);
  const isBirthdateValid = validators.birthdate(birthdate);

  useEffect(() => {
    setNotAllow(
      !(
        username.isValid &&
        password.isValid &&
        email.isValid &&
        isBirthdateValid &&
        term
      )
    );
  }, [username.isValid, password.isValid, email.isValid, isBirthdateValid, term]);

  useEffect(() => {
    setBirthdateInput(birthdate ? birthdate.toISOString().split("T")[0] : "");
  }, [birthdate]);

  useEffect(() => {
    setMbtiSuggestions(
      MBTI_TYPES.filter((type) => type.startsWith(mbti.toUpperCase()))
    );
  }, [mbti]);
  const passwordConfirm = useInput("", (value) =>
    validators.pwConfirm(password.value, value)
  );

  const handleSignup = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/members/signup", {
        email: email.value,
        password: password.value,
        username: username.value,
        nickName: nick,
        mbti: mbti,
        birthday: birthdateInput,
      })
      .then((response) => {
        console.log("Signup successful:", response.data);
        navigate("/login");
      })
      .catch((error) => {
        if (error.response && error.response.status === 409) {
          setErrorMessage(
            "이미 존재하는 아이디입니다. 다른 아이디를 선택해주세요."
          );
        } else {
          setErrorMessage("회원가입에 실패했습니다. 다시 시도해주세요.");
        }
      });
  };

  function InputField({ label, id, type, value, onChange, validator }) {
    const isValid = validator(value);
    return (
      <div className={styles.form_element}>
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
        <div className={styles.inputWithError}>
          <input
            id={id}
            type={type}
            value={value}
            className={styles.input}
            onChange={onChange}
            required
          />
          {!isValid && value.length > 0 && (
            <span className={styles.errorMessage}>{errorMessages[id]}</span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.modalWrapper}>
        <form className={styles.form} onSubmit={handleSignup}>
          <h1 className={styles.signup_title}>회원가입</h1>
          <InputField
            label="이메일"
            id="id"
            type="text"
            value={username.value}
            onChange={username.onChange}
            validator={validators.id}
          />
       
          <InputField
            label="닉네임"
            id="pw"
            type="password"
            value={nick}
            onChange={(e) => setNick(e.target.value)}
            validator={validators.id}
          />
          <InputField
            label="비밀번호"
            id="pw"
            type="password"
            value={password.value}
            onChange={password.onChange}
            validator={validators.pw}
          />
          <InputField
            label="비밀번호 확인"
            id="pwConfirm"
            type="password"
            value={passwordConfirm.value}
            onChange={passwordConfirm.onChange}
            validator={() =>
              validators.pwConfirm(password.value, passwordConfirm.value)
            }
          />

          <div className={styles.form_element}>
            <label htmlFor="mbti" className={styles.label}>
              MBTI
            </label>
            <input
              id="mbti"
              value={mbti}
              className={styles.input}
              onChange={(e) => setMbti(e.target.value.toUpperCase())}
              onFocus={() => {
                setShowMbtiSuggestions(true);
                setShowMbtiError(false);
              }}
              onBlur={() => {
                setTimeout(() => setShowMbtiSuggestions(false), 200);
                setShowMbtiError(true);
              }}
              required
            />
            {showMbtiSuggestions && (
              <div className={styles.autocomplete}>
                {mbtiSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setMbti(suggestion);
                      setShowMbtiSuggestions(false);
                    }}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}

            {showMbtiError && !validators.mbti(mbti) && mbti.length > 0 && (
              <span className={styles.errorMessage}>{errorMessages.mbti}</span>
            )}
          </div>
          

      
          <div className={styles.form_element}>

            <div className={styles.errorMessage}>
              {!isBirthdateValid && birthdate && (
                <div>{errorMessages.birthdate}</div>
              )}
            </div>
          </div>
          <div className={styles.checkbox}>
            <label>
              <input
                type="checkbox"
                name="term"
                checked={term}
                onChange={(e) => setTerm(e.target.checked)}
                required
              />
              <span className={styles.black}>만 14세 이상입니다.</span>{" "}
              <span className={styles.red}>(필수)</span>
            </label>
          </div>
          {errorMessage && (
            <div className={styles.errorContainer}>
              <span className={styles.errorMessage}>{errorMessage}</span>
            </div>
          )}
          <button disabled={notAllow} className={styles.signup_button}>
            가입하기
          </button>
        </form>
        <div className={styles.right}>
          <h2>이용약관</h2>
          <p>
            본 약관은 ... (이하 "회사")이 운영하는 웹 사이트 및 모바일
            애플리케이션 ... (이하 "서비스")를 이용함에 있어 회사와 이용자의
            권리, 의무 및 책임사항 등을 규정함을 목적으로 합니다.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Resister;
