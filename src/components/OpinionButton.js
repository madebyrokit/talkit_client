import styles from "./OpinionButton.module.css";

const OpinionButton = ({
    opinion,
    selectedOpinion,
    setSelectedOpinion,
    isLoggedIn,
  }) => (
    <button
      className={`${styles.opinionButton} ${selectedOpinion === opinion ? styles[`selected${opinion}`] : ""
        }`}
      onClick={() => setSelectedOpinion(opinion)}
      disabled={!isLoggedIn}
    >
      {opinion}
    </button>
  );

  export default OpinionButton;