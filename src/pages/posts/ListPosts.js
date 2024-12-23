import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useAuth } from "../../utils/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./ListPosts.module.css";
import UserInfo from "../../components/UserInfo";
import { format } from 'timeago.js';
import { handleLikePost } from "../../utils/submit.js";
import CreatePost from "./CreatePost.js";
import { useInView } from 'react-intersection-observer';

const ListPosts = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const { isLoggedIn } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selected, setSelected] = useState("last");
  const [hasMore, setHasMore] = useState(true); // 더 이상 로드할 데이터가 있는지 여부
  const [page, setPage] = useState(0);

  const [ref, inView] = useInView({
    threshold: 0.5,
  });

  const handleSelect = (e) => {
    setSelected(e.target.value);
    console.log(selected)
    setPage(0); // 페이지를 0으로 리셋하여 첫 페이지부터 다시 로드
    setPosts([]); // 기존 게시물을 지워서 새로 로드
    setHasMore(true);
  }

  useEffect(() => {
    const loadPosts = async () => {
      console.log(page);
      if (!hasMore) return; // 더 이상 로드할 데이터가 없다면 요청하지 않음

      try {
        const response = await axios.get(`http://192.168.31.181:8080/post/list?page=${page}&size=5&sort=${selected}`);
        setPosts((prevPosts) => [...prevPosts, ...response.data]); // 기존 게시물에 새로운 게시물 추가
        setHasMore(response.data.length > 0); // 추가로 로드할 데이터가 있는지 확인
        setPage(prevPage => prevPage + 1); // 페이지 증가


      } catch (error) {
        alert("글을 불러오지 못했습니다😞 잠시 후 다시 시도해주세요.");
        console.error("게시물을 불러오는 데 실패했습니다", error);
      }
    };
    loadPosts();

  }, [inView, selected]);

  return (
    <div className={styles.main}>

      <div className={styles.section}>
        <div className={styles.section_header}>
          <select className={styles.select_element} onChange={handleSelect} value={selected}>
            <option value="last">최신순</option>
            <option value="view_desc">조회수 ↓</option>
            <option value="comment_desc">댓글 ↓</option>
            <option value="like_desc">좋아요 ↓</option>
          </select>


          <input className={styles.input_element} type="text" placeholder="키워드를 입력해주세요." />
          {isLoggedIn ? <button className={styles.button_element} onClick={() => setIsModalOpen((e) => !e)}>글쓰기</button> : <div />}
        </div>


      </div>

      {isModalOpen ? <CreatePost setIsModalOpen={setIsModalOpen} setPosts={setPosts} /> : <div />}

      <div className={styles.section1}>
        {posts.map((data, i) =>

        (
          <div
            key={i}
            className={styles.section1_post}
            ref={ref}
            onClick={() => navigate(`/post/${data.postId}`)}
          >
            <div className={styles.body_header}>
              <UserInfo userImage={data.profileImage} userId={data.username} mbti={data.mbtiType} />
             
                <p className={styles.time}>조회{data.view}</p>
                <p className={styles.time}>댓글{data.countComment}</p>
                <p className={styles.time}>{format(`${data.createAt}`, 'ko')}</p>
              

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
                👍&nbsp;{data.like}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* 스크롤에 의해 불러오는 부분 */}
      {hasMore && <div ref={ref} className={styles.loading}>로딩 중...</div>}
    </div>
  );
};

export default ListPosts;
