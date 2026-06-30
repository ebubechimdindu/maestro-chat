export const Spacing = {
  undefined: undefined,
  none: 0,
  xs: 2,
  xsm: 4, // extra-small minor
  sm: 8,
  md: 12,
  base: 16, // default base spacing
  lg: 20,
  xl: 24,
  "2xl": 32,
  "3xl": 40,
  "4xl": 48,
  "5xl": 56,
  "6xl": 64,
  "7xl": 72,
  "8xl": 80,
  "9xl": 96,
  "10xl": 112,
};

export type SpacingTypes = keyof typeof Spacing;