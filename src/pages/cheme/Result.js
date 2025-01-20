import React, { useState } from "react";
import { checkCompatibility, mbtiToAlphabet } from "../../utils/compatibility";
import styles from "./Result.module.css";
import { useLocation } from 'react-router-dom';

const Result = () => {
  const location = useLocation();  // `useLocation` 훅을 사용
  const { savedData, mbtiTexts } = location.state || {};
  const [selectedUserIndex, setSelectedUserIndex] = useState(0);

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
