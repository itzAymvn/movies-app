import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Stack } from "expo-router"
import { NativeWindStyleSheet } from "nativewind"
import * as SystemUI from "expo-system-ui"

NativeWindStyleSheet.setOutput({
	default: "native",
})

SystemUI.setBackgroundColorAsync("#262626")

const RootLayout: React.FC = () => {
	const queryClient = new QueryClient()

	return (
		<QueryClientProvider client={queryClient}>
			<Stack screenOptions={{ headerShown: false, animation: "ios" }} />
		</QueryClientProvider>
	)
}

export default RootLayout
