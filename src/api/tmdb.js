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
    const [movieResponse, creditsResponse, videoResponse, similarResponse] =
      await Promise.all([
        tmdbApi.get(`/movie/${movieId}`),
        tmdbApi.get(`/movie/${movieId}/credits`),
        tmdbApi.get(`/movie/${movieId}/videos`),
        tmdbApi.get(`/movie/${movieId}/similar`),
      ]);

    // 출연진 정보 매핑
    const cast = creditsResponse.data.cast.map((member) => ({
      id: member.id,
      name: member.name,
      character: member.character,
      profilePath: member.profile_path,
    }));

    // 주요 크루 필터링 (감독, 작가, 촬영 감독, 작곡가)
    const importantJobs = [
      "Director", // 감독
      "Screenplay",
      "Writer", // 작가
      "Director of Photography", // 촬영 감독
      "Original Music Composer",
      "Composer", // 작곡가
    ];

    const crew = creditsResponse.data.crew
      .filter((person) => importantJobs.includes(person.job))
      .filter((person) => person.profile_path)
      .map((person) => ({
        id: person.id,
        name: person.name,
        job: person.job,
        profilePath: person.profile_path,
      }));

    // 트레일러 찾기
    const trailer = videoResponse.data.results.find(
      (video) => video.site === "YouTube" && video.type === "Trailer"
    );

    // 비슷한 영화 목록 추출
    const similarMovies = similarResponse.data.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      posterPath: movie.poster_path,
      release_date: movie.release_date,
    }));

    // rating
    const rating = movieResponse.data.vote_average;

    return {
      ...movieResponse.data,
      cast,
      crew,
      videoKey: trailer ? trailer.key : null,
      similarMovies,
      rating,
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
