import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Post.module.css";
import OpinionBarChart from "../../components/OpinionBarChart";
import TopComments from "../comments/TopComments";
import Comments from "../comments/Comments";
import { useParams } from "react-router-dom";
import { format, render, cancel, register } from 'timeago.js';
import CommentForm from "../comments/CreateComment"
import UserInfo from "../../components/UserInfo";

import koLocale from 'timeago.js/lib/lang/ko'
register('ko', koLocale)

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/post?page=0&size=10&post_id=${id}`)
      .then((response) => {
        setPost(response.data);
        setComments(response.data.commentList);
        console.log("b")
      }).catch(
        console.log("포스트 요청 실패")
      )
  }, [])

  return (
    <div className={styles.main}>

      <div className={styles.header}>
        <div className={styles.header_profile}>
          <UserInfo userImage={post.profileImage} userId={post.username} mbti={post.mbti} />
          <span>조회수&nbsp;{post.view}&nbsp;·&nbsp; {format(`${post.createAtPost}`, 'ko')} </span>
        </div>

        <h2>{post.title}</h2>
        <OpinionBarChart optionA={post.optionA} optionB={post.optionB} countByOptionA={post.countCommentByOptionA} countByOptionB={post.countCommentByOptionB} />
      </div>

      <div className={styles.body}>
        <h3>인기 댓글</h3>
        <TopComments topCommentA={post.topCommentA} topCommentB={post.topCommentB}/>
        <CommentForm postId={id} comments={comments} setComments={setComments}/>
      </div>

      <div className={styles.footer}>
        <h3>모든 댓글</h3>
        {comments.length > 0 
        ? <Comments comments={comments} setComments={setComments} />
        : <div>아직 댓글이 없습니다😞</div>
        }
        
      </div>
    </div>
  );
};

export default Post;
