import { Text, TextStyle } from "react-native";
import { Colors, typography } from "@/core/theme";
import { useThemedColor } from "@/core/hooks/useThemedColor";
import { AppTextProps } from "./AppText";

export type AppSpanProps = AppTextProps & {
  textDecorationLine?: TextStyle["textDecorationLine"];
};

export default function AppSpan({
  lightColor,
  darkColor,
  fontWeight,
  style,
  textDecorationLine,
  type,
  fontSize,
  ...rest
}: AppSpanProps) {
 
  const color = lightColor ? Colors[lightColor] : undefined
 
  const content =  rest.children;

  return (
    <Text
      {...rest}
      style={[
        type && typography[type],
        {
          fontWeight,
          color,
          fontSize: fontSize,
          textDecorationLine
        },
        style,
      ]}
    >
      {content}
    </Text>
  );
}