import { useThemedColor } from "@/core/hooks/useThemedColor";
import { ColorTypes, Colors, Radius, Spacing, typography } from "@/core/theme";
import { verticalScale } from "@/core/utils/metric";
import { useState } from "react";
import {
  BlurEvent,
  FocusEvent,
  Pressable,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

type AppTextInputProps = TextInputProps & {
  style?: StyleProp<ViewStyle>;
  textInputStyle?: StyleProp<TextStyle>;
  bgLightColor?: ColorTypes;
  bgDarkColor?: ColorTypes;
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  onRightIconPress?: () => void; // renamed from onPressIcon, scoped to rightIcon
  isError?: boolean;
  onFocusChange?: (isFocused: boolean) => void;
};

export default function AppTextInput({
  style,
  textInputStyle,
  bgLightColor,
  bgDarkColor,
  isError,
  onRightIconPress,
  leftIcon,
  rightIcon,
  onFocusChange,
  ...rest
}: AppTextInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: FocusEvent) => {
    setIsFocused(true);
    rest.onFocus?.(e)
    onFocusChange?.(true);
  };

  const handleBlur = (e: BlurEvent) => {
    setIsFocused(false);
    rest.onBlur?.(e);
    onFocusChange?.(false);
  };

  const focusedBorderColor = useThemedColor(
    { light: bgLightColor, dark: bgDarkColor },
    "borderFocus",
  );
 
  const blurredBackgroundColor = useThemedColor(undefined,'surface');
  const errorColor = useThemedColor(undefined, "error");
  const placeholderColor = useThemedColor(undefined, "textPlaceholder");
  const textColor = useThemedColor(undefined, "textDefault");

  const backgroundColor = blurredBackgroundColor;

  const borderColor = isError
    ? errorColor
    : isFocused
      ? focusedBorderColor
      : 'transparent';
  const resolvedTextColor = isError ? errorColor : textColor;

  const renderRightIcon = () => {
    if (!rightIcon) return null;

    return (
      <Pressable style={[styles.iconContainer,styles.textInputNoRightIcon]} onPress={onRightIconPress}>
        {rightIcon}
      </Pressable>
    );
  };

  return (
    <View style={[styles.container, { borderColor, backgroundColor }, style]}>
      {leftIcon && <View style={styles.iconContainer}>{leftIcon}</View>}
      <TextInput
        style={[
          styles.textInput,
          !rightIcon && styles.textInputNoRightIcon,
          { color: resolvedTextColor },
          textInputStyle
        ]}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholderTextColor={placeholderColor}
        cursorColor={rest.cursorColor ?? focusedBorderColor}
        {...rest}
      />
      {renderRightIcon()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: Radius["3xl"],
    height: verticalScale(54, { max: 54 }),
    maxWidth: 500,
  },
  textInput: {
    flex: 1,
    height: '100%',
    ...typography.titleSmall,
    fontSize: 16,
    lineHeight: 20,
  },
  textInputNoRightIcon: {
    marginRight: Spacing.md,
  },
  iconContainer: {
    marginLeft: Spacing.sm,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: Spacing.sm,
    paddingRight: Spacing.xsm,
  },
});