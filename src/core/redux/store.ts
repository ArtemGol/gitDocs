import {configureStore} from "@reduxjs/toolkit";
import {middleware, rootReducer} from "./rootReducer";

export const store = configureStore({
  reducer: rootReducer,
  middleware,
})
