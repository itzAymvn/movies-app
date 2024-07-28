import axios from "axios"
import {
	CastMember,
	IMovieCredits,
	ISimilarMovieResult,
	ITopRatedResult,
	ITrendingResult,
	IUpcomingResult,
	MovieDetail,
	PersonMovieCredits,
	SearchResult,
	IPopularResult,
} from "../types/tmdb"

const API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY

const TMDB = axios.create({
	baseURL: "https://api.themoviedb.org/3",
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${API_KEY}`,
	},
})

const EndPoints = {
	Trending: () => "/trending/movie/day",
	TopRated: (page: number = 1) => `/movie/top_rated?language=en-US&page=${page}`,
	Popular: (page: number = 1) => `/movie/popular?language=en-US&page=${page}`,
	Upcoming: (page: number = 1) => `/movie/upcoming?language=en-US&page=${page}`,
	MovieDetails: (id: number) => `/movie/${id}`,
	MovieCredits: (id: number) => `/movie/${id}/credits`,
	SimilarMovies: (id: number) => `/movie/${id}/similar`,
	PersonDetails: (id: number) => `/person/${id}`,
	PersonCredits: (id: number) => `/person/${id}/movie_credits`,
	SearchMovie: (query: string, page: number) => `/search/movie?query=${query}&page=${page}`,
}

const fetchData = async <T>(endpoint: string): Promise<T> => {
	try {
		const response = await TMDB.get(endpoint)
		if (response.status !== 200) {
			throw new Error(`Failed to fetch ${endpoint}`)
		}
		return response.data as T
	} catch (error: any) {
		throw new Error(error.message || `Failed to fetch ${endpoint}`)
	}
}

export const getTrendingMovies = async (): Promise<ITrendingResult> => {
	return fetchData<ITrendingResult>(EndPoints.Trending())
}

export const getPopularMovies = async (page: number = 1): Promise<IPopularResult> => {
	return fetchData<IPopularResult>(EndPoints.Popular(page))
}

export const getUpcomingMovies = async (page: number = 1): Promise<IUpcomingResult> => {
	return fetchData<IUpcomingResult>(EndPoints.Upcoming(page))
}

export const getTopRatedMovies = async (page: number = 1): Promise<ITopRatedResult> => {
	return fetchData<ITopRatedResult>(EndPoints.TopRated(page))
}

export const getMovieDetails = async (id: number): Promise<MovieDetail> => {
	return fetchData<MovieDetail>(EndPoints.MovieDetails(id))
}

export const getMovieCredits = async (id: number): Promise<IMovieCredits> => {
	return fetchData<IMovieCredits>(EndPoints.MovieCredits(id))
}

export const getSimilarMovies = async (id: number): Promise<ISimilarMovieResult> => {
	return fetchData<ISimilarMovieResult>(EndPoints.SimilarMovies(id))
}

export const getPersonDetails = async (id: number): Promise<CastMember> => {
	return fetchData<CastMember>(EndPoints.PersonDetails(id))
}

export const getPersonCredits = async (id: number): Promise<PersonMovieCredits> => {
	return fetchData<PersonMovieCredits>(EndPoints.PersonCredits(id))
}

export const searchMovies = async (query: string, page: number = 1): Promise<SearchResult> => {
	return fetchData<SearchResult>(EndPoints.SearchMovie(query, page))
}

export const PosterImage500 = (path: string) => {
	return path
		? `http://image.tmdb.org/t/p/w500${path}`
		: "https://upload.wikimedia.org/wikipedia/commons/4/49/A_black_image.jpg"
}

export const PosterImage342 = (path: string) => {
	return path
		? `http://image.tmdb.org/t/p/w342${path}`
		: "https://upload.wikimedia.org/wikipedia/commons/4/49/A_black_image.jpg"
}

export const PosterImage185 = (path: string) => {
	return path
		? `http://image.tmdb.org/t/p/w185${path}`
		: "https://upload.wikimedia.org/wikipedia/commons/4/49/A_black_image.jpg"
}

export const PersonImage185 = (path: string) => {
	return path
		? `http://image.tmdb.org/t/p/w185${path}`
		: "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
}
