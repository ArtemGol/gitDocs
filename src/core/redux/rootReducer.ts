import { getDefaultMiddleware } from "@reduxjs/toolkit";
import logger from "redux-logger";

export const rootReducer = {
};

export const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: false,
  }),
  logger
];
