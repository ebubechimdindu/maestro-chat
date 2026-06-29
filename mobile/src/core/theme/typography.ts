import { TextStyle, StyleSheet, Platform } from "react-native";
import { moderateScale } from "../utils/metric";

export type TypographyType =
  | "displayLarge"
  | "displayMedium"
  | "displaySmall"
  | "headlineLarge"
  | "headlineMedium"
  | "headlineBase"
  | "headlineSmall"
  | "titleLarge"
  | "titleBase"
  | "titleMedium"
  | "titleSemiBold"
  | "titleSmall"
  | "bodyLarge"
  | "bodyMedium"
  | "bodySmall"
  | "labelLarge"
  | "labelMedium"
  | "labelSmall";

type Typography = {
  [key in TypographyType]: TextStyle;
};

export const typography: Typography = StyleSheet.create({
  displayLarge: {
    fontFamily: Platform.select({
      default: "Manrope_700Bold",
      ios: "Manrope-Bold",
    }),
    fontSize: moderateScale(48),
    lineHeight: moderateScale(56),
    letterSpacing: -0.25,
    fontWeight: "700",
  },

  displayMedium: {
    fontFamily: Platform.select({
      default: "Manrope_700Bold",
      ios: "Manrope-Bold",
    }),
    fontSize: moderateScale(45),
    lineHeight: moderateScale(52),
    fontWeight: "700",
  },

  displaySmall: {
    fontFamily: Platform.select({
      default: "Manrope_700Bold",
      ios: "Manrope-Bold",
    }),
    fontSize: moderateScale(32),
    lineHeight: moderateScale(44),
    fontWeight: "700",
  },

  headlineLarge: {
    fontFamily: Platform.select({
      default: "Manrope_700Bold",
      ios: "Manrope-Bold",
    }),
    fontSize: moderateScale(25),
    lineHeight: moderateScale(33),
    letterSpacing: -1.2,
    fontWeight: "700",
  },

  headlineMedium: {
    fontFamily: Platform.select({
      default: "Manrope_700Bold",
      ios: "Manrope-Bold",
    }),
    fontSize: moderateScale(20),
    lineHeight: moderateScale(28),
    fontWeight: "700",
  },

  headlineBase: {
    fontFamily: Platform.select({
      default: "SpaceMono_700Bold",
      ios: "SpaceMono-Bold",
    }),
    fontSize: moderateScale(24),
    lineHeight: moderateScale(32),
    fontWeight: "700",
  },

  headlineSmall: {
    fontFamily: Platform.select({
      default: "PlusJakartaSans_600SemiBold",
      ios: "PlusJakartaSans-SemiBold",
    }),
    fontSize: moderateScale(20),
    lineHeight: moderateScale(20),
    fontWeight: "600",
  },

  titleLarge: {
    fontFamily: Platform.select({
      default: "PlusJakartaSans_600SemiBold",
      ios: "PlusJakartaSans-SemiBold",
    }),
    fontSize: moderateScale(24),
    lineHeight: moderateScale(20),
    fontWeight: "600",
  },

  titleMedium: {
    fontFamily: Platform.select({
      default: "Manrope_700Bold",
      ios: "Manrope-Bold",
    }),
    fontSize: moderateScale(16),
    lineHeight: moderateScale(16),
    fontWeight: "700",
    letterSpacing: 0,
  },

  titleSemiBold: {
    fontFamily: Platform.select({
      default: "PlusJakartaSans_600SemiBold",
      ios: "PlusJakartaSans-SemiBold",
    }),
    fontSize: moderateScale(18),
    lineHeight: moderateScale(20),
    fontWeight: "600",
    letterSpacing: 0,
  },

  titleBase: {
    fontFamily: Platform.select({
      default: "SpaceMono_700Bold",
      ios: "SpaceMono-Bold",
    }),
    fontSize: moderateScale(16),
    lineHeight: moderateScale(18),
    fontWeight: "700",
  },


  titleSmall: {
    fontFamily: Platform.select({
      default: "PlusJakartaSans_500Medium",
      ios: "PlusJakartaSans-Medium",
    }),
    fontSize: moderateScale(14),
    lineHeight: moderateScale(18),
    fontWeight: "500",
    letterSpacing: 0,
  },

  bodyLarge: {
    fontFamily: Platform.select({
      default: "PlusJakartaSans_400Regular",
      ios: "PlusJakartaSans-Regular",
    }),
    fontSize: moderateScale(16),
    lineHeight: moderateScale(21),
    fontWeight: "400",
    letterSpacing: 0,
  },

  bodyMedium: {
    fontFamily: Platform.select({
      default: "PlusJakartaSans_400Regular",
      ios: "PlusJakartaSans-Regular",
    }),
    fontSize: moderateScale(15),
    lineHeight: moderateScale(21),
    fontWeight: "400",
    letterSpacing: 0,
  },

  bodySmall: {
    fontFamily: Platform.select({
      default: "PlusJakartaSans_300Light",
      ios: "PlusJakartaSans-Light",
    }),
    fontSize: moderateScale(12),
    lineHeight: moderateScale(16),
    fontWeight: "300",
    letterSpacing: 0.4,
  },

  labelLarge: {
    fontFamily: Platform.select({
      default: "PlusJakartaSans_600SemiBold",
      ios: "PlusJakartaSans-SemiBold",
    }),
    fontSize: moderateScale(14),
    lineHeight: moderateScale(16),
    fontWeight: "600",
    letterSpacing: 0,
  },

  labelMedium: {
    fontFamily: Platform.select({
      default: "PlusJakartaSans_500Medium",
      ios: "PlusJakartaSans-Medium",
    }),
    fontSize: moderateScale(10),
    lineHeight: moderateScale(20),
    fontWeight: "500",
    letterSpacing: 0,
  },

  labelSmall: {
    fontFamily: Platform.select({
      default: "PlusJakartaSans_400Regular",
      ios: "PlusJakartaSans-Regular",
    }),
    fontSize: moderateScale(10),
    lineHeight: moderateScale(16),
    fontWeight: "400",
    letterSpacing: 0.5,
  },
});