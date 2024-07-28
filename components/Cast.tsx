import { Image } from "expo-image"
import { useRouter } from "expo-router"
import React from "react"
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native"
import Colors from "../constants/Color"
import { PersonImage185 } from "../services/TMDB"
import { Cast as TCast } from "../types/tmdb"

type CastProps = {
	members: TCast[]
	isLoading: boolean
}
export default function Cast({ members, isLoading = true }: CastProps) {
	const router = useRouter()

	return (
		<View className="my-6">
			<Text className="text-white text-lg mx-4 mb-5">Top Cast</Text>
			{isLoading ? (
				<ActivityIndicator color={Colors.background} size="large" />
			) : members.length > 0 ? (
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{ paddingHorizontal: 15 }}
				>
					{members &&
						members.map((member: TCast, index: number) => (
							<TouchableOpacity
								key={index}
								className="mr-4 items-center"
								onPress={() => router.push({ pathname: "/person", params: { person: member.id } })}
							>
								<View className="overflow-hidden rounded-full h-20 w-20 items-center justify-center border border-neutral-500">
									<Image
										className="h-full w-full rounded-sm"
										source={{
											uri: PersonImage185(member?.profile_path || ""),
										}}
										contentPosition={"center"}
										contentFit="cover"
									/>
								</View>

								<Text className="text-white text-xs mt-1">
									{member.character.length > 10
										? member.character.slice(0, 10) + "..."
										: member.character}
								</Text>
								<Text className="text-neutral-400 text-xs mt-1">
									{member.name.length > 10 ? member.name.slice(0, 10) + "..." : member.name}
								</Text>
							</TouchableOpacity>
						))}
				</ScrollView>
			) : (
				<Text className="text-neutral-500 mx-4 text-sm">No cast found</Text>
			)}
		</View>
	)
}
