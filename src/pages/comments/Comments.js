import React, { useEffect, useState, useRef } from "react";
import UserInfo from "../../components/UserInfo";
import styles from "./Comments.module.css";
import ModalComment from "./MoldalComment.js";
import { handleLikeComment } from "../../utils/submit.js";
import { format, render, cancel, register } from 'timeago.js';
import koLocale from 'timeago.js/lib/lang/ko';
import CreateComment from "./CreateComment.js";
import { useInView } from 'react-intersection-observer';
import axios from "axios";
register('ko', koLocale);


const Comments = ({ id }) => {
  const [modal, setModal] = useState(null);
  const [commentList, setCommentList] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [ref, inView] = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await axios.get(`http://ec2-43-200-178-68.ap-northeast-2.compute.amazonaws.com:8080/comment/list?page=${page}&size=3&postid=${id}`);
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
        <CreateComment postId={id} setCommentList={setCommentList} />
      </div>

      {commentList.map((comment, i) => (
        <div key={comment.commentId}
        ref={ref}
          className={comment.option === "A" ? styles.left : styles.right}
        >
          {modal === comment.commentId ? <ModalComment setModal={setModal} />
            : <div className={styles.body}>
              <div className={styles.body_header}>
                <UserInfo
                  userImage={comment.profileImage}
                  userId={comment.username}
                  mbti={comment.mbtiType}
                  opinion={comment.postId}
                />
                <p className={styles.time}>{format(`${comment.createAt}`, 'ko')}</p>
                <div className={styles.body_header_button}
                  onClick={() => setModal((prevId => prevId === comment.commentId ? null : comment.commentId))}>···</div>
              </div>

              <div className={styles.body_body}>
                {comment.content}
              </div>

              <div className={styles.body_footer}>
                <div
                  className={styles.body_footer_button}
                  onClick={() => {
                    handleLikeComment(comment.commentId, i, commentList, setCommentList);
                  }}
                >
                  👍&nbsp;{comment.like}
                </div>
              </div>
            </div>}
        </div>
      ))}
      
      {hasMore ? <div className={styles.loading}>로딩 중...</div> : <div></div>}
    </div>
  );
};

export default Comments;
