export interface IBaseMovie {
	id: number
	title: string
	original_title: string
	overview: string
	poster_path: string
	backdrop_path: string
	adult: boolean
	original_language: string
	genre_ids: number[]
	popularity: number
	release_date: string
	video: boolean
	vote_average: number
	vote_count: number
}

export interface IMovie extends IBaseMovie {
	media_type?: string
}

export interface IDateRange {
	maximum: string
	minimum: string
}

export interface ITrendingResult {
	page: number
	results: IMovie[]
	total_pages: number
	total_results: number
}

export interface ITopRatedResult {
	page: number
	results: IBaseMovie[]
	total_pages: number
	total_results: number
}

export interface IUpcomingResult {
	dates: IDateRange
	page: number
	results: IMovie[]
	total_pages: number
	total_results: number
}

export interface IPopularResult {
	page: number
	results: IMovie[]
	total_pages: number
	total_results: number
}

export interface MovieDetail extends IBaseMovie {
	belongs_to_collection: Belongstocollection
	budget: number
	genres: Genre[]
	homepage: string
	imdb_id: string
	origin_country: string[]
	production_companies: Productioncompany[]
	production_countries: Productioncountry[]
	revenue: number
	runtime: number
	spoken_languages: Spokenlanguage[]
	status: string
	tagline: string
}

interface Spokenlanguage {
	english_name: string
	iso_639_1: string
	name: string
}

interface Productioncountry {
	iso_3166_1: string
	name: string
}

interface Productioncompany {
	id: number
	logo_path: string
	name: string
	origin_country: string
}

interface Genre {
	id: number
	name: string
}

interface Belongstocollection {
	id: number
	name: string
	poster_path: string
	backdrop_path: string
}

export interface IMovieCredits {
	id: number
	cast: Cast[]
	crew: Crew[]
}

interface Person {
	adult: boolean
	gender: number
	id: number
	known_for_department: string
	name: string
	original_name: string
	popularity: number
	profile_path: string | null
}

interface Crew extends Person {
	credit_id: string
	department: string
	job: string
}

interface Cast extends Person {
	cast_id: number
	character: string
	credit_id: string
	order: number
}

export interface ISimilarMovieResult {
	page: number
	results: IBaseMovie[]
	total_pages: number
	total_results: number
}

export type CastMember = Cast & { profile_path: string; place_of_birth: string; birthday: string; biography: string }

interface PersonMovieCredits {
	cast: PersonMovieCast[]
	crew: PersonMovieCrew[]
	id: number
}

interface PersonMovieCrew extends Crew {
	backdrop_path: null | string
	genre_ids: number[]
	original_language: string
	original_title: string
	overview: string
	poster_path: null | string
	release_date: string
	title: string
	video: boolean
	vote_average: number
	vote_count: number
}

interface PersonMovieCast extends IMovie {}

interface SearchResult {
	page: number
	results: SearchMovie[]
	total_pages: number
	total_results: number
}

interface SearchMovie {
	adult: boolean
	backdrop_path: null | string
	genre_ids: number[]
	id: number
	original_language: string
	original_title: string
	overview: string
	popularity: number
	poster_path: null | string
	release_date: string
	title: string
	video: boolean
	vote_average: number
	vote_count: number
}
