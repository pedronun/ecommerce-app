import { Theme } from '@design-system/theme/theme';
import { ViewStyle } from 'react-native';

type SliderStyles = {
  container: ViewStyle;
  itemContainer: (params: { index: number; spacing: number }) => ViewStyle;
  separator: ViewStyle;
};

export const getSliderStyles = (theme: Theme): SliderStyles => ({
  container: {
    flex: 1,
    gap: theme.spacing[2],
  },

  itemContainer: () => ({
    // gap: spacing,
  }),

  separator: {
    marginHorizontal: theme.spacing[1],
  },
});
