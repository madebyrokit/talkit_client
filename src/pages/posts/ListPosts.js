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

  const [hasMore, setHasMore] = useState(true);
  const [selected, setSelected] = useState("last");

  const [page, setPage] = useState(0);

  const [ref, inView] = useInView({
    threshold: 0.5,
  });

  const handleSelect = (e) => {
    setSelected(e.target.value);
    setPage(0);
    setPosts([]);
    setHasMore(true);
  }

  useEffect(() => {

    const loadPosts = async () => {
      try {
        const response = await axios.get(`http://ec2-43-200-178-68.ap-northeast-2.compute.amazonaws.com:8080/post/list?page=${page}&size=10&sort=${selected}`);
        setPosts((prevPosts) => [...prevPosts, ...response.data]);
        setHasMore(response.data.length > 0);
        setPage((e) => e + 1);
      } catch (error) {
        console.error("게시물을 불러오는 데 실패했습니다", error);
        setHasMore(false);
      }
    };
    console.log("유스이펙트", selected, page, hasMore);
    
    if (hasMore) loadPosts();
  }, [inView, selected, hasMore]);

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
          <input className={styles.input_element} type="text" placeholder="검색 서비스 준비중입니다." />
        </div>

        <div className={styles.section_header1}>
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
      {hasMore ? <div className={styles.loading}>로딩 중...</div> : <div>더 이상 게시물이 없습니다.</div>}
    </div>
  );
};

export default ListPosts;
