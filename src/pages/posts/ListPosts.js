import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useAuth } from "../../utils/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./ListPosts.module.css";
import UserInfo from "../../components/UserInfo";
import { format } from 'timeago.js';
import CreatePost from "./CreatePost.js";
import { useInView } from 'react-intersection-observer';

import ad1 from "../../assets/ad1.jpeg";
import ad2 from "../../assets/ad2.jpeg";

import { FaArrowUp } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { IoMdTime } from "react-icons/io";
import { VscError } from "react-icons/vsc";
import Post from "./Post.js";

const ListPosts = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const { isLoggedIn } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [modal, setModal] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  const [hasMore, setHasMore] = useState(true);
  const [selected, setSelected] = useState("last");

  const [page, setPage] = useState(0);

  const location = useLocation();
  const category = location.state?.category;

  const [ref, inView] = useInView({
    threshold: 0.5,
  });

  const handleSelect = (e) => {
    setSelected(e.target.value);
    setPage(0);
    setPosts([]);
    setHasMore(true);
  }

  const handleLikePost = async (postId, index, posts, setPosts) => {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("로그인이 필요합니다.");
        return;
    }


    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/posts/like`,
            { postId: postId },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const updatedPosts = [...posts];
        updatedPosts[index] = {
            ...updatedPosts[index],
            like: response.data,
        };

        setPosts(updatedPosts);
        console.log(response.data)
    } catch (error) {
        console.error("Error", error);
        alert("글 좋아요 변경에 실패했습니다.");
    }
};

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts/list?page=${page}&size=10&sort=${selected}`);
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

      {isModalOpen ? <CreatePost setIsModalOpen={setIsModalOpen} setPosts={setPosts} /> : <div />}

      {
        modal ? <Post postId={selectedPostId} setModal={setModal}></Post> : <></>
      }

      <div className={styles.section1}>
        <img src={ad1} />
        <img src={ad1} />
        <img src={ad1} />
      </div>

      <div className={styles.section2}>

        <div className={styles.section2_header}>
          {
            category ? <h3>{category}</h3> : <h3>자유 토론</h3>
          }

          <select className={styles.select_element} onChange={handleSelect} value={selected}>
            <option value="last">최신순</option>
            <option value="view_desc">조회수 high to low</option>
            <option value="comment_desc">댓글 high to low</option>
            <option value="like_desc">좋아요 high to low</option>
          </select>
        </div>

        {posts.map((data, i) => (

          <div className={styles.hor}>
            <div
              key={i}
              className={styles.post}
              ref={ref}
              onClick={() => {
                setSelectedPostId(data.post_id);  // 클릭한 post_id 저장
                setModal(true);                   // 모달 열기
              }}
            >
              <div className={styles.post_header}>
                <div className={styles.post_header_front}>
                  <UserInfo userImage={data.avatar} userId={data.username} mbti={data.mbti_type} />
                </div>
                <div className={styles.post_header_rear}>
                  <button className={styles.info_button}>
                    <IoEyeSharp color="gray" />{data.total_views}
                  </button>
                  <button className={styles.info_button}>
                    <FaComment color="gray" />{data.total_comments}
                  </button>
                  <button className={styles.info_button}>
                    <IoMdTime color="gray" />{format(`${data.created_at}`, 'ko')}
                  </button>
                </div>
              </div>

              <div className={styles.post_body}>
                <span>{data.title}</span>
                <p>A. {data.opinion_a}</p>
                <p>B. {data.opinion_b}</p>
              </div>

              <div className={styles.post_footer}>
                <button className={styles.like_button}>
                  <FaArrowUp
                    onClick={(e) => { e.stopPropagation(); handleLikePost(data.postId, i, posts, setPosts); }} />
                  {data.total_likes}
                </button>
              </div>

            </div>
          </div>
        ))}
        {hasMore ? <div className={styles.loading}>로딩 중...</div> : <div>END</div>}
      </div>

      <div className={styles.section3}>
        <img src={ad2} />
        <img src={ad2} />
        <img src={ad2} />
      </div>

    </div>
  );
};

export default ListPosts;
