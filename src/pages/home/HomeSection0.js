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
      .get("http://218.155.229.38:8080/post/barchart", { withCredentials: false })
      .then((result) => {
        setPost(result.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        alert("차트가 오류났어요😞 잠시 후 다시 시도해주세요.");
        setLoading(false);
      });
  }, []);

  const handler = (event) => {
    event.preventDefault();
    navigate('/lists');
  };

  if (loading) {
    return <div>Loading...</div>; // 로딩 중 화면
  }

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <h2>{post.title}</h2>
        <OpinionBarChart
          optionA={post.optionA}
          optionB={post.optionB}
          countByOptionA={post.countByOptionA}
          countByOptionB={post.countByOptionB}
        />
      </div>

      <div className={styles.body} onClick={handler}>
        <p>토론에 참여해보세요➜</p>
        <p>재미있는 토론이 기다리고 있어요</p>
      </div>
    </div>
  );
};

export default HomeSection0;
