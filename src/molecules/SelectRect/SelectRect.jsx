import { forwardRef } from "react";
import style from "./SelectRect.module.scss";

export const SelectRect = forwardRef((props, ref) => {
  return <div className={style.rect} ref={ref} />;
});
