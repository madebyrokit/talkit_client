import React, { useState, useEffect } from "react"; // React 및 훅 불러오기
import styles from "./Input.module.css"; // CSS 모듈 스타일 불러오기
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 훅

// Input 컴포넌트 정의. props로 initialData와 satellites를 받음
const Input = ({ initialData, satellites }) => {
  const navigate = useNavigate(); // 페이지 이동을 위한 함수 생성
  const [name, setName] = useState(""); // 이름 상태값
  const [selectedImageIndexes, setSelectedImageIndexes] = useState([-1, -1, -1, -1]); // MBTI 선택 인덱스 (각 4문항의 선택값)
  const [savedData, setSavedData] = useState([]); // 저장된 사용자 데이터 목록
  const [showResult, setShowResult] = useState(false); // 결과 보기 상태 (사용되진 않음)
  const mbtiTexts = ["I", "E", "S", "N", "F", "T", "P", "J"]; // MBTI 선택지 텍스트

  // 초기 데이터가 있을 경우 해당 데이터를 상태로 설정
  useEffect(() => {
    if (initialData) {
      const decodedData = decodeURIComponent(initialData); // URL 디코딩
      const parsedData = JSON.parse(decodedData); // JSON 파싱
      setName(parsedData.name || ""); // 이름 설정
      setSelectedImageIndexes(parsedData.mbti || [-1, -1, -1, -1]); // MBTI 인덱스 설정
      setShowResult(true); // 결과 보기 활성화 (이 상태는 이후로 사용되지 않음)
    }
  }, [initialData]);

  // 선택된 MBTI 인덱스를 실제 알파벳 문자열로 변환 (예: [0,2,4,6] -> "ISFP")
  const mbtiToAlphabet = (indexes) => {
    const mbtiTypes = ["I", "E", "S", "N", "F", "T", "P", "J"];
    return indexes.map(index => mbtiTypes[index]).join("");
  };

  // 이름 입력값 상태 업데이트
  const handleNameChange = (e) => setName(e.target.value);

  // // 이미지(텍스트) 클릭 시 선택 인덱스를 변경
  // const handleImageClick = (rowIndex, imageIndex) => {
  //   const imageGroups = [[0, 1], [2, 3], [4, 5], [6, 7]]; // 4개의 MBTI 그룹
  //   const updatedSelectedImageIndexes = [...selectedImageIndexes]; // 복사본 생성

  //   // 같은 그룹에서 이미 선택된 항목 제거
  //   imageGroups[rowIndex].forEach((i) => {
  //     if (i !== imageIndex && updatedSelectedImageIndexes.includes(i)) {
  //       const index = updatedSelectedImageIndexes.indexOf(i);
  //       if (index > -1) {
  //         updatedSelectedImageIndexes[index] = -1;
  //       }
  //     }
  //   });

  //   updatedSelectedImageIndexes[rowIndex] = imageIndex; // 선택값 저장
  //   setSelectedImageIndexes(updatedSelectedImageIndexes); // 상태 업데이트
  // };

  const handleImageClick = (rowIndex, imageIndex) => {
    const updatedSelectedImageIndexes = [...selectedImageIndexes];
    updatedSelectedImageIndexes[rowIndex] = imageIndex; // 해당 그룹에 선택만 덮어쓰기
    setSelectedImageIndexes(updatedSelectedImageIndexes);
  };
  

  // 입력된 이름과 MBTI를 저장
  const handleSave = () => {
    if (name.trim() === "") {
      alert("이름을 입력해주세요.");
      return;
    }

    if (selectedImageIndexes.includes(-1)) {
      alert("올바른 MBTI 타입을 선택해주세요.");
      return;
    }

    const mbtiType = mbtiToAlphabet(selectedImageIndexes); // 문자열로 변환
    const newData = { name, mbti: selectedImageIndexes, mbtiType }; // 새로운 사용자 객체
    setSavedData([...savedData, newData]); // 기존 목록에 추가
    setName(""); // 이름 초기화
    setSelectedImageIndexes([-1, -1, -1, -1]); // 선택값 초기화
  };

  // 특정 사용자 삭제
  const handleDelete = (indexToDelete) => {
    const updatedData = savedData.filter((_, index) => index !== indexToDelete);
    setSavedData(updatedData);
  };

  // 결과 보기 버튼 클릭 시 페이지 이동
  const handleShowResult = () => {
    if (savedData.length < 2) {
      alert(savedData.length === 0 ? "MBTI 타입을 입력해주세요." : "2명 이상의 정보를 입력해주세요");
      return;
    }

    navigate('/compatibility/result', {
      state: { savedData, mbtiTexts } // 페이지로 데이터 전달
    });
  };

  // 저장된 사용자 데이터를 렌더링하는 함수
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

  // 실제 렌더링되는 JSX 반환
  return (
    <div className={styles.main}>
      <div className={styles.section}>
        <p>이름과 MBTI를 입력하여 추가 버튼을 눌러주세요. TEST</p>

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
              className={`${styles[text]} ${
                selectedImageIndexes[Math.floor(textIndex / 2)] === textIndex ? styles.selected : ""
              }`}
              onClick={() => handleImageClick(Math.floor(textIndex / 2), textIndex)}
            >
              {text}
            </div>
          ))}
        </div>

        <div className={styles.section_footer}>
          <button label="궁합보기" onClick={handleShowResult} />
        </div>

        <div>
          <div>{renderSavedData()}</div>
        </div>
      </div>
    </div>
  );
};

export default Input; // 컴포넌트 내보내기
