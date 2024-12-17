import React, { useState } from "react";
import styles from "./CreatePost.module.css";
import { handleSubmitPost } from "../../utils/submit.js";

function CreatePost({ setIsModalOpen, setPosts }) {

  const [requestPost, setRequestPost] = useState({ title: "", A: "", B: "", });
  const { title, A, B } = requestPost;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRequestPost((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className={styles.main}>

      <div className={styles.header}>
        <p className={styles.title}>Talkit</p>
      </div>

      <div className={styles.body}>

        <div>
          <input
            type="text"
            name="title"
            placeholder="주제"
            value={requestPost.title}
            onChange={handleInputChange}
            className={styles.input}
          ></input>
        </div>

        <div className={styles.formContext}>
          <input
            placeholder="A"
            type="text"
            name="A"
            value={requestPost.A}
            onChange={handleInputChange}
            className={styles.input}
          ></input>
        </div>

        <div className={styles.formContext}>
          <input
            placeholder="B"
            type="text"
            name="B"
            value={requestPost.B}
            onChange={handleInputChange}
            className={styles.input}
          ></input>
        </div>
      </div>

      <div className={styles.footer}>
        <button onClick={() => { handleSubmitPost(requestPost.title, requestPost.A, requestPost.B, setIsModalOpen, setPosts) }}>작성하기</button>
      </div>

    </div>


  );
}

export default CreatePost;
