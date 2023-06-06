import { ResultsResponse } from "@/utils/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const bookmarksSlice = createSlice({
  name: "bookmarks",
  initialState: [] as ResultsResponse[],
  reducers: {
    addBookmark: (state, action) => {
      const result = action.payload;
      if (typeof result !== "undefined") state.push(result);
    },
    removeBookmark: (state, action) => {
      const { id } = action.payload;

      const index = state.findIndex(
        (result: ResultsResponse) => result.id === id
      );
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    replaceBookmarks: (state, action) => {
      state.length = 0;
      state.push(...action.payload);
    },
    clearBookmarks: (state) => {
      state.splice(0, state.length);
    },
  },
});

export const { addBookmark, removeBookmark, clearBookmarks, replaceBookmarks } =
  bookmarksSlice.actions;

export default bookmarksSlice.reducer;
