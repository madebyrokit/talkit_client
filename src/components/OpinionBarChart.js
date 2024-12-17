import React from "react";
import { calculatePercentage } from "../utils/calculatePercent";
import styles from "./OpinionBarChart.module.css";

const OpinionBarChart = ({ optionA, optionB, countByOptionA, countByOptionB }) => {
  // const { percentageA, percentageB } = calculatePercentage(optionA, optionB);

  return (
    <div className={styles.chartWrapper}>
      <div className={styles.choicesContainer}>
      </div>
      <div className={styles.body}><span>A.&nbsp;{optionA};</span>
        <span>B.&nbsp;{optionB}</span></div>
      <div className={styles.barContainer}>
        
        
        <div className={styles.barA} style={{ width: `${countByOptionA}%` }}>
          <span className={styles.percentageText}>{countByOptionA}</span>
        </div>
        <div className={styles.barB} style={{ width: `${countByOptionB}%` }}>
          <span className={styles.percentageText}>{countByOptionB}</span>
        </div>
      </div>
    </div>
  );
};

export default OpinionBarChart;
