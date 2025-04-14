import React, { useState, useEffect } from "react";
import styles from "./Input.module.css";
import { useNavigate } from "react-router-dom";


const Input = ({ initialData, satellites }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [selectedImageIndexes, setSelectedImageIndexes] = useState([-1, -1, -1, -1]);
  const [savedData, setSavedData] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const mbtiTexts = ["I", "E", "S", "N", "F", "T", "P", "J"];

  useEffect(() => {
    if (initialData) {
      const decodedData = decodeURIComponent(initialData);
      const parsedData = JSON.parse(decodedData);
      setName(parsedData.name || "");
      setSelectedImageIndexes(parsedData.mbti || [-1, -1, -1, -1]);
      setShowResult(true);
    }
  }, [initialData]);

  const mbtiToAlphabet = (indexes) => {

    const mbtiTypes = ["I", "E", "S", "N", "F", "T", "P", "J"];
    return indexes.map(index => mbtiTypes[index]).join("");
  };

  const handleNameChange = (e) => setName(e.target.value);

  const handleImageClick = (rowIndex, imageIndex) => {
    const imageGroups = [[0, 1], [2, 3], [4, 5], [6, 7]];
    const updatedSelectedImageIndexes = [...selectedImageIndexes];

    imageGroups[rowIndex].forEach((i) => {
      if (i !== imageIndex && updatedSelectedImageIndexes.includes(i)) {
        const index = updatedSelectedImageIndexes.indexOf(i);
        if (index > -1) {
          updatedSelectedImageIndexes[index] = -1;
        }
      }
    });

    updatedSelectedImageIndexes[rowIndex] = imageIndex;
    setSelectedImageIndexes(updatedSelectedImageIndexes);
  };

  const handleSave = () => {
    if (name.trim() === "") {
      alert("이름을 입력해주세요.");
      return;
    }

    if (selectedImageIndexes.includes(-1)) {
      alert("올바른 MBTI 타입을 선택해주세요.");
      return;
    }

    const mbtiType = mbtiToAlphabet(selectedImageIndexes);
    const newData = { name, mbti: selectedImageIndexes, mbtiType };
    setSavedData([...savedData, newData]);
    setName("");
    setSelectedImageIndexes([-1, -1, -1, -1]);
  };

  const handleDelete = (indexToDelete) => {
    const updatedData = savedData.filter((_, index) => index !== indexToDelete);
    setSavedData(updatedData);
  };

  const handleShowResult = () => {
    if (savedData.length < 2) {
      alert(savedData.length === 0 ? "MBTI 타입을 입력해주세요." : "2명 이상의 정보를 입력해주세요");
      return;
    }

    navigate('/compatibility/result', {
      state: { savedData, mbtiTexts }
    });

  };

  const renderSavedData = () => {
    return savedData.map((data, dataIndex) => (
      <div key={dataIndex} className={styles.section1}>

        <div className={styles.section1_header}>
          <p>{data.name}</p>
          <button onClick={() => handleDelete(dataIndex)}>지우기</button>
        </div>

        <div className={styles.section1_body}>
          {data.mbti.map((textIndex, rowIndex) => (
            <span key={rowIndex}>
              {mbtiTexts[textIndex]}
            </span>
          ))}
        </div>

      </div>
    ));
  };

  return (
    <div className={styles.main}>

      <div className={styles.section}>
      <p>이름과 MBTI를 입력하여 추가 버튼을 눌러주세요</p>
        <div className={styles.section_header}>
          <input
          className={styles.input_element}
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="이름을 입력하세요."
          />
          <button label="추가" onClick={handleSave} />

        </div>

        <div className={styles.section_body}>
          {mbtiTexts.map((text, textIndex) => (
            <div
              key={textIndex}
              className={`${styles[text]} ${selectedImageIndexes[Math.floor(textIndex / 2)] === textIndex ? styles.selected : ""}`}
              onClick={() => handleImageClick(Math.floor(textIndex / 2), textIndex)}
            >
              {text}
            </div>
          ))}
        </div>
        <div className={styles.section_footer}>
          <button label="궁합보기" onClick={handleShowResult} />
        </div>

        <div >
          <div >{renderSavedData()}</div>


        </div>
      </div>
    </div>
  );
};

export default Input;
