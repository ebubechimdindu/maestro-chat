import { useColorScheme } from "react-native";
import { ColorTypes, Colors } from '@/core/theme/colors';
import { MaestrochatTheme, darkTheme, lightTheme } from "../theme/theme";

export const useThemedColor = (
    colorProps?: { light?: ColorTypes; dark?: ColorTypes },
    colorName?: MaestrochatTheme
): string => {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'light' ? 'light' : 'dark';

    if (colorProps && colorProps[theme] !== undefined) {
        const colorKey = colorProps[theme];
        return Colors[colorKey];
    } else if (colorName !== undefined) {
        const currentTheme = theme === "light" ? lightTheme : darkTheme;
        return currentTheme[colorName];
    } else {
        // Fallback color if neither colorProps nor colorName is provided
        return ''; // or any default color key
    }
};

