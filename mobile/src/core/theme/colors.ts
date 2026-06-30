export const Colors = {
  // Base
  white: "#FFFFFF",
  offWhite: "#FAF9F6",
  black: "#303330",           // primary text
  transparent: "transparent",

  // Brand
  brandPrimary: "#00B5E1",    // DayBloom cyan
  brandSecondary: "#3696C9",  // DayBloom blue
  brandAccent: "#448AFF",     // Action blue

  // Cyan / Blue scale
  cyan500: "#00B5E1",
  blue200: "#B3DAFD",
  blue500: "#3696C9",
  blue600: "#448AFF",

  // Green scale
  green400: "#70C771",
  green500: "#43A047",

  // Pink / Red scale
  pink500: "#FF95B7",
  red500: "#F44336",

  // Orange / Amber scale
  amber200: "#FFE5B8",
  amber500: "#FFB858",
  orange500: "#EA9E66",
  yellow500: "#FFC107",

  // Neutral scale
  neutral100: "#FAF9F6",      // background / off-white
  neutral200: "#E8E5D1",      // subtle borders
  neutral300: "#DEDFD9",
  neutral400: "#C7C7C7",      // dividers
  neutral500: "#B0B3AE",
  neutral600: "#8E8E93",

  neutral700: "#5D605C",      // muted text
  neutral800: "#3C3C43",      // dark text base
  neutral900: "#303330",      // primary text

  // Neutral with opacity
  neutral700Alpha60: "rgba(60, 60, 67, 0.60)",   // #3C3C4399 - secondary text
  neutral700Alpha30: "rgba(60, 60, 67, 0.30)",   // inactive / disabled
  blue500Alpha40: "rgba(54, 150, 201, 0.40)",
  blackAlpha40: "rgba(0, 0, 0, 0.4)",
  whiteAlpha40: "rgba(255, 255, 255, 0.4)",
  whiteAlpha60: "rgba(255, 255, 255, 0.6)",
} as const;

export type ColorTypes = keyof typeof Colors;