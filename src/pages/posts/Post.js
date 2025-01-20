import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Post.module.css";
import OpinionBarChart from "../../components/OpinionBarChart";
import TopComments from "../comments/TopComments";
import Comments from "../comments/Comments";
import { useParams } from "react-router-dom";
import { format, render, cancel, register } from 'timeago.js';
import CreateComment from "../comments/CreateComment"
import UserInfo from "../../components/UserInfo";

import koLocale from 'timeago.js/lib/lang/ko'
register('ko', koLocale)

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    axios
      .get(`http://ec2-43-200-178-68.ap-northeast-2.compute.amazonaws.com:8080/post?postid=${id}`)
      .then((response) => {
        setPost(response.data);
        console.log("post 받아옴")
      }).catch(
        console.log("포스트 요청 실패")
      )
  }, [])

  return (
    <div className={styles.main}>
      <div className={styles.section}>
        <div className={styles.header}>
          <div className={styles.header_profile}>
            <UserInfo userImage={post.profileImage} userId={post.username} mbti={post.mbtiType} />
            <span className={styles.time}>조회수&nbsp;{post.view}&nbsp;·&nbsp; {format(`${post.createAt}`, 'ko')} </span>
          </div>

          <h2>{post.title}</h2>
          <OpinionBarChart optionA={post.optionA} optionB={post.optionB} countByOptionA={post.countCommentByOptionA} countByOptionB={post.countCommentByOptionB} />
        </div>

        <div className={styles.body}>
          <p>인기 댓글</p>
          <TopComments topCommentA={post.getTopCommentA} topCommentB={post.getTopCommentB} />
        </div>

        <div className={styles.footer}>
          <p>모든 댓글</p>
          <Comments id={id} />

          {post.countComment == 0 ? <div>아직 댓글이 없습니다😞</div> : <div></div>}
        </div>
      </div>
    </div>
  );
};

export default Post;
