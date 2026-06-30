import { Colors } from "./colors";

export const lightTheme = {
  // Core UI
  background: Colors.neutral100,         // #FAF9F6
  surface: Colors.white,                 // cards, modals
  primary: Colors.brandPrimary,
  secondary: Colors.brandSecondary,
  accent: Colors.brandAccent,
  border: Colors.neutral200,
  borderFocus: Colors.brandPrimary,
  borderBlur: Colors.neutral400,

  // Semantic
  success: Colors.green500,
  error: Colors.red500,
  warning: Colors.amber500,
  info: Colors.blue500,

  // Text
  textDefault: Colors.neutral900,        // #303330 - body copy
  textHeading: Colors.neutral900,        // #303330 - headings
  textSecondary: Colors.neutral700Alpha60, // #3C3C4399 - subtitles, captions
  textPlaceholder: Colors.neutral500,    // input placeholders
  textLabel: Colors.neutral600,          // form labels, metadata
  textLink: Colors.brandPrimary,
  textInverse: Colors.white,             // text on dark/colored bg
  textDisabled: Colors.neutral700Alpha30,
};

export const darkTheme = {
  // Core UI
  background: Colors.neutral700,
  surface: Colors.neutral900,
  primary: Colors.brandPrimary,
  secondary: Colors.brandSecondary,
  accent: Colors.brandAccent,
  border: Colors.neutral600,
  borderFocus: Colors.cyan500,
  borderBlur: Colors.neutral500,

  // Semantic
  success: Colors.green400,
  error: Colors.red500,
  warning: Colors.amber500,
  info: Colors.blue600,

  // Text
  textDefault: Colors.white,
  textHeading: Colors.white,
  textSecondary: Colors.whiteAlpha60,
  textPlaceholder: Colors.neutral500,
  textLabel: Colors.neutral400,
  textLink: Colors.cyan500,
  textInverse: Colors.neutral900,
  textDisabled: Colors.whiteAlpha40,
};

export type MaestrochatTheme = keyof typeof lightTheme;