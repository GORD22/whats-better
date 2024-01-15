import React from "react";
import style from "./Modal.module.scss";
import cn from "classnames";

export const Modal = ({resetCurrentCells, posModal}) => {
  return (
    <div className={style.modal} style={{top: `${posModal.top}px`, left: `${posModal.left}px`}}>
      <button className={cn("btn-reset", style.btn)} onClick={resetCurrentCells}>Снять выделение</button>
    </div>
  );
};
