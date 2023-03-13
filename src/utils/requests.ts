const API_KEY = process.env.API_KEY;

export const requests = {
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

export const searchQuery = (key,query) => {
  return `https://api.themoviedb.org/3/search/multi?api_key=${key}&language=en-US&query=${query}&page=1&include_adult=false`;
};
