import cn from "classnames";
import style from "./Row.module.scss";
import { place } from "constants";
import { Cell } from "atoms/Cell/Cell";
import { memo } from "react";
export { Cell } from "atoms/Cell/Cell";

export const Row = memo(({
  year,
  month,
  shortMonth,
  daysArr,
  setCurrentCells,
  currentCells,
  startElement,
  startSelection,
  stopSelection
}) => {

  const selectRow = () => {
    daysArr.map(
      (day) =>
        day &&
        setCurrentCells((old) =>
          !old.find((item) => item.id === day.value && item.column === day.column)
            ? [...old,  {
              id: day.value,
              column: day.column,
            },
          ]
            : [...old.filter((item) => item.id !== day.value)]
        )
    );
  };

  return (
    <ul className={cn("list-reset", style.row)}>
      <li className={style.column} onClick={selectRow}>
        <span className={style.cellTitle}>
          {month} {year}
        </span>
        <ul className={cn("list-reset", style.list)}>
          {place.map((item) => (
            <li key={item} className={style.item}>
              {item}
            </li>
          ))}
        </ul>
      </li>
      {daysArr.map((day, i) => (
        <Cell
          index={i}
          key={day ? day.value : i}
          id={day ? day.value : i}
          day={day}
          month={shortMonth}
          setCurrentCells={setCurrentCells}
          currentCells={currentCells}
          startSelection={startSelection}
          stopSelection={stopSelection}
        />
      ))}
    </ul>
  );
});
