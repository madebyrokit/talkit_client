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

import { FaArrowUp } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { MdDateRange } from "react-icons/md";

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
        const response = await axios.get(`http://localhost:8080/posts/list?page=${page}&size=10&sort=${selected}`);
        setPosts((prevPosts) => [...prevPosts, ...response.data]);
        setHasMore(response.data.length > 0);
        setPage((e) => e + 1);
        console.log(response.data)
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
      {/* <div className={styles.section}>

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

      </div> */}

      {isModalOpen ? <CreatePost setIsModalOpen={setIsModalOpen} setPosts={setPosts} /> : <div />}


      {posts.map((data, i) =>

      (
        <div
          key={i}
          className={styles.section1_post}
          ref={ref}
          onClick={() => navigate(`/post/${data.postId}`)}
        >
          <div className={styles.body_header}>

            <div className={styles.start_header}>
              <UserInfo userImage={data.avatar} userId={data.username} mbti={data.mbti_type} />
            </div>


            <div className={styles.end_header}>
              <button className={styles.info_button}>
                <IoEyeSharp color="gray" />{data.total_views}
              </button>
              <button className={styles.info_button}>
                <FaComment color="gray" />{data.total_comments}
              </button>
              <button className={styles.info_button}>
                <MdDateRange color="gray" />{format(`${data.created_at}`, 'ko')}
              </button>
            </div>

            {/* <select className={styles.select_element} onChange={handleSelect} value={selected}>
                      <option value="last">최신순</option>
                      <option value="view_desc">조회수 ↓</option>
                      <option value="comment_desc">댓글 ↓</option>
                      <option value="like_desc">좋아요 ↓</option>
                    </select> */}




          </div>

          <div className={styles.body_body}>
            <span>{data.title}</span>
            <p>A. {data.opinion_a}</p>
            <p>B. {data.opinion_b}</p>
          </div>
          <div className={styles.body_footer}>
            {/* <div
                className={styles.body_footer_button}
                onClick={(e) => { e.stopPropagation(); handleLikePost(data.postId, i, posts, setPosts); }}>
                👍&nbsp;{data.like}
              </div> */}
            <button className={styles.like_button}>
              <FaArrowUp
                onClick={(e) => { e.stopPropagation(); handleLikePost(data.postId, i, posts, setPosts); }} />
              {data.total_likes}
            </button>


          </div>
        </div>
      ))}

      {hasMore ? <div className={styles.loading}>로딩 중...</div> : <div>더 이상 게시물이 없습니다.</div>}
    </div>
  );
};

export default ListPosts;
