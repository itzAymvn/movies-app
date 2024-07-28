import { useInfiniteQuery } from "@tanstack/react-query"
import { Image } from "expo-image"
import { useRouter } from "expo-router"
import { ExpoRouter } from "expo-router/types/expo-router"
import { StatusBar } from "expo-status-bar"
import React, { useState, memo } from "react"
import {
	ActivityIndicator,
	Dimensions,
	FlatList,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native"
import Ionicons from "@expo/vector-icons/Ionicons"
import { SafeAreaView } from "react-native-safe-area-context"
import Loading from "../components/Loading"
import useDebounce from "../hooks/useDebounce"
import { PosterImage342, searchMovies } from "../services/TMDB"
import { SearchMovie } from "../types/tmdb"
import Colors from "../constants/Color"

const { width, height } = Dimensions.get("window")

export default function Search() {
	const router = useRouter()
	const [searchText, setSearchText] = useState("")

	const debouncedSearch = useDebounce(searchText, 800)

	const handleSearch = async (text: string) => {
		setSearchText(text)
	}

	const { data, fetchNextPage, isFetching, isFetchingNextPage, isLoading } = useInfiniteQuery({
		queryKey: ["searchMovies", debouncedSearch],
		queryFn: ({ pageParam = 1 }: { pageParam?: number }) => searchMovies(debouncedSearch, pageParam),
		enabled: !!debouncedSearch,
		initialPageParam: 1,
		getNextPageParam: (lastPage) => {
			if (lastPage.page < lastPage.total_pages) {
				return lastPage.page + 1
			} else {
				return undefined
			}
		},
	})

	const results = data?.pages.flatMap((page) => page.results) ?? []

	return (
		<SafeAreaView className="bg-neutral-800 flex-1 pt-3">
			<StatusBar style="light" />
			<View
				className="mx-4 mb-3 flex-row items-center"
				style={{
					borderWidth: 1,
					borderColor: "#737373",
					borderRadius: 50,
				}}
			>
				<TextInput
					onChangeText={handleSearch}
					placeholder="Search for movies"
					placeholderTextColor="lightgray"
					className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
				/>

				<TouchableOpacity
					onPress={() => {
						router.navigate("/")
					}}
					className="rounded-full p-3 m-1 bg-neutral-500"
				>
					<Ionicons name="close" size={25} color="#fff" />
				</TouchableOpacity>
			</View>

			{isLoading ? (
				<Loading />
			) : results.length > 0 ? (
				<>
					<Text className="text-white text-xl mx-4 mb-3">
						Search results ({results.length}/{data?.pages[0].total_results})
					</Text>
					<FlatList
						data={results}
						contentContainerStyle={{
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
						}}
						columnWrapperStyle={{
							justifyContent: "center",
							alignItems: "center",
							gap: 20,
						}}
						className="flex-1 space-x-4"
						keyExtractor={(item, index) => `${item.id}-${index}`}
						numColumns={2}
						renderItem={({ item, index }) => (
							<MemoizedMovieItem key={item.id} item={item} index={index} router={router} />
						)}
						onEndReached={() => {
							if (isFetchingNextPage) return
							fetchNextPage()
						}}
						onEndReachedThreshold={1}
						ListFooterComponent={
							isFetching ? <ActivityIndicator color={Colors.background} size={"large"} /> : null
						}
						ListFooterComponentStyle={{
							marginBottom: 20,
						}}
					/>
				</>
			) : (
				<View className="flex-col items-center justify-center">
					<Image source={require("../assets/images/no-movie.png")} className="h-72 w-72 bg-blend-screen" />
					<Text className="text-neutral-500 text-2xl font-semibold text-center">No movie found</Text>
				</View>
			)}
		</SafeAreaView>
	)
}

const MovieItem = ({ item, index, router }: { item: SearchMovie; index: number; router: ExpoRouter.Router }) => {
	return (
		<TouchableWithoutFeedback
			key={index}
			onPress={() =>
				router.push({
					pathname: "/movie",
					params: {
						movie: item.id,
					},
				})
			}
		>
			<View className="space-y-2 mb-4">
				<Image
					className="rounded-3xl"
					source={{
						uri: PosterImage342(item.poster_path || ""),
					}}
					style={{
						width: width * 0.44,
						height: height * 0.3,
					}}
				/>
				<Text className="text-neutral-300 ml-1">
					{item.title.length > 20 ? item.title.slice(0, 20) + "..." : item.title}
				</Text>
			</View>
		</TouchableWithoutFeedback>
	)
}

const MemoizedMovieItem = memo(MovieItem)
