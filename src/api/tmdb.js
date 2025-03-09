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
    return response.data.results;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    throw error;
  }
};

// 지금 상영중
export const getNowPlaying = async () => {
  try {
    const response = await tmdbApi.get("/movie/now_playing");
    return response.data.results;
  } catch (error) {
    console.error("Error fetching now playing movies:", error);
    throw error;
  }
};

// 최고 평점
export const getTopRated = async () => {
  try {
    const response = await tmdbApi.get("/movie/top_rated");
    return response.data.results;
  } catch (error) {
    console.error("Error fetching top rated movies:", error);
    throw error;
  }
};

// 개봉 예정작
export const getUpComing = async () => {
  try {
    const response = await tmdbApi.get("/movie/upcoming");
    return response.data.results;
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    throw error;
  }
};

// 오늘 트렌드
export const getDayTrending = async () => {
  try {
    const response = await tmdbApi.get("/trending/movie/day");
    return response.data.results;
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    throw error;
  }
};
// 이번 주 트렌드
export const getWeekTrending = async () => {
  try {
    const response = await tmdbApi.get("/trending/movie/week");
    return response.data.results;
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    throw error;
  }
};

// 특정 영화 상세 정보 가져오기
export const getMovieDetails = async (movieId) => {
  try {
    const movieResponse = await tmdbApi.get(`/movie/${movieId}`);
    const creditsResponse = await tmdbApi.get(`/movie/${movieId}/credits`);

    const cast = creditsResponse.data.cast.map((member) => ({
      id: member.id,
      name: member.name,
      character: member.character,
      profilePath: member.profile_path,
    }));

    const director = creditsResponse.data.crew.find(
      (person) => person.job === "Director"
    );

    let directorData = null;
    if (director) {
      const personResponse = await tmdbApi.get(`/person/${director.id}`);
      directorData = {
        id: director.id,
        name: director.name,
        profilePath: personResponse.data.profile_path,
      };
    }

    return {
      ...movieResponse.data,
      cast,
      director: directorData,
    };
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

// 장르
export const getMovieGenres = async () => {
  try {
    const response = await tmdbApi.get("/genre/movie/list");
    return response.data.genres.reduce((acc, genre) => {
      acc[genre.id] = genre.name;
      return acc;
    }, {});
  } catch (error) {
    console.error("Error fetching movie genres:", error);
    throw error;
  }
};
