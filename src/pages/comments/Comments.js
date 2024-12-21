import React, { useEffect, useState, useRef } from "react";
import UserInfo from "../../components/UserInfo";
import styles from "./Comments.module.css";
import ModalComment from "./MoldalComment.js";
import { handleLikeComment } from "../../utils/submit.js";
import { format, render, cancel, register } from 'timeago.js';
import koLocale from 'timeago.js/lib/lang/ko';
import CreateComment from "./CreateComment.js";
import axios from "axios";
register('ko', koLocale);


const Comments = ({ id }) => {
  const [modal, setModal] = useState(null);
  const [commentList, setCommentList] = useState([]);
  const [page, setPage] = useState(0); // 현재 페이지
  const [hasMore, setHasMore] = useState(true); // 더 이상 로드할 데이터가 있는지 여부

  // 마지막 게시물 div를 참조
  const observer = useRef();
  
  // IntersectionObserver 콜백 함수
  const lastPostElementRef = (node) => {
 
    if (observer.current) observer.current.disconnect(); // 이전 observer를 해제

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
      setPage((prevPage) => prevPage + 1); // 페이지를 증가시켜서 데이터 로드
      }
    });

    if (node) observer.current.observe(node); // 새로운 노드를 관찰
  };

  useEffect(() => {
    console.log("page" + page);
    const loadPosts = async () => {
 
      try {
        const response = await axios.get(`http://192.168.31.181:8080/comment/list?page=${page}&size=5&postid=${id}`);
        setCommentList((prevPosts) => [...prevPosts, ...response.data]); // 기존 게시물에 새로운 게시물 추가
        setHasMore(response.data.length > 0); // 추가로 로드할 데이터가 있는지 확인

        console.info("sad",response.data)
      } catch (error) {
        alert("댓글을 불러오지 못했습니다😞 잠시 후 다시 시도해주세요.")
        console.error("게시물을 불러오는 데 실패했습니다", error);
      }

    };

    loadPosts();
  }, [page]); // 페이지가 변경될 때마다 데이터 로드

  return (
    <div className={styles.main}>
      
      <div className={styles.section}>
      <CreateComment postId={id} setCommentList={setCommentList}/>
      </div>
      
      {commentList.map((comment, i) => (
        <div ref={commentList.length === i + 1 ? lastPostElementRef : null} 
        key={comment.commentId}
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

    </div>
  );
};

export default Comments;
