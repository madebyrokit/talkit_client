import styles from "./OpinionButton.module.css";

const OpinionButton = ({opinion, selectedOpinion, setSelectedOpinion, isLoggedIn }) => (
  <div className={styles.main}>
    <button
      className={`${styles.opinionButton} ${selectedOpinion === opinion ? styles[`selected${opinion}`] : ""
        }`}
      onClick={() => setSelectedOpinion(opinion)}
      disabled={!isLoggedIn}
    >
      {opinion}
    </button>
  </div>
);

export default OpinionButton;