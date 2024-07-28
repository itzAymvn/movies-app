import { ActivityIndicator, Dimensions, View } from "react-native"
import Colors from "../constants/Color"
import { StatusBar } from "expo-status-bar"

const { width, height } = Dimensions.get("window")

export default function Loading() {
	return (
		<View style={{ width, height }} className="flex-1 justify-center items-center">
			<StatusBar style="light" />
			<ActivityIndicator color={Colors.background} size="large" />
		</View>
	)
}
