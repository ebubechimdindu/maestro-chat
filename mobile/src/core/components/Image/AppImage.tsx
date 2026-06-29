import { ImageProps, Image as ExpoImage, ImageStyle } from "expo-image";
import { ImageAssets, ImageAssetsType } from "@/core/components/Image/ImageAssets";

type AppImageProps = ImageProps & {
  sourceName?: ImageAssetsType;
  width?: ImageStyle['width'] ;
  height?: ImageStyle['height'];
};

export default function AppImage({
  sourceName,
  width,
  height,
  style,
  ...rest
}: AppImageProps) {
  return (
    <ExpoImage
      source={sourceName ? ImageAssets[sourceName] : rest.source}
      style={[{ width, height }, style]}
      transition={rest.transition ?? 400}
      {...rest}
    />
  );
}