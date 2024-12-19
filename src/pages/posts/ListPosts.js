import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useAuth } from "../../utils/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./ListPosts.module.css";
import UserInfo from "../../components/UserInfo";
import { format } from 'timeago.js';
import { handleLikePost } from "../../utils/submit.js";
import CreatePost from "./CreatePost.js";

const ListPosts = () => {
  const [posts, setPosts] = useState([]); // 게시물 데이터
  
  const [page, setPage] = useState(0); // 현재 페이지
  const [hasMore, setHasMore] = useState(true); // 더 이상 로드할 데이터가 있는지 여부
  const { isLoggedIn } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const [selected, setSelected] = useState("last");

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

  const handleSelect = (e) => {
    setSelected(e.target.value);
    setPage(0); // 페이지를 0으로 리셋하여 첫 페이지부터 다시 로드
    setPosts([]); // 기존 게시물을 지워서 새로 로드
  }

  useEffect(() => {
    console.log("page" + page);
    const loadPosts = async () => {
 
      try {
        const response = await axios.get(`http://localhost:8080/post/list?page=${page}&size=5&sort=${selected}`);
        setPosts((prevPosts) => [...prevPosts, ...response.data]); // 기존 게시물에 새로운 게시물 추가
        setHasMore(response.data.length > 0); // 추가로 로드할 데이터가 있는지 확인

        console.info("sad",response.data)
      } catch (error) {
        alert("글을 불러오지 못했습니다😞 잠시 후 다시 시도해주세요.")
        console.error("게시물을 불러오는 데 실패했습니다", error);
      }

    };

    loadPosts();
  }, [page, selected]); // 페이지가 변경될 때마다 데이터 로드

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div>
          <select onChange={handleSelect} value={selected}>
            <option value="last">최신순</option> 
            <option value="view_desc">조회수 ↓</option>
            <option value="comment_desc">댓글 ↓</option>
            <option value="like_desc">좋아요 ↓</option>
          </select>
        </div>
        <div>
          <input type="text" placeholder="키워드를 입력해주세요." />
        </div>
        {isLoggedIn ? <div onClick={() => setIsModalOpen((e) => !e)}>✏️</div> : <div />}
      </div>
      {isModalOpen ? <CreatePost setIsModalOpen={setIsModalOpen} setPosts={setPosts} /> : <div />}
      <div className={styles.body}>
        {posts.map((data, i) =>

        (
          <div
            key={i}
            className={styles.body_main}
            ref={posts.length === i + 1 ? lastPostElementRef : null} // 마지막 게시물에 ref 설정
            onClick={() => navigate(`/post/${data.postId}`)}
          >
            <div className={styles.body_header}>
              <UserInfo userImage={data.profileImage} userId={data.username} mbti={data.mbtiType} />
              <div className={styles.body_header_box}>
                <p>조회{data.view}&nbsp;·&nbsp;</p>
                <p>댓글{data.countComment}&nbsp;·&nbsp;</p>
                <p>{format(`${data.createAt}`, 'ko')}</p>
              </div>

            </div>

            <div className={styles.body_body}>
              <span>{data.title}</span>
              <p>A. {data.optionA}</p>
              <p>B. {data.optionB}</p>
            </div>
            <div className={styles.body_footer}>
              <div
                className={styles.body_footer_button}
                onClick={(e) => { e.stopPropagation(); handleLikePost(data.postId, i, posts, setPosts); }}>
                {data.like}&nbsp;👍
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default ListPosts;
