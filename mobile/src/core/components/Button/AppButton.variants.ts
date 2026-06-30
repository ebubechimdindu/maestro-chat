import { Colors } from "@/core/theme";
import { TextStyle, ViewStyle } from "react-native";

type Variant = "primary" | "secondary" | "gradient" | "outline";

type VariantStyle = {
  container: ViewStyle;
  text: TextStyle;
  disabled: ViewStyle;
};

const baseContained = (bgColor: string): VariantStyle => ({
  container: { backgroundColor: bgColor },
  text: { color: Colors.white },
  disabled: { backgroundColor: Colors.neutral600 },
});

export function getVariantStyle(
  variant: Variant,
  color?: string
): VariantStyle {
  const primaryColor = color ?? Colors.brandPrimary;
  const secondaryColor = color ?? Colors.brandSecondary;

  switch (variant) {
    case "secondary":
      return baseContained(secondaryColor);

    case "outline":
      return {
        container: {
          backgroundColor: "transparent",
          borderWidth: 1.5,
          borderColor: primaryColor,
        },
        text: { color: primaryColor },
        disabled: {
          backgroundColor: "transparent",
          borderColor: Colors["neutral600"],
        },
      };

    case "primary":
    case "gradient":
    default:
      return baseContained(primaryColor);
  }
}