import {
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { ColorTypes } from "@/core/theme";
import { TypographyType } from "@/core/theme/typography";
import { useThemedColor } from "@/core/hooks/useThemedColor";
import AppText from "../Text/AppText";
import { I18nKey } from "@/i18n/type";

type PressableContainerProps = TouchableOpacityProps & {
  bgLightColor?: ColorTypes;
  bgDarkColor?: ColorTypes;
  i18nKey?: I18nKey;
  title?: string;
  titleType?: TypographyType;
  titleStyle?: TextStyle;
  titleLightColor?: ColorTypes;
  titleDarkColor?: ColorTypes;
};

export default function PressableContainer({
  style,
  bgLightColor,
  bgDarkColor,
  activeOpacity = 0.7,
  title,
  titleType,
  titleStyle,
  titleLightColor,
  titleDarkColor,
  children,
  i18nKey,
  ...rest
}: PressableContainerProps) {
  const backgroundColor = useThemedColor({
    light: bgLightColor,
    dark: bgDarkColor,
  });

  const renderContent = () => {
    if (children) return children;
    if (title) return (
      <AppText
        type={titleType}
        i18nKey={i18nKey}
        lightColor={titleLightColor}
        darkColor={titleDarkColor}
        style={titleStyle}
      >
        {title}
      </AppText>
    );
    return null;
  };

  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      style={[{ backgroundColor }, style]}
      {...rest}
    >
      {renderContent()}
    </TouchableOpacity>
  );
}