import { useQueries } from "@tanstack/react-query"
import { useRouter } from "expo-router"
import { RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import MovieList from "../components/MovieList"
import TrendingMovies from "../components/TrendingMovies"
import Ionicons from "@expo/vector-icons/Ionicons"
import Colors from "../constants/Color"
import { getPopularMovies, getTopRatedMovies, getTrendingMovies, getUpcomingMovies } from "../services/TMDB"
import { StatusBar } from "expo-status-bar"
import Animated, { FadeInDown } from "react-native-reanimated"
import { LinearGradient } from "expo-linear-gradient"

export default function App() {
	const router = useRouter()

	const queries = useQueries({
		queries: [
			{
				queryKey: ["trendingMovies"],
				queryFn: getTrendingMovies,
			},
			{
				queryKey: ["popularMovies"],
				queryFn: () => getPopularMovies(1),
			},
			{
				queryKey: ["upcomingMovies"],
				queryFn: () => getUpcomingMovies(1),
			},
			{
				queryKey: ["topRatedMovies"],
				queryFn: () => getTopRatedMovies(1),
			},
		],
	})

	const [trendingQuery, popularQuery, upcomingQuery, topRatedQuery] = queries

	const handleRefresh = async () => {
		await Promise.all([
			trendingQuery.refetch(),
			popularQuery.refetch(),
			upcomingQuery.refetch(),
			topRatedQuery.refetch(),
		])
	}

	return (
		<>
			<StatusBar style="light" />
			<LinearGradient colors={["#262626", "#0f0e0e"]} style={{ flex: 1 }}>
				<SafeAreaView className="mb-3 bg-transparent">
					<Animated.View
						className="flex-row justify-between items-center mx-4"
						entering={FadeInDown.duration(500).springify()}
					>
						<Text className="text-white text-3xl font-bold">
							<Text style={{ color: Colors.text }}>M</Text>ovies
						</Text>
						<TouchableOpacity onPress={() => router.push("/search")}>
							<Ionicons name="search" size={30} color={"#fff"} />
						</TouchableOpacity>
					</Animated.View>
				</SafeAreaView>

				<ScrollView
					className="pb-10"
					showsVerticalScrollIndicator={false}
					refreshControl={
						<RefreshControl
							refreshing={
								trendingQuery.isFetching ||
								upcomingQuery.isFetching ||
								popularQuery.isFetching ||
								topRatedQuery.isFetching
							}
							onRefresh={handleRefresh}
							progressBackgroundColor={"#1e1e1e"}
							colors={[Colors.text]}
							tintColor={Colors.text}
						/>
					}
				>
					{trendingQuery.isError ? (
						<Text className="text-white text-center">Failed to fetch trending movies</Text>
					) : (
						<TrendingMovies
							title="Trending"
							isLoading={trendingQuery.isLoading}
							movies={trendingQuery.data?.results ?? []}
						/>
					)}

					{popularQuery.isError ? (
						<Text className="text-white text-center">Failed to fetch popular movies</Text>
					) : (
						<MovieList
							title="Popular"
							isLoading={popularQuery.isLoading}
							movies={popularQuery.data?.results ?? []}
						/>
					)}

					{topRatedQuery.isError ? (
						<Text className="text-white text-center">Failed to fetch top rated movies</Text>
					) : (
						<MovieList
							title="Top Rated"
							isLoading={topRatedQuery.isLoading}
							movies={topRatedQuery.data?.results ?? []}
						/>
					)}

					{upcomingQuery.isError ? (
						<Text className="text-white text-center">Failed to fetch upcoming movies</Text>
					) : (
						<MovieList
							title="Upcoming"
							isLoading={upcomingQuery.isLoading}
							movies={upcomingQuery.data?.results ?? []}
						/>
					)}
				</ScrollView>
			</LinearGradient>
		</>
	)
}
