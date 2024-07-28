import { Image } from "expo-image"
import { Dimensions, TouchableWithoutFeedback } from "react-native"
import { IMovie } from "../types/tmdb"
import { PosterImage500 } from "../services/TMDB"
import { memo } from "react"

const { width, height } = Dimensions.get("window")

type MovieCardProps = {
	movie: IMovie
	onPress: () => void
}
const MovieCard = ({ movie, onPress }: MovieCardProps) => {
	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<Image
				source={{
					uri: PosterImage500(movie.poster_path),
				}}
				style={{
					width: width * 0.6,
					height: height * 0.45,
				}}
				contentFit="cover"
				className="rounded-3xl"
			/>
		</TouchableWithoutFeedback>
	)
}

export default memo(MovieCard)
