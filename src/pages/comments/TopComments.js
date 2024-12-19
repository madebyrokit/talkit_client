import React from "react";
import styles from "./TopComments.module.css";
import UserInfo from "../../components/UserInfo";
import { format, render, cancel, register } from 'timeago.js';
import koLocale from 'timeago.js/lib/lang/ko';
register('ko', koLocale);

const TopComments = ({ topCommentA, topCommentB }) => {
  return (
    <div className={styles.main}>
      {topCommentA == null ? <div className={styles.header}>아직 인기 댓글 A가 없습니다😞</div> :
        <div className={styles.section}>

          <div className={styles.header}>
            <UserInfo
              userImage={topCommentA.profileImage}
              userId={topCommentA.username}
              mbti={topCommentA.mbtiType}
              opinion={topCommentA.postId}
            />
            <p>{format(`${topCommentA.createAtComment}`, 'ko')}</p>

          </div>

          <div className={styles.body}>
            {topCommentA.comment}
          </div>

          <div className={styles.footer}>

          </div>

        </div>

      }

    {topCommentB == null ? <div className={styles.header}>아직 인기 댓글 B가 없습니다😞</div> :
        <div className={styles.section1}>

          <div className={styles.header}>
            <UserInfo
              userImage={topCommentB.profileImage}
              userId={topCommentB.username}
              mbti={topCommentB.mbtiType}
              opinion={topCommentB.postId}
            />
            <p>{format(`${topCommentB.createAtComment}`, 'ko')}</p>
          </div>

          <div className={styles.body}>
            {topCommentB.comment}
          </div>

          <div className={styles.footer}>

          </div>

        </div>
      }

    </div>
  );
};

export default TopComments;
