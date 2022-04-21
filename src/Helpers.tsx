/**
 * Gets if a number is within a numeric range.
 * @param {number} input The number to check.
 * @param {number} min The minimum value of the range.
 * @param {number} max The maximum value of the range.
 * @returns {boolean} True if `input` is between `min` and `max` (inclusive), false if it is not.
 */
export const numberIsBetween = (
  input: number,
  min: number,
  max: number,
  inclusive: boolean = true
): boolean => {
    return !inclusive ? input > min && input < max : input >= min && input <= max;
};
