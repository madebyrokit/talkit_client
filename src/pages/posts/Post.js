import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Post.module.css";
import OpinionBarChart from "../../components/OpinionBarChart";

import Comments from "../comments/Comments";
import { useParams } from "react-router-dom";
import { format, render, cancel, register } from 'timeago.js';

import UserInfo from "../../components/UserInfo";

import { FaRegSadTear } from "react-icons/fa";
import { VscError } from "react-icons/vsc";
import { IoEyeSharp } from "react-icons/io5";
import { IoMdTime } from "react-icons/io";
import { MdClose } from "react-icons/md";

import koLocale from 'timeago.js/lib/lang/ko'
register('ko', koLocale)



const Post = ({ postId, setModal }) => {

  const [post, setPost] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8080/posts?post_id=${postId}`)
      .then((response) => {
        setPost(response.data);
        console.log(response.data);
      }).catch(
        console.log("포스트 요청 실패")
      )

  }, [])

  return (
    <div className={styles.main}>

      <div className={styles.section1}>
        
        <div className={styles.menu} onClick={() => { setModal(false) }}>
          <button className={styles.aa}>
            <MdClose size={30}/>
          </button>
        </div>

        <div className={styles.section1_header}>
          <div className={styles.section1_header_front}>
            <UserInfo userImage={post.avatar} userId={post.username} mbti={post.mbti_type} />
          </div>

          <div className={styles.section1_header_rear}>
            <button>
              <IoEyeSharp />{post.view}
            </button>
            <button>
              <IoMdTime />{format(`${post.created_at}`, 'ko')}
            </button>
          </div>
        </div>

        <div className={styles.section1_body}>
          <h2>{post.title}</h2>

        </div>

        <div className={styles.section1_footer}>
          <OpinionBarChart optionA={post.optionA} optionB={post.optionB} countByOptionA={post.countCommentByOptionA} countByOptionB={post.countCommentByOptionB} />
        </div>
      </div>




      <div className={styles.section2}>
        {/* <TopComments topCommentA={post.getTopCommentA} topCommentB={post.getTopCommentB} /> */}

        <div className={styles.section2_header}>
          <p>A</p>
          <p>
            인기 댓글
          </p>
          <p>B</p>
        </div>

        <div className={styles.section2_body}>

          {post.getTopCommentA == null ? <div className={styles.no}><VscError size={20} /></div> :
            <div className={styles.section}>

              <div className={styles.section_header}>
                <UserInfo
                  userImage={post.avatar}
                  userId={post.username}
                  mbti={post.mbtiType}
                  opinion={post.postId}
                />


              </div>

              <div className={styles.section_body}>
                {post.comment}
              </div>

              <div className={styles.section_footer}>

              </div>

            </div>

          }

          {post.getTopCommentB == null ? <div className={styles.no}><VscError size={20} /></div> :
            <div >

              <div >
                <UserInfo
                  userImage={post.avatar}
                  userId={post.username}
                  mbti={post.mbtiType}
                  opinion={post.postId}
                />

              </div>

              <div >
                {post.comment}
              </div>

              <div>

              </div>

            </div>
          }
        </div>
      </div>

      <div className={styles.section3}>
        <Comments id={postId} />

        {post.countComment == 0 ? <div><FaRegSadTear /></div> : <div></div>}
      </div>

    </div>
  );
};

export default Post;
