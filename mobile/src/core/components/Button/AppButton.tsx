import React, { ReactNode } from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  TextStyle,
  View,
} from "react-native";
import { useThemedColor } from "@/core/hooks/useThemedColor";
import { styles } from "@/core/components/atom/Button/AppButton.styles";
import AppText from "../Text/AppText";
import { TypographyType } from "@/core/theme/typography";
import { Colors, ColorTypes } from "@/core/theme";
import { getVariantStyle } from "./AppButton.variants";
import { I18nKey } from "@/i18n/type";

type AppButtonProps = PressableProps & {
  title?: string;
  i18nKey?: I18nKey;
  titleType?: TypographyType;
  isLoading?: boolean;
  titleColor?: ColorTypes;
  titleStyle?: TextStyle;
  bgLightColor?: ColorTypes;
  bgDarkColor?: ColorTypes;
  variant?: "primary" | "secondary" | "gradient" | "outline";
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

export default function AppButton({
  title,
  i18nKey,
  titleType = "headlineBase",
  isLoading,
  titleColor,
  titleStyle,
  bgLightColor,
  bgDarkColor,
  style,
  children,
  leftIcon,
  rightIcon,
  variant = "primary",
  ...rest
}: AppButtonProps) {
  const isDisabled = !!(isLoading ?? rest.disabled);
  const showGradient = variant === "gradient" && !isDisabled;

  const themedBgOverride = useThemedColor(
    { light: bgLightColor, dark: bgDarkColor },
    "primary"
  );

  const variantStyle = getVariantStyle(variant, themedBgOverride);

  const resolvedLabelColor = titleColor ? Colors[titleColor] : undefined;

  const resolvedLabelStyles = [
    variantStyle.text,
    resolvedLabelColor ? { color: resolvedLabelColor } : null,
    titleStyle,
  ];

  const renderContent = () => {
    if (children && typeof children !== "function") return children;

    if (isLoading) {
      return (
        <View style={[styles.contentContainer, styles.loadingContainer]}>
          <AppText type={titleType} style={resolvedLabelStyles} i18nKey={i18nKey}>
            {title}
          </AppText>
          <ActivityIndicator
            color={resolvedLabelColor ?? variantStyle.text.color ?? Colors.white}
            size="small"
          />
        </View>
      );
    }

    return (
      <View style={styles.contentContainer}>
        {leftIcon && <View style={styles.icon}>{leftIcon}</View>}
        <AppText type={titleType} style={resolvedLabelStyles} i18nKey={i18nKey}>
          {title}
        </AppText>
        {rightIcon && <View style={styles.icon}>{rightIcon}</View>}
      </View>
    );
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        variantStyle.container,
        isDisabled ? variantStyle.disabled : { backgroundColor: !showGradient ? variantStyle.container.backgroundColor : undefined },
        { opacity: pressed ? 0.85 : isDisabled ? 0.6 : 1 },
         typeof style === "function" ? style({
           pressed,
           hovered: false
         }) : style,
      ]}
      disabled={isDisabled}
      accessibilityRole="button"
      {...rest}
    >
      {renderContent()}
    </Pressable>
  );
}