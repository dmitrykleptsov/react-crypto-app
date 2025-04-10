export function percentDiff(a: number, b: number) {
	return +(100 * Math.abs((a - b) / ((a + b) / 2))).toFixed(2)
}

export function capitalize(str: string) {
	return str.charAt(0).toUpperCase() + str.substring(1)
}
