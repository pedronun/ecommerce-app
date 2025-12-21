import { StyleSheet, ViewStyle } from 'react-native';
import { BottomSheetSnapPoint } from './BottomSheet.types';

interface Theme {
  colors: {
    surface: string;
  };
  radius: { xl: number };
  spacing: Record<number, number>;
}

export const BACKDROP_COLOR = 'rgba(0, 0, 0, 0.5)';
export const HANDLE_COLOR = '#CCCCCC';

export const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: BACKDROP_COLOR,
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    backgroundColor: HANDLE_COLOR,
    borderRadius: 2,
  },
  content: {
    padding: 0,
  },
});

export const getSheetContainerStyles = (theme: Theme): ViewStyle => ({
  backgroundColor: theme.colors.surface,
  borderTopLeftRadius: theme.radius.xl,
  borderTopRightRadius: theme.radius.xl,
  paddingTop: theme.spacing[3],
});

export const getHandleContainerStyles = (theme: Theme): ViewStyle => ({
  paddingBottom: theme.spacing[2],
});

export const calculateSnapPoint = (
  snapPoint: BottomSheetSnapPoint,
  screenHeight: number
): number => {
  if (typeof snapPoint === 'number') {
    return snapPoint;
  }

  const snapPoints: Record<string, number> = {
    full: screenHeight * 0.95,
    half: screenHeight * 0.5,
    quarter: screenHeight * 0.25,
  };

  return snapPoints[snapPoint] || snapPoints.half;
};
