/**
 * Returns a random number between the given minimum and maximum values.
 *
 * @param {number} min - The minimum value (inclusive).
 * @param {number} max - The maximum value (exclusive).
 * @return {number} A random number between `min` and `max`.
 */
export function getRandomArbitrary(min: number, max: number): number {
	/**
	 * The formula to generate a random number between min and max.
	 * We use `Math.random()` to generate a random decimal between 0 and 1,
	 * then multiply it by the difference between max and min, add min,
	 * to get a value between min and max.
	 */
	return Math.random() * (max - min) + min;
}

/**
 * Linearly interpolates (interpolates) a value between two given numbers
 * based on a normalized factor.
 *
 * @param {number} a - The start value.
 * @param {number} b - The end value.
 * @param {number} n - The normalized factor between 0 and 1.
 * @return {number} The interpolated value.
 */
export function lerp(a: number, b: number, n: number): number {
	/**
	 * Linear interpolation formula: (1 - n) * a + n * b
	 *
	 * - (1 - n) * a: scales a by the opposite of n
	 * - n * b: scales b by n
	 * - The sum: interpolates between a and b
	 */
	return (1 - n) * a + n * b;
}

/**
 * Clamps a given value between a minimum and maximum value.
 *
 * @param {number} min - The minimum value (inclusive).
 * @param {number} value - The value to be clamped.
 * @param {number} max - The maximum value (inclusive).
 * @return {number} The clamped value.
 */
export function clamp(min: number, value: number, max: number): number {
	/**
	 * The returned value is the maximum of the minimum value and the minimum
	 * of the maximum value and the given value. This ensures that the
	 * clamped value is always between the minimum and maximum values.
	 */
	return Math.max(min, Math.min(max, value));
}
