import { createSlice } from "@reduxjs/toolkit";
import api from "api";

const initialState = {
  startDay: "",
  endDay: "",
  days: {},
};

const calendarSlice = createSlice({
  name: "calendarSlice",
  initialState,
  reducers: {
    setDays: (state, action) => {
      state.days[action.payload.key] = state.days.hasOwnProperty([
        action.payload.key,
      ])
        ? [...state.days[action.payload.key], { date: action.payload.date, price: action.payload.price }]
        : [{ date: action.payload.date, price: action.payload.price }];
    },
  },
});

export const { setDays } = calendarSlice.actions;

export const requestCalendarData = (params) => async (dispatch) => {
  params.entityID = "916912424844099585";
  params.ratePlanID = "919097289323511810";
  const currentData = params.startDate.clone();
  params.startDate = params.startDate.clone().format("YYYY-MM-DD");
  params.endDate = params.endDate.clone().add(1, 'day').format("YYYY-MM-DD");
  const data = await api.calendar.getData(params).then((data) => data);
  let k = 0;
  //debugger;
  while (k < data[0].daysCount) {
		const newData = {
      key: currentData.format("MM-YYYY"),
      date: currentData.format("MM-DD-YYYY"),
			price: {}
    };
		if (k === data[0].daysCount) {
			debugger
		}
		for (let i = 0; i <= data[data.length - 1].keyProperty.value - 1; i++) {
			newData.price[`${data[i].keyProperty.name}_${data[i].keyProperty.value}`] = data[i].values[k]
			if (k === data[0].daysCount) {
				debugger
			}
		}
    dispatch(setDays(newData));
    currentData.add(1, "day");
    k++;
  }
};

export default calendarSlice.reducer;
