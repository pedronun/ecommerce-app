import { Theme } from '@design-system/theme/theme';
import { TextStyle } from 'react-native';

export const getBaseStyles = (theme: Theme) => ({
  updateIconBg: {
    backgroundColor: '#FF980018',
  },
  updateActionText: {
    color: theme.colors.primary,
    fontWeight: '600' as TextStyle['fontWeight'],
  },
});
