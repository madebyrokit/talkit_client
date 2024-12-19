import React from "react";
import { calculatePercentage } from "../utils/calculatePercent";
import styles from "./OpinionBarChart.module.css";

const OpinionBarChart = ({ optionA, optionB, countByOptionA, countByOptionB }) => {
  return (
    <div className={styles.main}>

      <div className={styles.header}>
        <span>A.&nbsp;{optionA}</span>
        <span>B.&nbsp;{optionB}</span>
      </div>

      <div className={styles.body}>
        <div className={styles.barA} style={{ paddingLeft: `${countByOptionA}%` }}>
          {countByOptionA}
        </div>
      <div className={styles.barB} style={{ paddingRight: `${countByOptionB}%` }}>
          {countByOptionB}
        </div>
      </div>

    </div>
  );
};

export default OpinionBarChart;
