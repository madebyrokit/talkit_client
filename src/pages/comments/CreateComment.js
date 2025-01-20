import React, { useState } from "react";
import styles from "./CreateComment.module.css";
import { handleSubmitComment } from "../../utils/submit.js";
import { useAuth } from "../../utils/AuthContext.js";
import OpinionButton from "../../components/OpinionButton.js"

const CreateComment = ({ postId, setCommentList }) => {
  const [newComment, setNewComment] = useState("");
  const [selectedOpinion, setSelectedOpinion] = useState(null);
  const { isLoggedIn } = useAuth();

  return (
    <div className={styles.main}>

      <div className={styles.header}>
        <OpinionButton
          opinion="A"
          selectedOpinion={selectedOpinion}
          setSelectedOpinion={setSelectedOpinion}
          isLoggedIn={isLoggedIn}
        />
        <OpinionButton
          opinion="B"
          selectedOpinion={selectedOpinion}
          setSelectedOpinion={setSelectedOpinion}
          isLoggedIn={isLoggedIn}
        />
      </div>

      <div className={styles.body}>
        <input
          className={styles.input_element}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder={isLoggedIn ? "의견을 적어주세요" : "로그인 후에 이용 가능한 기능입니다."}
          disabled={!isLoggedIn} />
      </div>

      <div className={styles.footer}>
      <button className={styles.button} onClick={() => {handleSubmitComment(postId, newComment, selectedOpinion, setCommentList)}} disabled={!isLoggedIn}>
          작성
        </button>
      </div>

    </div>
);
};

export default CreateComment;
