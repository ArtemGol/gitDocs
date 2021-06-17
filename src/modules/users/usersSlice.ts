import {createSlice} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";
import {getIssuesThunkCreator} from "./issuesThunk";


const initialState = {
  issues: []
};

export const issuesSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {},
  extraReducers: {
    [getIssuesThunkCreator.pending.type]: (state, { payload }) => {

    },
    [getIssuesThunkCreator.fulfilled.type]: (state, { payload }) => {
      state.issues = payload.data
    },
    [getIssuesThunkCreator.rejected.type]: (state, { payload }) => {
     alert('error')
    },
  }
});

// export const {} = issuesSlice.actions;

// export const usePlayerSelector = useSelector;
