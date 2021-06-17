import {createAsyncThunk} from "@reduxjs/toolkit";
import {issues} from "../../api/requests/users";

export const getIssuesThunkCreator = createAsyncThunk(
  "users/getIssues",
  () => {
    return issues.getIssues();
  }
);
