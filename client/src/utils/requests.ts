const API_KEY = process.env.API_KEY;
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type Requests = {
  [key: string]: {
    title: string;
    url: string;
  };
};

export const requests: Requests = {
  fetchTrending: {
    title: "Trending",
    url: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  },
  fetchTrendingToday: {
    title: "Trending",
    url: `/trending/all/day?api_key=${API_KEY}&language=en-US`,
  },
  tv: {
    title: "PopularTv",
    url: `/tv/popular?api_key=${API_KEY}&language=en-US&page=1`,
  },
  movies: {
    title: "PopularMovie",
    url: `/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
  },
  fetchTv: {
    title: "Tv Series",
    url: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  },
  fetchMovies: {
    title: "Movies",
    url: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  },
};

export const getQueryString = (query: string | string[]) => {
  if (Array.isArray(query)) {
    return query[0];
  }
  return query;
};

export const searchQuery = (query: string) => {
  if (query) {
    return `${API_BASE_URL}/api/search?query=${query}`;
  }

  return query;
};

export const getVideo = (id: string | number, type: string) => {
  if (type === "movie") {
    return `${API_BASE_URL}/api/videos?movieId=${id}`;
  }

  if (type === "tv") {
    return `${API_BASE_URL}/api/videos?tvId=${id}`;
  }
  return null;
};
