import React, { useEffect, useState } from "react";
import styles from "./CreatePost.module.css";
import axios from "axios";


function CreatePost({ setIsModalOpen, setPosts }) {
  const [errorMessage, setErrorMessage] = useState("");

  const [title, setTitle] = useState("");
  const [opinionA, setOpinionA] = useState("");
  const [opinionB, setOpinionB] = useState("");
  const [isValid, setIsValid] = useState(false);
  
  const handleSubmitPost = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("로그인한 뒤에 이용할 수 있습니다.");
        return;
    }


    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/posts`,
            { title: title, opinion_a: opinionA, opinion_b: opinionB },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        setIsModalOpen(false);
        console.log(response.data);
        setPosts((prevPosts) => {
            return [response.data, ...prevPosts]; 
        });

    } catch (error) {
        console.error("Error creating comment", error);
        throw error;
    }
};

  useEffect(() => {
    // validateInputs를 실행하고, 결과를 isValid에 저장
    const validateInputs = () => {
      if (!title.trim()) {
        setErrorMessage("주제를 입력해주세요.");
        return false;
      }
      if (!opinionA.trim()) {
        setErrorMessage("의견 A를 입력해주세요.");
        return false;
      }
      if (!opinionB.trim()) {
        setErrorMessage("의견 B를 입력해주세요.");
        return false;
      }
      if (title.length > 16) {
        setErrorMessage("주제는 최대 16자리까지 입력 가능합니다.");
        return false;
      }
      if (opinionA.length > 16) {
        setErrorMessage("의견 A는 16자리까지 입력 가능합니다.");
        return false;
      }
      if (opinionB.length > 16) {
        setErrorMessage("의견 B는 16자리까지 입력 가능합니다.");
        return false;
      }
      setErrorMessage("");
      return true;
    };

    setIsValid(validateInputs());
  }, [title, opinionA, opinionB]); 

  return (
    <div className={styles.main}>
      <div className={styles.containor}>
        <div className={styles.header}>
        {errorMessage ? <p className={styles.error}>{errorMessage}</p> : <p className={styles.title}>Talkit</p>}

        </div>

        <div className={styles.body}>

          <div>
            <input
              type="text"
              name="title"
              placeholder="주제"
              value={title}
              maxLength="16"
              onChange={(e) => setTitle(e.target.value)}
              className={styles.inputelement}
            ></input>
          </div>

          <div className={styles.formContext}>
            <input
              placeholder="A"
              type="text"
              name="A"
              value={opinionA}
              maxLength="16"
              onChange={(e) => setOpinionA(e.target.value)}
              className={styles.inputelement}
            ></input>
          </div>

          <div className={styles.formContext}>
            <input
              placeholder="B"
              type="text"
              name="B"
              value={opinionB}
              maxLength="16"
              onChange={(e) => setOpinionB(e.target.value)}
              className={styles.inputelement}
            ></input>
          </div>
        </div>

        <div className={styles.footer}>
          <button
            className={styles.button_element}
            disabled={!isValid}
            onClick={ handleSubmitPost }
          >작성하기</button>
        </div>

      </div>

    </div>


  );
}

export default CreatePost;
