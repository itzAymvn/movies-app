import { Image } from "expo-image"
import { useRouter } from "expo-router"
import React from "react"
import {
	ActivityIndicator,
	Dimensions,
	ScrollView,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native"
import Ionicons from "@expo/vector-icons/Ionicons"
import Colors from "../constants/Color"
import { IMovie } from "../types/tmdb"
import { PosterImage185 } from "../services/TMDB"

const { width, height } = Dimensions.get("window")

type MovieListProps = {
	movies: IMovie[]
	isLoading?: boolean
	hideSeeAll?: boolean
	title?: string
}

export default function MovieList({ movies, isLoading = true, hideSeeAll, title }: MovieListProps) {
	const router = useRouter()
	return (
		<View className="mb-8 space-y-4">
			<View className="mx-4 flex-row justify-between items-center">
				<Text className="font-semibold text-xl" style={{ color: "white" }}>
					{title || "Upcoming"}
				</Text>
				{!hideSeeAll && !isLoading && (
					<TouchableOpacity
						onPress={() => {
							router.push(`/movies/${title?.toLowerCase().replace(" ", "")}`)
						}}
					>
						<Text
							style={{
								color: Colors.text,
							}}
							className="text-lg"
						>
							<Ionicons name="chevron-forward-circle" size={25} color={Colors.text} />
						</Text>
					</TouchableOpacity>
				)}
			</View>
			{isLoading ? (
				<ActivityIndicator size="large" color={Colors.background} />
			) : movies.length > 0 ? (
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{ paddingHorizontal: 15 }}
				>
					{movies.map((movie: IMovie, index: number) => {
						const movieName = movie.title || movie.original_title || "Unknown"
						return (
							<TouchableWithoutFeedback
								key={index}
								onPress={() => {
									router.push({
										pathname: "/movie",
										params: {
											movie: movie.id,
										},
									})
								}}
							>
								<View className="space-y-1 mr-4">
									<Image
										source={{
											uri: PosterImage185(movie.poster_path),
										}}
										className="rounded-md"
										style={{
											width: width * 0.3,
											height: height * 0.22,
										}}
									/>
									<View>
										<Text className="text-neutral-300">
											{movieName?.length > 14 ? `${movieName.slice(0, 14)}...` : movieName}
										</Text>
										<Text className="text-neutral-500">
											{new Date(movie.release_date).getFullYear() || "Unknown"}
										</Text>
									</View>
								</View>
							</TouchableWithoutFeedback>
						)
					})}
				</ScrollView>
			) : (
				<Text className="text-neutral-500 mx-4 text-sm">No movies found</Text>
			)}
		</View>
	)
}
