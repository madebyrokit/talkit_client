import styled from "./CustomButton.module.css";
import React from "react";

function CustomButton({ label, disable, onClick }) {
  return (
    <button onClick={onClick} disabled={disable} className={styled.button}>
      {label}
    </button>
  );
}

export default CustomButton;