import {ImageBackground as ExpoImageBackground, ImageStyle, ImageBackgroundProps } from "expo-image";
import { ImageBackgroundAssets, ImageBackgroundAssetsType } from "@/core/components/atom/Image/ImageAssets";

type AppImageBackgroundProps = ImageBackgroundProps & {
  sourceName?: ImageBackgroundAssetsType;
  width?: ImageStyle['width'] ;
  height?: ImageStyle['height'];
};

export default function AppImageBackground({
  sourceName,
  width,
  height,
  style,
  ...rest
}: AppImageBackgroundProps) {
  return (
    <ExpoImageBackground
      source={sourceName ? ImageBackgroundAssets[sourceName] : rest.source}
      transition={rest.transition}
      {...rest}
    />
  );
}