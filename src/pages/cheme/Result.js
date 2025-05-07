import React, { useState } from "react";
// import { checkCompatibility, mbtiToAlphabet } from "../../utils/compatibility";
import styles from "./Result.module.css";
import { useLocation } from 'react-router-dom';

const Result = () => {
  const location = useLocation();
  const { savedData, mbtiTexts } = location.state || {};
  const [selectedUserIndex, setSelectedUserIndex] = useState(0);

  const mbtiCompatibility = {
    I: "I",
    E: "E",
    S: "S",
    N: "N",
    F: "F",
    T: "T",
    P: "P",
    J: "J",
  };
  
  const exceptionalRelations = {
    INFP: ["ENFJ", "ENTJ"],
    ENFP: ["INFJ", "INTJ"],
    INFJ: ["ENFP", "ENTP"],
    ENFJ: ["INFP", "ISFP"],
    INTJ: ["ENFP", "ENTP"],
    ENTJ: ["INFP", "INTP"],
    INTP: ["ENTJ", "ESTJ"],
    ENTP: ["INFJ", "INTJ"],
    ISFP: ["ENFJ", "ESFJ", "ESTJ"],
    ESFP: ["ISFJ", "ISTJ"],
    ISTP: ["ESFJ", "ESTJ"],
    ESTP: ["ISFJ"],
    ISFJ: ["ESFP", "ESTP"],
    ESFJ: ["ISFP", "ISTP"],
    ISTJ: ["ESFP"],
    ESTJ: ["INTP", "ISFP", "ISTP"],
  };
  
  const relations = {
    INFP: {
      1: ["INFP", "ENFP", "INFJ", "INTJ", "INTP", "ENTP"],
      4: ["ISFP", "ESFP", "ISTP", "ESTP", "ISFJ", "ESFJ", "ISTJ", "ESTJ"],
    },
    ENFP: {
      1: ["INFP", "ENFP", "ENFJ", "ENTJ", "INTP", "ENTP"],
      4: ["ISFP", "ESFP", "ISTP", "ESTP", "ISFJ", "ESFJ", "ISTJ", "ESTJ"],
    },
    INFJ: {
      1: ["INFP", "INFJ", "ENFJ", "INTJ", "ENTJ", "INTP", "ENTP"],
      4: ["ISFP", "ESFP", "ISTP", "ESTP", "ISFJ", "ESFJ", "ISTJ", "ESTJ"],
    },
    ENFJ: {
      1: ["ENFP", "INFJ", "ENFJ", "INTJ", "ENTJ", "INTP", "ENTP"],
      4: ["ESFP", "ISTP", "ESTP", "ISFJ", "ESFJ", "ISTJ", "ESTJ"],
    },
    INTJ: {
      1: ["INFP", "INFJ", "ENFJ", "INTJ", "ENTJ", "INTP"],
      2: ["ISFJ", "ESFJ", "ISTJ", "ESTJ"],
      3: ["ISFP", "ESFP", "ISTP", "ESTP"],
    },
    ENTJ: {
      1: ["ENFP", "INFJ", "ENFJ", "INTJ", "ENTJ", "ENTP"],
      2: ["ISFP", "ESFP", "ISTP", "ESTP"],
      3: ["ISFJ", "ESFJ", "ISTJ", "ESTJ"],
    },
    INTP: {
      1: ["INFP", "ENFP", "INFJ", "ENFJ", "INTJ", "INTP", "ENTP"],
      2: ["ISFP", "ESFP", "ISTP", "ESTP"],
      3: ["ISFJ", "ESFJ", "ISTJ"],
    },
    ENTP: {
      1: ["ENTP", "ENFP", "ENFJ", "ENTJ", "INTP", "ENTP"],
      2: ["ISFP", "ESFP", "ISTP", "ESTP"],
      3: ["ISFJ", "ESFJ", "ISTJ", "ESTJ"],
    },
    ISFP: {
      1: ["ISFJ", "ISTJ"],
      2: ["INTJ", "ENTJ", "INTP", "ENTP", "ISFJ", "ISTJ"],
      3: ["ISFP", "ESFP", "ESTP", "ISTP"],
      4: ["INFP", "ENFP", "INFJ"],
    },
    ESFP: {
      1: ["ESFJ", "ESTJ"],
      2: ["INTJ", "ENTJ", "INTP", "ENTP", "ESFJ", "ESTJ"],
      3: ["ISFP", "ESFP", "ISTP", "ESTP"],
    },
    ISTP: {
      1: ["ISFJ", "ISTJ"],
      2: ["INTJ", "ENTJ", "INTP", "ENTP", "ISFJ", "ISTJ"],
      3: ["ISFP", "ESFP", "ESTP", "ISTP"],
      4: ["INFP", "ENFP", "INFJ", "ENFJ"],
    },
    ESTP: {
      1: ["ESFJ", "ESTJ"],
      2: ["INTJ", "ENTJ", "INTP", "ENTP", "ISTJ", "ESFJ", "ESTJ"],
      3: ["ISFP", "ESFP", "ISTP", "ESTP"],
      4: ["INFP", "ENFP", "INFJ", "ENFJ"],
    },
    ISFJ: {
      1: ["ISFJ", "ESFJ", "ISTJ", "ESTJ"],
      2: ["ENTJ", "ISFP", "ISTP"],
      3: ["INTJ", "INTP", "ENTP"],
      4: ["INFP", "ENFP", "INFJ", "ENFJ"],
    },
    ESFJ: {
      1: ["ISFJ", "ESFJ", "ISTJ", "ESTJ"],
      2: ["ENTJ", "ESFP", "ESTP"],
      3: ["INTJ", "INTP", "ENTP"],
      4: ["INFP", "ENFP", "INFJ", "ENFJ"],
    },
    ISTJ: {
      1: ["ISFJ", "ESFJ", "ISTJ", "ESTJ"],
      2: ["ENTJ", "ISFP", "ISTP", "ESTP"],
      3: ["INTJ", "INTP", "ENTP"],
      4: ["INFP", "ENFP", "INFJ", "ENFJ"],
    },
    ESTJ: {
      1: ["ISFJ", "ESFJ", "ISTJ", "ESTJ"],
      2: ["ENTJ", "ESFP", "ESTP"],
      3: ["INTJ", "ENTP"],
      4: ["INFP", "ENFP", "INFJ", "ENFJ"],
    },
  };
  
   const checkCompatibility = (mbti1, mbti2) => {
    if (mbti1 === mbti2) return "좋음";
  
    if (
      exceptionalRelations[mbti1] &&
      exceptionalRelations[mbti1].includes(mbti2)
    )
      return "매우 좋음";
    if (
      exceptionalRelations[mbti2] &&
      exceptionalRelations[mbti2].includes(mbti1)
    )
      return "매우 좋음";
  
    for (let rating in relations[mbti1]) {
      if (relations[mbti1][rating].includes(mbti2)) {
        switch (parseInt(rating)) {
          case 1:
            return "좋음";
          case 2:
            return "반반";
          case 3:
            return "나쁘지않음";
          default:
            return "나쁨";
        }
      }
    }
  
    return "정보 없음";
  };
  
   const mbtiToAlphabet = (mbti) => {
    if (!Array.isArray(mbti)) return "";
  
    return mbti.map((index) => Object.keys(mbtiCompatibility)[index]).join("");
  };
  

  const renderUserData = () => {
    if (!savedData || savedData.length === 0) {
      return <p>데이터가 없습니다.</p>;
    }

    return (
      <div className={styles.userData}>
        {savedData.map((user, index) => (
          <div
            key={index}
            className={`${styles.user} ${index === selectedUserIndex ? styles.selected : ""
              }`}
            onClick={() => { setSelectedUserIndex(0); setSelectedUserIndex(index) }}
          >

            {user.name}님 - {renderSelectedImages(user.mbti, index)}

          </div>
        ))}
      </div>
    );
  };

  const renderCompatibilityResult = () => {
    if (!savedData || savedData.length < 2) {
      return <p>데이터가 충분하지 않습니다.</p>;
    }

    const selectedUserData = savedData[selectedUserIndex];
    const mbti1 = mbtiToAlphabet(selectedUserData.mbti);
    const name1 = selectedUserData.name;

    return (
      <div className={styles.savedDataContainer}>
        {savedData.map((user, index) => {
          if (index !== selectedUserIndex) {
            const mbti2 = mbtiToAlphabet(user.mbti);
            const name2 = user.name;
            const result = checkCompatibility(mbti1, mbti2);

            return (
              <div
                key={`${name1}-${name2}`}
                className={`${styles.compatibilityResult} ${styles.fadeInOut}`}
              >
                <p>
                  {name1}님({mbti1})과 {name2}님({mbti2}) 의 궁합 결과: {result}
                </p>
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  };

  const renderSelectedImages = (mbti, userIndex) => {
    return mbti.map((textIndex, rowIndex) => {
      const textValue = mbtiTexts[textIndex];
      if (textIndex !== -1 && textValue) {
        return (
          <span
            key={rowIndex}
            className={`${styles.resultText} ${styles[textValue]}
              ${userIndex === selectedUserIndex ? styles.selected : ""}`}
            onClick={() => setSelectedUserIndex(userIndex)}
          >
            {textValue}
          </span>
        );
      }
      return null;
    });
  };

  return (
    <div className={styles.main}>

      <div className={styles.section}>

        <div className={styles.header}>
          <p className={styles.notice}>데이터가 정확하지 않을 수 있습니다. 참고용으로만 봐주세요</p>
          <p>{renderCompatibilityResult()}</p>
        </div>
        <div className={styles.body}>
          {renderUserData()}

        </div>
      </div>

    </div>
  );
};

export default Result;
