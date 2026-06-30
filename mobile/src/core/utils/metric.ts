import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');


const guidelineBaseWidth = 390;
const guidelineBaseHeight = 843;

// Clamp helper
const clamp = (value: number, min?: number, max?: number) => {
  if (max !== undefined && value > max) return max;
  if (min !== undefined && value < min) return min;
  return value;
};

// Horizontal scaling
export const horizontalScale = (
  size: number,
  options?: { min?: number; max?: number }
) => {
  const scaled = (width / guidelineBaseWidth) * size;
  return clamp(scaled, options?.min, options?.max);
};

// Vertical scaling
export const verticalScale = (
  size: number,
  options?: { min?: number; max?: number }
) => {
  const scaled = (height / guidelineBaseHeight) * size;
  return clamp(scaled, options?.min, options?.max);
};

/**
 * Moderate scaling (for balanced responsiveness)
 **/
export const moderateScale = (
  size: number,
  factor = 0.5,
  options?: { min?: number; max?: number }
) => {
  const scaled = size + (horizontalScale(size) - size) * factor;
  return clamp(scaled, options?.min, options?.max);
};
