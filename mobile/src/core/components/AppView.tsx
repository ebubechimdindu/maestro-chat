import { View, type ViewProps } from 'react-native';


export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function AppView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  
  return <View {...otherProps} />;
}
