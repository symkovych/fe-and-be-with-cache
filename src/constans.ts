export const CacheHitHeaderKey = "Cache-Hit-Count";

export const pageQueryKey = "page";
export const searchQueryKey = "query";

export const API_READ_ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MDJlMDU0YTRkMjQxODMyMjJiMzcyZDVkYjlmYTFjMSIsInN1YiI6IjY0ZjcwOGMwNWYyYjhkMDBjNDM0OGQ1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2jxQkCRoG-gq6I8eBuGrGWgqN8Nsuw7nFX4RXDowgz4";

export const headerOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
  },
};

export const baseURL =
  "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US";

export const dummyVideosData = [
  {
    adult: false,
    backdrop_path: "/k7GM13qRYSour3lk90Dq1EwdpoW.jpg",
    genre_ids: [18, 53, 9648],
    id: 2649,
    original_language: "en",
    original_title: "The Game",
    overview: "In honor of his birthday, ...",
    popularity: 23.141,
    poster_path: "/4UOa079915QjiTA2u5hT2yKVgUu.jpg",
    release_date: "1997-09-12",
    title: "The Game",
    video: false,
    vote_average: 7.557,
    vote_count: 5940,
  },
  {
    adult: false,
    backdrop_path: "/k7GM13qRYSour3lk90Dq1EwdpoW.jpg",
    genre_ids: [18, 53, 9648],
    id: 2650,
    original_language: "en",
    original_title: "The Game 2",
    overview: "In honor of his birthday 2, ...",
    popularity: 23.141,
    poster_path: "/4UOa079915QjiTA2u5hT2yKVgUu.jpg",
    release_date: "1997-09-12",
    title: "The Game 2",
    video: false,
    vote_average: 7.557,
    vote_count: 5940,
  },
];

export const TestIDs = {
  CARDS: "cards",
};
