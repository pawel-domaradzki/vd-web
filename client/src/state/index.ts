import { createSlice } from "@reduxjs/toolkit";
import { Maybe } from "@/utils/types";

const initialState: InitialState = {
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
    setBookmarks: (state, action) => {
      if (state.user) {
        state.user.bookmarks = action.payload.bookmarks;
      } else {
        console.error("user does not have any bookmarks");
      }
    },
  },
});

export const { setLogin, setLogout, setBookmarks } = authSlice.actions;
export default authSlice.reducer;

interface InitialState {
  user: Maybe<User>;
  token: Maybe<string>;
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  bookmarks?: Array<object>;
}
