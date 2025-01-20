import React from "react";
import styles from "./TopComments.module.css";
import UserInfo from "../../components/UserInfo";
import { format, render, cancel, register } from 'timeago.js';
import koLocale from 'timeago.js/lib/lang/ko';
register('ko', koLocale);

const TopComments = ({ topCommentA, topCommentB }) => {
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        
      </div>

      <div className={styles.body}>
        {topCommentA == null ? <div className={styles.no}>아직 인기 댓글 A가 없습니다😞</div> :
          <div className={styles.section}>

            <div className={styles.section_header}>
              <UserInfo
                userImage={topCommentA.profileImage}
                userId={topCommentA.username}
                mbti={topCommentA.mbtiType}
                opinion={topCommentA.postId}
              />


            </div>

            <div className={styles.section_body}>
              {topCommentA.comment}
            </div>

            <div className={styles.section_footer}>

            </div>

          </div>

        }

        {topCommentB == null ? <div className={styles.no}>아직 인기 댓글 B가 없습니다😞</div> :
          <div className={styles.section1}>

            <div className={styles.section_header}>
              <UserInfo
                userImage={topCommentB.profileImage}
                userId={topCommentB.username}
                mbti={topCommentB.mbtiType}
                opinion={topCommentB.postId}
              />

            </div>

            <div className={styles.section_body}>
              {topCommentB.comment}
            </div>

            <div className={styles.section_footer}>

            </div>

          </div>
        }
      </div>


    </div>
  );
};

export default TopComments;
