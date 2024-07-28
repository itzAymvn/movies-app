import React from "react"
import { Text, View } from "react-native"
import Ionicons from "@expo/vector-icons/Ionicons"
import Colors from "../constants/Color"

const Stars = ({ average }: { average: number }) => {
	const fullStars = Math.floor(average / 2)
	const halfStars = average % 2 >= 1 ? 1 : 0
	const emptyStars = 5 - fullStars - halfStars

	return (
		<View className="flex-row justify-center space-x-1 my-2">
			{[...Array(fullStars)].map((_, index) => (
				<Ionicons key={`full-${index}`} name="star" size={20} color={Colors.text} />
			))}
			{[...Array(halfStars)].map((_, index) => (
				<Ionicons key={`half-${index}`} name="star-half" size={20} color={Colors.text} />
			))}
			{[...Array(emptyStars)].map((_, index) => (
				<Ionicons key={`empty-${index}`} name="star-outline" size={20} color={Colors.text} />
			))}
			<Text className="text-neutral-400 text-base font-semibold ml-2">{average}/10</Text>
		</View>
	)
}

export default Stars
