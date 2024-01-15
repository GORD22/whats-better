import calendarReducer from "./Calendar/calendarSlice";
import { thunk } from "redux-thunk";

import { combineReducers, configureStore } from "@reduxjs/toolkit";

const reducer = combineReducers({
  calendar: calendarReducer,
});

export const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk }),
});
