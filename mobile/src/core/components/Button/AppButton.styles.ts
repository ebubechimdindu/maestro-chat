import { Colors, Radius, Spacing } from '@/core/theme'
import { verticalScale } from '@/core/utils/metric'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  button: {
    width: '100%',
    maxWidth: 370,
    height: verticalScale(60),
    maxHeight:60,
    borderRadius: Radius['4xl'],
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  background: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
  },
  buttonDisabled: {
    backgroundColor: Colors['neutral400']
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingContainer: {
    gap: Spacing.xsm,
  },
  icon: {
    marginHorizontal: Spacing.sm,
  },
})