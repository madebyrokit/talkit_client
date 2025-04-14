import React, { useEffect, useState, useRef } from "react";
import UserInfo from "../../components/UserInfo";
import styles from "./Comments.module.css";
import ModalComment from "./MoldalComment.js";
import { handleLikeComment } from "../../utils/submit.js";
import { format, render, cancel, register } from 'timeago.js';
import koLocale from 'timeago.js/lib/lang/ko';
import { useInView } from 'react-intersection-observer';
import axios from "axios";
import OpinionButton from "../../components/OpinionButton.js"
import { useAuth } from "../../utils/AuthContext.js";
import { MdMoreHoriz } from "react-icons/md";
register('ko', koLocale);


const Comments = ({ id }) => {
  const [modal, setModal] = useState(null);
  const [commentList, setCommentList] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const { isLoggedIn } = useAuth();

  const [newComment, setNewComment] = useState("");
  const [selectedOpinion, setSelectedOpinion] = useState(null);

  const [ref, inView] = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/comments?page=${page}&size=3&post_id=${id}`);
        setCommentList((prevPosts) => [...prevPosts, ...response.data]);
        setHasMore(response.data.length > 0);
        setPage(prevPage => prevPage + 1);

      } catch (error) {
        console.error("게시물을 불러오는 데 실패했습니다", error);
        setHasMore(false)
      }

    };
    console.log("댓글 유스이펙트", page, hasMore);
    if (hasMore) {
      loadPosts();
    }
  }, [inView, hasMore]);

  return (
    <div className={styles.main}>
<div className={styles.section}>
  <p>모든 댓글</p>
</div>
      <div className={styles.section1}>
        <div className={styles.section1_header}>
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

        <div className={styles.section1_body}>
          <input
            className={styles.input_element}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={isLoggedIn ? "의견을 적어주세요" : "로그인 후에 이용 가능한 기능입니다."}
            disabled={!isLoggedIn} />
        </div>

        <div className={styles.section1_footer}>
          <button className={styles.button} disabled={!isLoggedIn}>
            작성
          </button>
        </div>

      </div>


      <div className={styles.section2}>
        {commentList.map((comment, i) => (
          <div key={comment.commentId} ref={ref} className={comment.opinion === "A" ? styles.left : styles.right}>


            <div className={styles.section2_header}>
              <UserInfo
                userImage={comment.avatar}
                userId={comment.username}
                mbti={comment.mbti_type}
                opinion={comment.post_id}
              />
              <p className={styles.time}>{format(`${comment.created_at}`, 'ko')}</p>
              <button className={styles.body_header_button}
                onClick={() => setModal((prevId => prevId === comment.comment_id ? null : comment.comment_id))}>
                <MdMoreHoriz />
              </button>
            </div>

            <div className={styles.section2_body}>
              {comment.content}
            </div>

            <div className={styles.section2_footer}>
              <div
                className={styles.section2_footer_button}
              // onClick={() => {
              //   handleLikeComment(comment.commentId, i, commentList, setCommentList);
              // }}
              >
                👍&nbsp;{comment.like}
              </div>
            </div>


          </div>
        ))}

        {hasMore ? <div className={styles.loading}>로딩 중...</div> : <div></div>}
      </div>

    </div>
  );
};

export default Comments;
