import React from "react";
import { Animated, Platform, Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ToastConfigParams } from "toastify-react-native/utils/interfaces";
import AppText from "@/core/components/Text/AppText";
import { useThemedColor } from "@/core/hooks/useThemedColor";
import { Colors, Radius, Spacing } from "@/core/theme";
import { MaestrochatTheme } from "@/core/theme/theme";

export type AppToastType = "success" | "error" | "info" | "warn" | "toast" | "banner";

export type AppToastProps = ToastConfigParams & {
  toastType: AppToastType;
  onClose?: () => void;
};

const TONE: Record<AppToastType, { icon: keyof typeof Ionicons.glyphMap; theme: MaestrochatTheme }> = {
  success: { icon: "checkmark-circle", theme: "success" },
  error: { icon: "alert-circle", theme: "error" },
  warn: { icon: "warning", theme: "warning" },
  info: { icon: "information-circle", theme: "info" },
  toast: { icon: "checkmark-circle", theme: "success" },
  banner: { icon: "wifi-outline", theme: "warning" },
};

export default function AppToast({
  toastType,
  text1,
  text2,
  hide,
  onClose,
  onPress,
  barWidth,
  showProgressBar = true,
  showCloseIcon = true,
  icon,
  iconColor,
  backgroundColor,
  textColor,
  width,
  minHeight,
  style,
}: AppToastProps) {
  const insets = useSafeAreaInsets();
  const tone = TONE[toastType] ?? TONE.info;

  const accent = useThemedColor({}, tone.theme);
  const surface = useThemedColor({}, "surface");
  const textDefault = useThemedColor({}, "textDefault");
  const textSecondary = useThemedColor({}, "textSecondary");

  const close = onClose ?? hide;
  const resolvedIcon = (icon as keyof typeof Ionicons.glyphMap) ?? tone.icon;

  if (toastType === "banner") {
    return (
      <View style={[bannerStyles.wrap, { paddingTop: insets.top, backgroundColor: backgroundColor ?? accent }]}>
        <Pressable onPress={onPress} style={bannerStyles.content}>
          <Ionicons name={resolvedIcon} size={16} color={Colors.white} />
          <AppText type="labelLarge" style={{ color: Colors.white, marginLeft: Spacing.xsm }}>
            {text1}
          </AppText>
        </Pressable>
      </View>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      style={[
        cardStyles.card,
        { backgroundColor: backgroundColor ?? surface, width: width ?? "90%", minHeight: minHeight ?? 56 },
        style as any,
      ]}
    >
      <View style={[cardStyles.iconWrap, { backgroundColor: `${accent}22` }]}>
        <Ionicons name={resolvedIcon} size={20} color={iconColor ?? accent} />
      </View>

      <View style={cardStyles.textWrap}>
        {!!text1 && (
          <AppText type="titleSmall" style={{ color: textColor ?? textDefault }} numberOfLines={1}>
            {text1}
          </AppText>
        )}
        {!!text2 && (
          <AppText type="bodySmall" style={{ color: textColor ?? textSecondary, marginTop: 2 }} numberOfLines={2}>
            {text2}
          </AppText>
        )}
      </View>

      {showCloseIcon && (
        <Pressable hitSlop={8} onPress={close} style={cardStyles.closeBtn}>
          <Ionicons name="close" size={16} color={textSecondary} />
        </Pressable>
      )}

      {showProgressBar && barWidth && (
        <Animated.View
          style={[
            cardStyles.progressBar,
            {
              backgroundColor: accent,
              width: barWidth.interpolate({ inputRange: [0, 100], outputRange: ["0%", "100%"] }),
            },
          ]}
        />
      )}
    </Pressable>
  );
}

const cardStyles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: Radius.lg,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
      },
      android: { elevation: 6 },
    }),
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: Radius.full,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.sm,
  },
  textWrap: {
    flex: 1,
    paddingRight: Spacing.sm,
  },
  closeBtn: {
    padding: Spacing.xs,
  },
  progressBar: {
    position: "absolute",
    left: 0,
    bottom: 0,
    height: 3,
  },
});

const bannerStyles = StyleSheet.create({
  wrap: {
    width: "100%",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.base,
  },
});
