import { Text, TextProps, TextStyle } from "react-native";
import { typography } from "@/core/theme";
import { useThemedColor } from "@/core/hooks/useThemedColor";
import { ColorTypes } from "@/core/theme/colors";
import { TypographyType } from "@/core/theme/typography";

export type AppTextProps = TextProps & {
  lightColor?: ColorTypes;
  darkColor?: ColorTypes;
  type?: TypographyType;
  fontWeight?: TextStyle["fontWeight"];
  fontSize?: TextStyle["fontSize"];
};

export default function AppText({
  lightColor,
  darkColor,
  fontWeight,
  style,
  type = "bodyMedium",
  fontSize,
  children,
  ...rest
}: AppTextProps) {
  const color = useThemedColor(
    { light: lightColor, dark: darkColor },
    "textDefault",
  );

  const content =  children;

  return (
    <Text
      style={[
        typography[type],
        {
          color,
          fontWeight,
          fontSize: fontSize !== undefined ? fontSize : typography[type].fontSize,
        },
        style,
      ]}
      {...rest}
    >
      {content}
    </Text>
  );
}