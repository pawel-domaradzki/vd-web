import axios from "axios";
import { RouteHandler } from "../types/shared";

export const search: RouteHandler = async (req, res) => {
  try {
    const { query } = req.query;
    const apiKey = process.env.API_KEY;

    const apiUrl = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-US&query=${query}&page=1&include_adult=false`;
    const response = await axios.get(apiUrl);

    res.json(response.data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};
