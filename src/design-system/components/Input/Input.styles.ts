import { ViewStyle, TextStyle } from 'react-native';

interface Theme {
  colors: {
    text: string;
    error: string;
    border: string;
    background: string;
    primary: string;
  };
  spacing: Record<number, number>;
  radius: { md: number };
  typography: {
    fontSize: Record<string, number>;
  };
}

export const getContainerStyles = (theme: Theme): ViewStyle => ({
  marginBottom: theme.spacing[4],
});

export const getLabelStyles = (theme: Theme): TextStyle => ({
  fontSize: theme.typography.fontSize.sm,
  color: theme.colors.text,
  marginBottom: theme.spacing[1],
});

export const getInputWrapperStyles = (theme: Theme, hasError: boolean): ViewStyle => ({
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: hasError ? theme.colors.error : theme.colors.border,
  borderRadius: theme.radius.md,
  paddingHorizontal: theme.spacing[3],
  backgroundColor: theme.colors.background,
  minHeight: 48,
});

export const getInputFieldStyles = (theme: Theme): TextStyle => ({
  flex: 1,
  fontSize: theme.typography.fontSize.base,
  color: theme.colors.text,
  paddingVertical: theme.spacing[2],
});

export const getIconWrapperStyles = (theme: Theme, position: 'left' | 'right'): ViewStyle => ({
  [position === 'left' ? 'marginRight' : 'marginLeft']: theme.spacing[2],
});

export const getHelperTextStyles = (theme: Theme, isError: boolean): TextStyle => ({
  fontSize: theme.typography.fontSize.xs,
  color: isError ? theme.colors.error : theme.colors.text,
  marginTop: theme.spacing[1],
  opacity: isError ? 1 : 0.6,
});

