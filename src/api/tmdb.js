// src/services/tmdb.js
import axios from "axios";

const API_KEY = process.env.VUE_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY, // API 키 추가
    language: "ko-KR", // 한국어 추가
  },
});

export const getPopularMovies = async () => {
  try {
    const response = await tmdbApi.get("/movie/popular");
    return response.data.results; // 인기 영화 리스트 반환
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    throw error;
  }
};

// 특정 영화 상세 정보 가져오기
export const getMovieDetails = async (movieId) => {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};
