import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Resister.module.css";
import axios from "axios";

function Resister() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [mbti, setMbti] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateInputs = () => {
    if (!email || !validateEmail(email)) {
      setErrorMessage("유효한 이메일 주소를 입력해주세요.");
      return false;
    }
    if (username.length > 8) {
      setErrorMessage("닉네임은 최대 8자리까지 입력 가능합니다.");
      return false;
    }
    if (password.length > 12) {
      setErrorMessage("비밀번호는 최대 12자리까지 입력 가능합니다.");
      return false;
    }
    if (!mbti) {
      setErrorMessage("MBTI를 선택해주세요.");
      return false;
    }
    return true;
  };

  const handleSignup = () => {
    if (!validateInputs()) return;

    axios
      .post(`${process.env.REACT_APP_API_URL}/register`, {
        email,
        password,
        confirm_password,
        username,
        mbti_type: mbti,
      })
      .then((response) => {
        console.log(response.data);
        navigate("/");
      })
      .catch((error) => {
        if (error.response && error.response.status === 409) {
          setErrorMessage("이미 존재하는 아이디입니다. 다른 아이디를 선택해주세요.");
        } else {
          setErrorMessage("회원가입에 실패했습니다. 다시 시도해주세요.");
        }
      });
  };

  return (
    <div className={styles.main}>
      <div className={styles.section}>
        <h2>이용약관</h2>

        <p><strong>제 1조 (목적)</strong>
          본 약관은 [서비스명] (이하 '서비스')를 제공하는 [회사명] (이하 '회사')와 회원(이하 '회원') 간의 서비스 이용에 관한 권리, 의무 및 책임 사항을 규정하는 것을 목적으로 합니다.</p>

        <p><strong>제 2조 (정의)</strong></p>
        <ul>
          <li><strong>회원</strong>: 본 약관에 동의하고 서비스에 가입하여 회사와 이용 계약을 체결한 개인 또는 법인.</li>
          <li><strong>서비스</strong>: 회사가 제공하는 모든 온라인 서비스 및 관련 서비스.</li>
          <li><strong>아이디</strong>: 회원 식별을 위한 고유한 문자 또는 숫자의 조합.</li>
          <li><strong>비밀번호</strong>: 회원의 개인정보 보호를 위해 설정한 비밀번호.</li>
          <li><strong>회원가입</strong>: 서비스를 이용하기 위해 회원이 본 약관에 동의하고, 필요한 정보를 제공하여 회사와 계약을 체결하는 절차.</li>
        </ul>

        <p><strong>제 3조 (약관의 효력 및 변경)</strong></p>
        <ul>
          <li>본 약관은 회원이 서비스에 가입함으로써 효력을 발생합니다.</li>
          <li>회사는 본 약관을 변경할 수 있으며, 변경된 약관은 서비스 내 공지사항을 통해 사전 고지합니다. 변경된 약관에 동의하지 않는 경우, 회원은 서비스 이용을 중지하거나 탈퇴할 수 있습니다.</li>
        </ul>

        <p><strong>제 4조 (회원가입 및 서비스 이용)</strong></p>
        <ul>
          <li>회원가입은 이용자가 본 약관에 동의하고, 회사가 요구하는 개인정보를 제공함으로써 이루어집니다.</li>
          <li>회원가입 시 제공되는 개인정보는 정확하고 최신의 정보이어야 하며, 이를 허위로 기재하거나 변경된 사항을 반영하지 않은 경우, 회사는 서비스 제공을 거부하거나 이용을 제한할 수 있습니다.</li>
        </ul>

        <p><strong>제 5조 (아이디 및 비밀번호 관리)</strong></p>
        <ul>
          <li>회원은 아이디와 비밀번호를 안전하게 관리할 책임이 있습니다.</li>
          <li>아이디 및 비밀번호의 도용 또는 타인에 의한 부정 사용이 발생한 경우, 회원은 즉시 이를 회사에 통보하고, 회사는 이에 대한 적절한 조치를 취할 수 있습니다.</li>
        </ul>

        <p><strong>제 6조 (회원의 의무)</strong></p>
        <ul>
          <li>회원은 서비스를 이용할 때 다음과 같은 의무를 지켜야 합니다:
            <ul>
              <li>법령, 본 약관, 서비스 이용 안내 등을 준수할 것.</li>
              <li>타인의 권리를 침해하지 않을 것.</li>
              <li>서비스의 정상적인 운영을 방해하지 않을 것.</li>
              <li>회사의 사전 승낙 없이 서비스를 상업적으로 이용하지 않을 것.</li>
            </ul>
          </li>
          <li>회원은 본 약관에 위배되는 행위를 할 경우, 회사는 서비스 이용을 제한하거나 계약을 해지할 수 있습니다.</li>
        </ul>

        <p><strong>제 7조 (서비스 제공)</strong></p>
        <ul>
          <li>회사는 회원에게 안정적이고 지속적인 서비스를 제공하기 위해 노력합니다.</li>
          <li>서비스 제공에 있어 기술적 문제나 외부 요인으로 인한 서비스 중단이나 지연에 대해 회사는 책임지지 않습니다.</li>
        </ul>

        <p><strong>제 8조 (서비스 이용의 중지)</strong></p>
        <ul>
          <li>회사는 다음의 경우 회원에게 사전 통지 없이 서비스 이용을 일시 중지하거나 제한할 수 있습니다:
            <ul>
              <li>회원이 본 약관을 위반한 경우.</li>
              <li>서비스 이용에 있어 부정행위가 발견된 경우.</li>
              <li>기타 회사가 서비스 운영상 필요하다고 판단한 경우.</li>
            </ul>
          </li>
        </ul>

        <p><strong>제 9조 (개인정보 보호)</strong></p>
        <ul>
          <li>회사는 회원의 개인정보를 개인정보 보호법 등 관련 법령에 따라 적법하게 수집, 이용 및 보호합니다. 개인정보의 수집 및 이용에 관한 자세한 사항은 개인정보 처리방침에서 확인할 수 있습니다.</li>
        </ul>

        <p><strong>제 10조 (서비스 이용 계약 해지)</strong></p>
        <ul>
          <li>회원은 언제든지 회사에 서비스 이용 계약 해지를 요청할 수 있습니다.</li>
          <li>회사는 다음과 같은 경우 회원의 서비스 이용 계약을 해지할 수 있습니다:
            <ul>
              <li>회원이 본 약관을 위반한 경우.</li>
              <li>기타 서비스 운영에 중대한 지장이 있다고 판단되는 경우.</li>
            </ul>
          </li>
        </ul>

        <p><strong>제 11조 (면책 조항)</strong></p>
        <ul>
          <li>회사는 회원이 서비스 이용 중 발생한 손해에 대해 책임을 지지 않습니다, 단, 회사의 고의 또는 중대한 과실로 발생한 손해에 대해서는 책임을 집니다.</li>
          <li>회사는 천재지변 또는 불가항력적인 사유로 인한 서비스 제공의 장애에 대해서 책임지지 않습니다.</li>
        </ul>

        <p><strong>제 12조 (준거법 및 분쟁 해결)</strong></p>
        <ul>
          <li>본 약관의 해석 및 적용에 있어 법적 분쟁이 발생할 경우, 회사의 본점이 위치한 국가의 법을 따릅니다.</li>
          <li>회사와 회원 간의 분쟁은 회사 본점이 위치한 법원에서 해결합니다.</li>
        </ul>
      </div>

      <div className={styles.a}>
        <input
          type="checkbox"
          name="term"
          checked={isAgreed}
          onChange={(e) => setIsAgreed(e.target.checked)}
          required
        />
        <span className={styles.red}>(필수)이용약관에 동의합니다.</span>
      </div>

      <div className={styles.section1}>
        <div className={styles.section1_header}>
          <h1>회원가입</h1>
        </div>

        <div className={styles.section1_body}>
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}

          <div>
            <input
              className={styles.input_element}
              placeholder="이메일"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <input
              className={styles.input_element}
              placeholder="닉네임 (최대 8자리)"
              type="text"
              maxLength="8"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <input
              className={styles.input_element}
              placeholder="비밀번호 (최대 12자리)"
              type="password"
              maxLength="12"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <input
              className={styles.input_element}
              placeholder="비밀번호 확인 (최대 12자리)"
              type="password"
              maxLength="12"
              value={confirm_password}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div>
            <select
              className={styles.input_element}
              onChange={(e) => setMbti(e.target.value)}
              value={mbti}
            >
              <option value="">MBTI 선택하기</option>
              <option value="ISTJ">ISTJ</option>
              <option value="ISFJ">ISFJ</option>
              <option value="INFJ">INFJ</option>
              <option value="INTJ">INTJ</option>
              <option value="ISTP">ISTP</option>
              <option value="ISFP">ISFP</option>
              <option value="INFP">INFP</option>
              <option value="INTP">INTP</option>
              <option value="ESTP">ESTP</option>
              <option value="ESFP">ESFP</option>
              <option value="ENFP">ENFP</option>
              <option value="ENTP">ENTP</option>
              <option value="ESTJ">ESTJ</option>
              <option value="ESFJ">ESFJ</option>
              <option value="ENFJ">ENFJ</option>
              <option value="ENTJ">ENTJ</option>
            </select>
          </div>

          <div className={styles.section1_footer}>
            <div>
              <button
                onClick={handleSignup}
                label="가입하기"
                disable={!isAgreed}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resister;
