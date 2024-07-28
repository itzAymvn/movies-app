import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Pressable } from "react-native"
import React, { memo } from "react"
import { StatusBar } from "expo-status-bar"
import { SafeAreaView } from "react-native-safe-area-context"
import { getTopRatedMovies, PosterImage500 } from "../../services/TMDB"
import { useInfiniteQuery } from "@tanstack/react-query"
import { Image } from "expo-image"
import { IMovie } from "../../types/tmdb"
import Ionicons from "@expo/vector-icons/Ionicons"
import { useRouter } from "expo-router"
import Colors from "../../constants/Color"
import { ExpoRouter } from "expo-router/types/expo-router"

export default function Toprated() {
	const router = useRouter()
	const { data, fetchNextPage, isError, isFetchingNextPage, isFetchNextPageError, isLoading } = useInfiniteQuery({
		queryKey: ["topRatedMoviesPages"],
		queryFn: ({ pageParam = 1 }: { pageParam?: number }) => getTopRatedMovies(pageParam),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => {
			if (lastPage.page < lastPage.total_pages) {
				return lastPage.page + 1
			} else {
				return undefined
			}
		},
	})

	const movies = data?.pages.flatMap((page) => page.results) ?? []

	return (
		<View className={"flex-1 bg-neutral-800 pt-3"}>
			<StatusBar style="light" />
			<SafeAreaView className="mb-3 px-4 py-2 flex-row items-center space-x-4">
				<TouchableOpacity onPress={() => router.back()}>
					<Ionicons name="chevron-back" size={30} color={Colors.background} />
				</TouchableOpacity>
				<View>
					<Text className="text-white text-3xl font-bold">Top Rated</Text>
					<Text className="text-white text-base font-semibold">{movies.length} Movies</Text>
				</View>
			</SafeAreaView>
			{isLoading ? (
				<ActivityIndicator size="large" color={Colors.background} />
			) : isError ? (
				<Text>Error</Text>
			) : (
				<FlatList
					data={movies}
					keyExtractor={(item, index) => `${item.id}-${index}`}
					renderItem={({ item }) => <MemoizedMovieItem item={item} router={router} />}
					initialNumToRender={10}
					onEndReached={() => fetchNextPage()}
					onEndReachedThreshold={0.5}
					ListFooterComponent={() => {
						if (isFetchingNextPage) {
							return <ActivityIndicator size="small" color={Colors.background} />
						}
						if (isFetchNextPageError) {
							return <Text className="text-white">Error fetching next page...</Text>
						}
						return null
					}}
				/>
			)}
		</View>
	)
}

function renderMovie({ item, router }: { item: IMovie; router: ExpoRouter.Router }) {
	return (
		<Pressable
			className="p-4 flex-row items-start"
			onPress={() => {
				router.push({
					pathname: `/movie`,
					params: { movie: item.id },
				})
			}}
		>
			<View className="mr-4">
				<Image
					source={{
						uri: PosterImage500(item.poster_path),
					}}
					style={{ width: 100, height: 150 }}
				/>
			</View>
			<View className="flex-1">
				<Text className="text-white text-xl font-bold">{item.title}</Text>
				<Text className="text-neutral-400">{item.overview.slice(0, 200)}...</Text>
			</View>
		</Pressable>
	)
}

const MemoizedMovieItem = memo(renderMovie)
