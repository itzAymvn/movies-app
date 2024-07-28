# Movies App

This is a React Native application built with Expo, designed to display a list of movies, their details, and related information. The app uses the TMDB API to fetch movie data and provides features like searching for movies, viewing trending movies, and more.

## Table of Contents

-   Installation
-   [Running the App](#running-the-app)
-   [Project Structure](#project-structure)
-   [Environment Variables](#environment-variables)
-   Dependencies
-   Contributing
-   License

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/itzaymvn/movies-app.git
    cd movies-app
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

3. Apply patches (This is required for the `react-native-snap-carousel` package):
    ```sh
    npm run postinstall
    ```

## Running the App

To start the app in development mode, run:

```sh
npm run start
```

To run the app on an Android device/emulator:

```sh
npm run android
```

To run the app on an iOS device/simulator:

```sh
npm run ios
```

To run the app in a web browser:

```sh
npm run web
```

## Project Structure

```
.env
.gitignore
app/
	_layout.tsx
	index.tsx
	movie.tsx
	movies/
        popular.tsx
        toprated.tsx
        upcoming.tsx
	person.tsx
	search.tsx
app.json
assets/
	fonts/
	images/
babel.config.js
components/
	Cast.tsx
	Loading.tsx
	MovieCard.tsx
	MovieList.tsx
	Stars.tsx
	TrendingMovies.tsx
constants/
	Color.ts
eas.json
hooks/
	useDebounce.ts
index.js
package.json
patches/
	react-native-snap-carousel+3.9.1.patch
services/
	TMDB.ts
tailwind.config.js
tsconfig.json
types/
	index.d.ts
	tmdb.d.ts
```

## Environment Variables

Create a `.env` file in the root directory and add your TMDB API key:

```
TMDB_API_KEY=your_tmdb_api_key
```

## Dependencies

-   [Expo](https://expo.dev/)
-   [React Native](https://reactnative.dev/)
-   [TMDB API](https://www.themoviedb.org/documentation/api)
-   [Axios](https://axios-http.com/)
-   [React Query](https://react-query.tanstack.com/)

For a complete list of dependencies, see the [package.json](package.json) file.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
