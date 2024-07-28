import { useEffect, useRef, useState } from "react"

const useDebounce = (value: string, delay: number = 500) => {
	const [debouncedValue, setDebouncedValue] = useState("")
	const timerRef = useRef<NodeJS.Timeout | undefined>()

	useEffect(() => {
		timerRef.current = setTimeout(() => setDebouncedValue(value), delay)

		return () => {
			clearTimeout(timerRef.current)
		}
	}, [value, delay])

	return debouncedValue
}

export default useDebounce
