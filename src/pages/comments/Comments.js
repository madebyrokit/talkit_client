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
  const [page, setPage] = useState(0); // 현재 페이지
  const [hasMore, setHasMore] = useState(true); // 더 이상 로드할 데이터가 있는지 여부

  const [ref, inView] = useInView({
    threshold: 0.5,
  });


  useEffect(() => {
    const loadPosts = async () => {
      console.log("page" + page);
      if (!hasMore) return; // 더 이상 로드할 데이터가 없다면 요청하지 않음
      try {
        const response = await axios.get(`http://192.168.31.181:8080/comment/list?page=${page}&size=5&postid=${id}`);
        setCommentList((prevPosts) => [...prevPosts, ...response.data]); // 기존 게시물에 새로운 게시물 추가
        setHasMore(response.data.length > 0); // 추가로 로드할 데이터가 있는지 확인
        setPage(prevPage => prevPage + 1); // 페이지 증가
      } catch (error) {
        alert("댓글을 불러오지 못했습니다😞 잠시 후 다시 시도해주세요.")
        console.error("게시물을 불러오는 데 실패했습니다", error);
      }

    };

    loadPosts();
  }, [inView]); // 페이지가 변경될 때마다 데이터 로드

  return (
    <div className={styles.main}>

      <div className={styles.section}>
        <CreateComment postId={id} setCommentList={setCommentList} />
      </div>

      {commentList.map((comment, i) => (
        <div key={comment.commentId}
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
                  onClick={() => setModal((prevId) => !setModal(prevId => prevId === comment.commentId ? null : comment.commentId))}>···</div>
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
      {/* 스크롤에 의해 불러오는 부분 */}
      {hasMore && <div ref={ref} className={styles.loading}>로딩 중...</div>}
    </div>
  );
};

export default Comments;
