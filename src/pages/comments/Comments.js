import React, { useEffect, useState } from "react";
import UserInfo from "../../components/UserInfo";
import styles from "./Comments.module.css";
import { handleLikeComment } from "../../utils/submit.js";
import { format, render, cancel, register } from 'timeago.js';
import ModalComment from "./MoldalComment.js";
import koLocale from 'timeago.js/lib/lang/ko';
register('ko', koLocale);


const Comments = ({ comments, setComments }) => {
  const [modal, setModal] = useState(null);

  return (
    <div className={styles.main}>
      {comments.map((data, i) => (
        <div key={data.commentId} className={data.option === "A" ? styles.left : styles.right}>
          {modal === data.commentId ? <ModalComment setModal={setModal} />
            : <div className={styles.body}>
              <div className={styles.body_header}>
                <UserInfo
                  userImage={data.profileImage}
                  userId={data.username}
                  mbti={data.mbtiType}
                  opinion={data.postId}
                />
                {format(`${data.createAt}`, 'ko')}
                <div className={styles.body_header_button}
                  onClick={() => setModal((prevId) => !setModal(prevId => prevId === data.commentId ? null : data.commentId))}>···</div>
              </div>

              <div className={styles.body_body}>{data.content}</div>

              <div className={styles.body_footer}>
                <div
                  className={styles.body_footer_button}
                  onClick={() => {
                    handleLikeComment(data.commentId, i, comments, setComments);
                  }}
                >
                  👍{data.like}
                </div>
              </div>
            </div>}
        </div>
      ))}

    </div>
  );
};

export default Comments;
