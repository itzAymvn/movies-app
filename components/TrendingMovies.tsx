import { useRouter } from "expo-router"
import { ActivityIndicator, Dimensions, Text, View } from "react-native"
import Carousel from "react-native-snap-carousel"
import Colors from "../constants/Color"
import { IMovie } from "../types/tmdb"
import MovieCard from "./MovieCard"

const { width } = Dimensions.get("window")

type TrendingMoviesProps = {
	title?: string
	isLoading: boolean
	movies: IMovie[]
}
export default function TrendingMovies({ isLoading = true, movies, title }: TrendingMoviesProps) {
	const router = useRouter()

	const handlePress = (movie: IMovie) => {
		router.push({
			pathname: "/movie",
			params: {
				movie: movie.id,
			},
		})
	}

	return (
		<View className="mb-8">
			<View className="mx-4 flex-row justify-between items-center mb-4">
				<Text className="font-semibold text-xl" style={{ color: "white" }}>
					{title || "Trending"}
				</Text>
			</View>

			{isLoading ? (
				<ActivityIndicator size="large" color={Colors.background} />
			) : (
				<Carousel
					data={movies}
					loop={true}
					autoplay={true}
					autoplayDelay={500}
					autoplayInterval={3000}
					renderItem={({ item }) => <MovieCard movie={item} onPress={() => handlePress(item)} />}
					firstItem={1}
					inactiveSlideOpacity={0.6}
					sliderWidth={width}
					itemWidth={width * 0.6}
					slideStyle={{ display: "flex", alignItems: "center" }}
				/>
			)}
		</View>
	)
}
