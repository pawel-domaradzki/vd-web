import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "@/state/store";
import { ResultsResponse } from "@/utils/types";

const initialState: AuthState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setLogin, setLogout } = authSlice.actions;

export default authSlice.reducer;

interface AuthState {
  user: User | null;
  token: string | null;
}

interface User {
  _id: string;
  displayName: string;
  email: string;
  bookmarks: ResultsResponse[];
}
