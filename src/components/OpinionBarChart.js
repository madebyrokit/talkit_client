import React from "react";
import styles from "./OpinionBarChart.module.css";

const OpinionBarChart = ({ optionA, optionB, countByOptionA, countByOptionB }) => {
  const totalVotes = countByOptionA + countByOptionB;
  const percentageA = totalVotes === 0 ? 50 : (countByOptionA / totalVotes) * 100;
  const percentageB = totalVotes === 0 ? 50 : (countByOptionB / totalVotes) * 100;

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <span>A.&nbsp;{optionA}</span>
        <span>B.&nbsp;{optionB}</span>
      </div>
      <div className={styles.barContainer}>
        <div
          className={styles.bar}
          style={{
            width: `${percentageA}%`,
            backgroundColor: "rgb(168, 197, 255)",
          }}
        >
          <span className={styles.barText}>{Math.round(percentageA) == 0 ? null : <span> {Math.round(percentageA)}%</span>}</span>
        </div>
        <div
          className={styles.bar}
          style={{
            width: `${percentageB}%`,
            backgroundColor: "rgb(255, 169, 169)",
          }}
        >
          <span className={styles.barText}>{Math.round(percentageB) == 0 ? null : <span> {Math.round(percentageB)}%</span>}</span>
        </div>
      </div>
      <div className={styles.footer}>
        <span>{countByOptionA}표</span>
        <span>{countByOptionB}표</span>
      </div>
    </div>
  );
};

export default OpinionBarChart;
