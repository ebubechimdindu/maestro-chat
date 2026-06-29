const Radius = {
  none: 0,
  xs: 2,
  sm: 4,
  md: 8,
  base: 10,
  lg: 12,
  xl: 16,
  "2xl": 20,
  "3xl": 30,
  "4xl": 40,
  "5xl": 50,
  full: 9999, // For fully rounded (e.g., avatars, pills, etc.)
};

export type RadiusTypes = keyof typeof Radius;
export default Radius;
