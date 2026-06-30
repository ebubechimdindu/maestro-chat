import { ImageRequireSource } from "react-native";

export type ImageAssetsType =
  | "welcome-potrate"
  | "daybloom-bluetexture"
  | "onboarding-slide1"
  | "onboarding-slide2"
  | "onboarding-slide3"
  | "onboarding-slide4";

  export type ImageBackgroundAssetsType =
  | "brush-blue"
  | "brush-green"
  

export const ImageAssets: Record<
  ImageAssetsType,
  { uri: string } | ImageRequireSource
> = {
  "welcome-potrate": require("@/images/illustrations/welcome-potrate.png"),
  "daybloom-bluetexture": require("@/images/illustrations/daybloom-bluetexture.png"),
  "onboarding-slide2": require("@/images/illustrations/onbaording-slide2.png"),
  "onboarding-slide1": require("@/images/illustrations/onbaording-slide1.png"),
  "onboarding-slide3": require("@/images/illustrations/onbaording-slide3.png"),
  "onboarding-slide4": require("@/images/illustrations/onbaording-slide4.png"),
} as const;


export const ImageBackgroundAssets: Record<
  ImageBackgroundAssetsType,
  { uri: string } | ImageRequireSource
> = {
  "brush-blue": require("@/images/backgrounds/brush-blue.png"),
  "brush-green": require("@/images/backgrounds/brush-green.png"),
  
} as const;
