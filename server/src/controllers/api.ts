import axios from "axios";
import { RouteHandler } from "../types/shared";

interface Video {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
}

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

export const videos: RouteHandler = async (req, res) => {
  try {
    const { movieId, tvId } = req.query;

    const apiKey = process.env.API_KEY;

    const apiUrl = movieId
      ? `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`
      : `https://api.themoviedb.org/3/tv/${tvId}/videos?api_key=${apiKey}`;

    const response = await axios.get(apiUrl);

    const youtubeVideos = response.data.results.filter(
      (video: Video) =>
        video.site === "YouTube" &&
        (video.type === "Teaser" ||
          video.type === "Trailer" ||
          video.type === "teaser" ||
          video.type === "trailer")
    );
    if (youtubeVideos.length > 0) {
      res.json(youtubeVideos[0]);
    } else {
      res.json({
        iso_639_1: "en",
        iso_3166_1: "US",
        name: "The best upcoming movies",
        key: "MnLjYJyrNc0&ab",
        site: "YouTube",
        size: 1080,
        type: "Trailer",
        official: false,
        published_at: "2023-05-26T08:45:47.000Z",
        id: "fallbackxyz",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};
