import { TableHeader } from "molecules/TableHeader/TableHeader";
import { SelectRect } from "molecules/SelectRect/SelectRect";
import style from "./Table.module.scss";
import { Row } from "molecules/Row/Row";
import moment from "moment";
import { months, shortMonths } from "constants";
import { useEffect, useMemo, useState, useRef } from "react";
import { requestCalendarData } from "store/Calendar/calendarSlice";
import { useDispatch, useSelector } from "react-redux";
import { getCalendar } from "store/Calendar/callendarSelector";
import { Modal } from "molecules/Modal/Modal";

export const Table = () => {
  const dispatch = useDispatch();
  const calendar = useSelector(getCalendar);
  moment.updateLocale("ru", {
    week: { dow: 1 },
    months: Object.keys(months).map((item) => months[item]),
    monthsShort: Object.keys(shortMonths).map((item) => shortMonths[item]),
  });
  const time = moment().clone();

  const [currentCells, setCurrentCells] = useState([]);
  const [startElement, setStartElement] = useState();
  const [endElement, setEndElement] = useState();
  const [mouseDown, setMouseDown] = useState();
  const [startCoordinates, setStartCoordinates] = useState();
  const selectRectRef = useRef();
  const tableRef = useRef();
  const [posModal, setPosModal] = useState();

  const newCalendar = useMemo(() => {
    const newCalendar = {};
    for (var key in calendar) {
      const arr = new Array(42).fill(null);
      const startMonth = moment(`01-${key}`, ["DD-MM-YYYY"]).startOf("month");
      const lenghtMonth = moment(`01-${key}`, ["DD-MM-YYYY"]).daysInMonth();
      const date = calendar[key];
      const day = startMonth.clone();
      for (let i = 0; i < arr.length; i++) {
        if (i + 1 >= startMonth.clone().day()) {
          if (
            startMonth.clone().day() === 0 &&
            i - startMonth.clone().day() < lenghtMonth
          ) {
            arr[i + 6] = {
              weekend: day.clone().day(),
              value: day.clone().format("MM-DD-YY"),
              label: day.clone().format("D"),
              price: date[i].price,
              column: i + 6,
            };
          } else if (i + 1 - startMonth.clone().day() < lenghtMonth) {
            arr[i] = {
              weekend: day.clone().day(),
              value: day.clone().format("MM-DD-YY"),
              label: day.clone().format("D"),
              price: date[i + 1 - startMonth.clone().day()].price,
              column: i,
            };
          }
          day.add(1, "day");
        }
      }
      newCalendar[key] = arr;
    }
    return newCalendar;
  }, [calendar]);

  useEffect(() => {
    setPosModal({
      left:
        tableRef.current.offsetLeft + tableRef.current.offsetWidth - 12 - 176,
      top: tableRef.current.offsetTop + tableRef.current.offsetHeight - 12 - 64,
    });
    console.log(
      tableRef.current.offsetLeft + tableRef.current.offsetWidth - 12
    );
    console.log(
      tableRef.current.offsetTop + tableRef.current.offsetHeight - 12
    );
  }, [
    tableRef.current?.offsetLeft,
    tableRef.current?.offsetWidth,
    tableRef.current?.offsetTop,
    tableRef.current?.offsetHeight,
  ]);

  useEffect(() => {
    dispatch(
      requestCalendarData({
        startDate: time.clone().add(-6, "months").startOf("month"),
        endDate: time.clone().add(18, "months").endOf("month"),
        propertyID: "price",
      })
    );
  }, []);

  const startSelection = (id, column, e) => {
    setMouseDown(true);
    setStartElement({ id, column });
    setStartCoordinates({
      x: e.pageX,
      y: e.pageY,
    });
  };

  const updateSelection = (e) => {
    if (mouseDown) {
      const currentX = e.pageX;
      const currentY = e.pageY;
      let width = currentX - startCoordinates.x;
      let height = currentY - startCoordinates.y;
      selectRectRef.current.style.top = `${
        height > 0 ? startCoordinates.y : currentY
      }px`;
      selectRectRef.current.style.left = `${
        width > 0 ? startCoordinates.x : currentX
      }px`;
      selectRectRef.current.style.maxWidth = `${width > 0 ? width : -width}px`;
      selectRectRef.current.style.maxHeight = `${
        height > 0 ? height : -height
      }px`;
    }
  };

  const stopSelection = (id, column) => {
    setMouseDown(false);
    setEndElement({ id, column });
    const minColumn =
      startElement.column < column ? startElement.column : column;
    const maxColumn =
      startElement.column > column ? startElement.column : column;
    const minRow =
      new Date(startElement.id).getTime() < new Date(id).getTime()
        ? moment(startElement.id)
        : moment(id);
    const maxRow =
      new Date(startElement.id).getTime() > new Date(id).getTime()
        ? moment(startElement.id)
        : moment(id);
    const limit =
      (new Date(maxRow).getMonth() !== new Date(minRow).getMonth() &&
      new Date(new Date(maxRow) - new Date(minRow)).getMonth() === 0
        ? 1
        : new Date(new Date(maxRow) - new Date(minRow)).getMonth()) +
      minRow.clone().month();
    for (let i = minRow.clone().month(); i <= limit; i++) {
      for (let j = minColumn; j <= maxColumn; j++) {
        const key = minRow.format("MM-YYYY");
        setCurrentCells((old) =>
          newCalendar[key][j] &&
          !old.find(
            (item) =>
              item.id === newCalendar[key][j]?.value &&
              item.column === newCalendar[key][j]?.column
          )
            ? [
                ...old,
                {
                  id: newCalendar[key][j]?.value,
                  column: newCalendar[key][j]?.column,
                },
              ]
            : [...old.filter((item) => item.id !== newCalendar[key][j]?.value)]
        );
      }
      minRow.add(1, "month");
    }
  };

  const selectColumn = (column) => {
    Object.keys(newCalendar).map((key) =>
      setCurrentCells((old) =>
        newCalendar[key][column] &&
        !old.find(
          (item) =>
            item.id === newCalendar[key][column]?.value &&
            item.column === newCalendar[key][column]?.column
        )
          ? [
              ...old,
              {
                id: newCalendar[key][column]?.value,
                column: newCalendar[key][column]?.column,
              },
            ]
          : [...old.filter((item) => item.id !== newCalendar[key][column]?.value)]
      )
    );
  };

  const resetCurrentCells = () => {
    setCurrentCells([]);
  };

  return (
    <div className={style.table} ref={tableRef}>
      <TableHeader year={time.year()} selectColumn={selectColumn} />
      <div className={style.rowsWrapper} onMouseMove={updateSelection}>
        {mouseDown && <SelectRect ref={selectRectRef} />}
        {Object.keys(newCalendar).map((key) => (
          <Row
            key={key}
            year={moment(`01-${key}`).format("YY")}
            month={moment(`01-${key}`, ["DD-MM-YYYY"]).format("MMMM")}
            shortMonth={moment(`01-${key}`, ["DD-MM-YYYY"]).format("MMM")}
            daysArr={newCalendar[key]}
            setCurrentCells={setCurrentCells}
            currentCells={currentCells}
            startElement={startElement}
            startSelection={startSelection}
            stopSelection={stopSelection}
          />
        ))}
      </div>
      {currentCells.length !== 0 && !mouseDown && (
        <Modal resetCurrentCells={resetCurrentCells} posModal={posModal} />
      )}
    </div>
  );
};
