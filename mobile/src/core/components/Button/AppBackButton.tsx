import {
  GestureResponderEvent,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import React from "react";
import { FontAwesome6, AntDesign } from "@expo/vector-icons";
import { useThemedColor } from "@/core/hooks/useThemedColor";
import { Colors, ColorTypes, Radius, Shadows, Spacing } from "@/core/theme";
import { Route } from "@react-navigation/native";
import { router } from "expo-router";

type AppBackButtonProps = TouchableOpacityProps & {
  bgLightColor?: ColorTypes;
  bgDarkColor?: ColorTypes;
  iconLightColor?: ColorTypes;
  iconDarkColor?: ColorTypes;
  iconType?: "chevron" | "arrow";
  shouldRoute?: boolean;
};

export default function AppBackButton({
  bgLightColor,
  bgDarkColor,
  iconLightColor,
  iconDarkColor,
  iconType = "arrow",
  shouldRoute = false,
  onPress,
  style,
  ...rest
}: AppBackButtonProps) {
  
  const iconColor = useThemedColor(
    { light: iconLightColor, dark: iconDarkColor },
    "textDefault"
  );
 
  
  const handlePress = (event: GestureResponderEvent) => {
    if (onPress) {
      onPress(event);
      return;
    }

    router.back();
  };

  const resolvedIcon = Platform.select({
    ios: <FontAwesome6 name="chevron-left" size={18} color={iconColor} />,
    android:
      iconType === "chevron" ? (
        <FontAwesome6 name="chevron-left" size={18} color={iconColor} />
      ) : (
        <AntDesign name="arrow-left" size={20} color={iconColor} />
      ),
  });

  return (
    <TouchableOpacity
      onPress={handlePress}
      {...rest}
    >
      {resolvedIcon}
    </TouchableOpacity>
  );
}

