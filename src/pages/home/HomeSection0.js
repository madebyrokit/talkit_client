import { useNavigate } from "react-router-dom";
import OpinionBarChart from "../../components/OpinionBarChart";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./HomeSection0.module.css";

const HomeSection0 = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://ec2-43-200-178-68.ap-northeast-2.compute.amazonaws.com:8080/post/barchart")
      .then((result) => {
        setPost(result.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setLoading(true);
      });
  }, []);

  const handler = (event) => {
    event.preventDefault();
    navigate('/lists');
  };

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <h2>{post.title}</h2>
      </div>

      <div className={styles.body}>
        {loading ? <div>Loading...</div> : <OpinionBarChart
          optionA={post.optionA}
          optionB={post.optionB}
          countByOptionA={post.countByOptionA}
          countByOptionB={post.countByOptionB}
        />}
      </div>

      <div className={styles.footer} onClick={handler}>
        <p>토론에 참여해보세요➜</p>
        <p>재미있는 토론이 기다리고 있어요</p>
      </div>
    </div>
  );
};

export default HomeSection0;
