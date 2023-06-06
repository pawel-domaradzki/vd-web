import { RootState } from "../../store";

export const selectUser = (state: RootState) => state.auth.user;
export const selectAuth = (state: RootState) => state.auth;
