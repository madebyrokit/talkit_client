import React, { useState } from "react";
import axios from "axios";
import styled from "./AccountManagement.module.css";

const AccountManagement = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // 선택한 파일을 상태에 저장
  };

  const handleSubmit = async () => {
    if (!file) {
      alert("파일을 선택해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://ec2-43-200-178-68.ap-northeast-2.compute.amazonaws.com:8080/member/profileimage", // 서버의 API 엔드포인트
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            
          },
        }
      );
      alert("파일 업로드 성공!");
      console.log(response.data);
    } catch (error) {
      console.error("파일 업로드 실패:", error);
      alert("파일 업로드 실패");
    }
  };

  return (
    <div className={styled.main}>
      <div className={styled.containor}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange} // 파일 선택 시 실행되는 이벤트 핸들러
        />
        <button onClick={handleSubmit}>프로필 이미지 업로드</button>
      </div>
    </div>
  );
};

export default AccountManagement;
