import cn from "classnames";
import style from "./Cell.module.scss";
import moment from "moment";

export const Cell = ({
  id,
  day,
  month,
  currentCells,
  startSelection,
  index,
  stopSelection,
}) => {
  if (!day) {
    return <li className={cn(style.cell, style.emptyCell)} />;
  } else {
    return (
      <li
        className={cn(
          style.cell,
          (day.weekend === 6 || day.weekend === 0) && style.weekend,
          currentCells.find((item) => item.id === id) && style.activeCell
        )}
        style={{
          borderTop: currentCells.find(
            (item) => item.column === day.column && moment(item.id).add(1, 'month').month() === moment(day.value).month()
          )
            ? "none"
            : "",
          borderBottom: currentCells.find(
            (item) => item.column === day.column && moment(item.id).add(-1, 'month').month() === moment(day.value).month()
          )
            ? "none"
            : "",
          borderLeft: currentCells.find(
            (item) => item.column === day.column - 1 && moment(item.id).month() === moment(day.value).month()
          )
            ? "none"
            : "",
          borderRight: currentCells.find(
            (item) => item.column === day.column + 1 && moment(item.id).month() === moment(day.value).month()
          )
            ? "none"
            : "",
        }}
        onMouseDown={(e) => startSelection(day.value, day.column, e)}
        onMouseUp={() => stopSelection(day.value, day.column)}
      >
        <span className={style.cellTitle}>
          {day.label} {month}
        </span>
        <ul className={cn("list-reset", style.list)}>
          {Object.keys(day.price).map((key) => (
            <li key={key} className={style.item}>
              {day.price[key] !== "null" ? `${day.price[key]} ₽` : "-"}
            </li>
          ))}
        </ul>
      </li>
    );
  }
};
