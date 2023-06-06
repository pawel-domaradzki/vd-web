import axios from "axios";
import { API_BASE_URL } from "./requests";
import { ResultsResponse } from "./types";

export const updateBookmarks = async ({
  userId,
  token,
  bookmarks,
}: {
  userId: string;
  token: string;
  bookmarks: ResultsResponse[];
}) => {
  await axios.put(
    `${API_BASE_URL}/users/${userId}/bookmarks/update`,
    {
      bookmarks: bookmarks,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const addMissingBookmarks = async ({
  userId,
  token,
  bookmarks,
}: {
  userId: string;
  token: string;
  bookmarks: ResultsResponse[];
}) => {
  await axios.post(
    `${API_BASE_URL}/users/${userId}/bookmarks`,
    {
      bookmarks: bookmarks,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getBookmarks = (userId: string) => {
  return axios
    .get(`${API_BASE_URL}/users/${userId}/bookmarks`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching bookmarks from MongoDB:", error);
      throw error;
    });
};
