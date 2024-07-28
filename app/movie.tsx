import { useQueries } from "@tanstack/react-query"
import { Image } from "expo-image"
import { LinearGradient } from "expo-linear-gradient"
import { useGlobalSearchParams, useRouter } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { ActivityIndicator, Dimensions, ScrollView, Text, TouchableOpacity, View } from "react-native"
import Ionicons from "@expo/vector-icons/Ionicons"
import { SafeAreaView } from "react-native-safe-area-context"
import Cast from "../components/Cast"
import MovieList from "../components/MovieList"
import Colors from "../constants/Color"
import { getMovieCredits, getMovieDetails, getSimilarMovies, PosterImage500 } from "../services/TMDB"
import { MovieDetail } from "../types/tmdb"
import Stars from "../components/Stars"

export default function Movie() {
	const { movie } = useGlobalSearchParams()
	const { width, height } = Dimensions.get("window")
	const router = useRouter()

	const movieId = Array.isArray(movie)
		? parseInt(movie[0], 10)
		: typeof movie === "string"
		? parseInt(movie, 10)
		: undefined

	const queries = useQueries({
		queries: [
			{
				queryKey: ["movieDetails", movieId],
				queryFn: () => getMovieDetails(movieId as number),
				enabled: !!movieId,
			},
			{
				queryKey: ["movieCredits", movieId],
				queryFn: () => getMovieCredits(movieId as number),
				enabled: !!movieId,
			},
			{
				queryKey: ["similarMovies", movieId],
				queryFn: () => getSimilarMovies(movieId as number),
				enabled: !!movieId,
			},
		],
	})

	const [movieQuery, creditsQuery, similarMoviesQuery] = queries

	const movieData = movieQuery?.data as MovieDetail
	const cast = creditsQuery?.data?.cast || []
	const similarMovies = similarMoviesQuery?.data?.results || []
	const movieName = movieData?.title || "Movie Title Not Available"

	return (
		<ScrollView className="flex-1 bg-neutral-900">
			<StatusBar style="light" />
			<View className="w-full">
				{movieQuery.isLoading ? (
					<View className="mt-4">
						<ActivityIndicator size="large" color={Colors.background} />
					</View>
				) : (
					<>
						<SafeAreaView className="absolute z-20 top-0 left-0 w-full" style={{ height: height * 0.55 }}>
							<View className="flex-row justify-between items-center p-4">
								<TouchableOpacity
									onPress={() => router.back()}
									className="rounded-xl p-1"
									style={{ backgroundColor: Colors.background }}
								>
									<Ionicons name="chevron-back" size={28} color={"white"} />
								</TouchableOpacity>
							</View>
						</SafeAreaView>

						<View>
							<Image
								source={{ uri: PosterImage500(movieData?.poster_path) }}
								style={{ width, height: height * 0.55 }}
							/>
							<LinearGradient
								colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,1)"]}
								style={{ width, height: height * 0.4 }}
								start={{ x: 0.5, y: 0 }}
								end={{ x: 0.5, y: 1 }}
								className="absolute bottom-0"
							/>
						</View>
					</>
				)}
			</View>

			{!movieQuery.isLoading && (
				<View className="p-4">
					<Text className="text-white text-center text-2xl font-bold tracking-wider">{movieName}</Text>
					<Text className="text-neutral-400 text-center text-base font-semibold">
						Released • {movieData?.release_date?.split("-")[0] || "Unknown"} • {movieData?.runtime} min
					</Text>
					<View className="flex-row justify-center mx-4 space-x-2">
						{movieData?.genres.map((genre) => (
							<Text key={genre.id} className="text-neutral-400 font-semibold text-base text-center">
								{genre.name} {genre.id !== movieData?.genres[movieData?.genres.length - 1].id && "•"}
							</Text>
						))}
					</View>

					<Stars average={movieData?.vote_average || 0} />
					<Text className="text-neutral-400 tracking-wide">
						{movieData?.overview || "No overview available"}
					</Text>
				</View>
			)}

			<Cast members={cast} isLoading={creditsQuery.isLoading} />
			<MovieList title="Similar" hideSeeAll isLoading={similarMoviesQuery.isLoading} movies={similarMovies} />
		</ScrollView>
	)
}
