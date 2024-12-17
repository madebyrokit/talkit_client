import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Mypage.module.css";
import { Mypage } from "./Mypage";
import { useAuth } from "../../utils/AuthContext";

const Mydiscussion = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    if (user && user.id) {
      const userId = user.userId;
      const token = sessionStorage.getItem("token");

      axios
        .get(`/mypage/${userId}/posts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          setPosts(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user posts", error);
        });
    }
  }, [user]);

  return (
    <section className={styles.Myinfo}>
      <Mypage />
      <div className={styles.Box2}>
        <div className={styles.Mycontentlist}>
          <h1 className={styles.h1}>내가 만든 토론</h1>
          <p className={styles.p}>너를 위해 구웠지🍪</p>
          {posts.map((post) => (
            <div key={post.id} className={styles.postContainer}>
              <h2 className={styles.postTitle}>{post.title}</h2>
              <div className={styles.postDetails}>
                <span className={styles.postOption}>A: {post.optionA}</span>
                <span className={styles.postOption}>B: {post.optionB}</span>
                <span className={styles.postDate}>
                  작성일: {new Date(post.createdAt).toLocaleDateString()}
                </span>
                <span className={styles.postViews}>
                  조회수: {post.viewCount}
                </span>
                <span className={styles.postLikes}>
                  좋아요: {post.likeCount}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mydiscussion;
