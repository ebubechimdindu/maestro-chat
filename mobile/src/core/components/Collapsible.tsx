import { SymbolView } from 'expo-symbols';
import { PropsWithChildren, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { AppView } from './AppView';
import AppText from './Text/AppText';
import { Spacing } from '../theme/spacing';
import { Colors } from '../theme';


export function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AppView>
      <Pressable
        style={({ pressed }) => [styles.heading, pressed && styles.pressedHeading]}
        onPress={() => setIsOpen((value) => !value)}>
        <AppView  style={styles.button}>
          <SymbolView
            name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }}
            size={14}
            weight="bold"
            tintColor={Colors.black}
            style={{ transform: [{ rotate: isOpen ? '-90deg' : '90deg' }] }}
          />
        </AppView>

        <AppText>{title}</AppText>
      </Pressable>
      {isOpen && (
        <Animated.View entering={FadeIn.duration(800)}>
          <AppView style={styles.content}>
            {children}
          </AppView>
        </Animated.View>
      )}
    </AppView>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  pressedHeading: {
    opacity: 0.7,
  },
  button: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    marginTop: Spacing.base,
    borderRadius: Spacing.base,
    marginLeft: Spacing.lg,
    padding: Spacing.lg,
  },
});
