import axios from "axios";

export const request= axios.create({
    baseURL: "https://api.themoviedb.org/3/",
});

export const movie = "movie/";

export const find = "find/";

export const search = "/search/movie";

export const apiText = "?api_key=";

export const key = "df64be7dcd48637cc44959bad4c06788";

export const image = "https://image.tmdb.org/t/p/w500";

export const lupa = "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-28-search-blue-177462d06db81ff2a02aa022c1c0be5ba4200d7bd3f51091ed9298980e3a26a1.svg";

export const credits = "/credits"

export const videos = "/videos"

//Api request examples
//https://api.themoviedb.org/3/movie/550?api_key=df64be7dcd48637cc44959bad4c06788
// https://api.themoviedb.org/3/find/1?api_key=df64be7dcd48637cc44959bad4c06788&language=en-US&external_source=imdb_id
// https://api.themoviedb.org/3/movie/find/550?api_key=df64be7dcd48637cc44959bad4c06788