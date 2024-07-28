import { useQueries } from "@tanstack/react-query"
import { useGlobalSearchParams, useRouter } from "expo-router"
import { StatusBar } from "expo-status-bar"
import React from "react"
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import Ionicons from "@expo/vector-icons/Ionicons"
import { SafeAreaView } from "react-native-safe-area-context"
import Loading from "../components/Loading"
import MovieList from "../components/MovieList"
import Colors from "../constants/Color"
import { getPersonCredits, getPersonDetails, PersonImage185 } from "../services/TMDB"

export default function Person() {
	const router = useRouter()

	const { person } = useGlobalSearchParams()
	const personId = Array.isArray(person)
		? parseInt(person[0], 10)
		: typeof person === "string"
		? parseInt(person, 10)
		: undefined

	const genderFromNumber = (n: number): string => {
		return n === 0 ? "Not specified" : n === 1 ? "Female" : n === 2 ? "Male" : "Not specified"
	}

	const queries = useQueries({
		queries: [
			{
				queryKey: ["personDetails", personId],
				queryFn: () => getPersonDetails(personId as number),
				enabled: !!personId,
			},
			{
				queryKey: ["personCredits", personId],
				queryFn: () => getPersonCredits(personId as number),
				enabled: !!personId,
			},
		],
	})

	const [personQuery, creditsQuery] = queries
	const personData = personQuery?.data

	const creditsData = creditsQuery?.data?.cast || []

	return (
		<ScrollView className="flex-1 bg-neutral-900" contentContainerStyle={{ paddingBottom: 20 }}>
			{personQuery.isLoading ? (
				<Loading />
			) : (
				<>
					<StatusBar style="light" />

					<SafeAreaView className="z-20 top-0 left-0 w-full">
						<View className="flex-row justify-between items-center p-4">
							<TouchableOpacity
								onPress={() => router.back()}
								className="rounded-xl p-1"
								style={{ backgroundColor: Colors.background }}
							>
								<Ionicons name="chevron-back" size={28} color="#fff" />
							</TouchableOpacity>
						</View>
					</SafeAreaView>

					<View>
						<View
							className="flex-row justify-center"
							style={{
								shadowColor: "#fff",
								shadowOffset: {
									width: 0,
									height: 8,
								},
								shadowOpacity: 1,
								shadowRadius: 11.14,

								elevation: 17,
							}}
						>
							<View className="items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-500">
								<Image
									source={{
										uri: PersonImage185(personData?.profile_path || ""),
									}}
									style={{
										height: "100%",
										width: "100%",
									}}
									resizeMode="cover"
								/>
							</View>
						</View>

						<View className="mt-6">
							<Text className="text-3xl text-white font-bold text-center">{personData?.name}</Text>
							<Text className="text-base text-neutral-500 text-center">{personData?.place_of_birth}</Text>
						</View>

						<View className="mx-3 p-4 mt-6 flex-row justify-center items-center bg-neutral-700 rounded-full">
							<View className="border-r-2 border-r-neutral-400 px-2 items-center">
								<Text className="text-white font-semibold">Gender</Text>
								<Text className="text-sm text-neutral-300">
									{genderFromNumber(personData?.gender || 0)}
								</Text>
							</View>
							<View className="border-r-2 border-r-neutral-400 px-2 items-center">
								<Text className="text-white font-semibold">Birthday</Text>
								<Text className="text-sm text-neutral-300">{personData?.birthday}</Text>
							</View>
							<View className="border-r-2 border-r-neutral-400 px-2 items-center">
								<Text className="text-white font-semibold">Known For</Text>
								<Text className="text-sm text-neutral-300">{personData?.known_for_department}</Text>
							</View>
							<View className="px-2 items-center">
								<Text className="text-white font-semibold">Popularity</Text>
								<Text className="text-sm text-neutral-300">
									{personData?.popularity.toLocaleString()}
								</Text>
							</View>
						</View>

						<View className="my-6 mx-4 space-y-2">
							<Text className="text-white text-lg">Biography</Text>
							<Text className="text-neutral-400 tracking-wide">
								{personData?.biography || "No biography available"}
							</Text>
						</View>

						<MovieList title="Movies" hideSeeAll isLoading={creditsQuery.isLoading} movies={creditsData} />
					</View>
				</>
			)}
		</ScrollView>
	)
}
