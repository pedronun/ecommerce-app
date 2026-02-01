import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const createStyles = (backgroundColor?: string, iconColor?: string) => {
  const bgColor = backgroundColor ?? '#0066FF';
  const iColor = iconColor ?? '#FFFFFF';

  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: bgColor,
    },
    content: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconGroup: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 64,
    },
    circle: {
      position: 'absolute',
      width: 100,
      height: 100,
      borderRadius: 50,
      borderWidth: 4,
      borderColor: iColor,
    },
    iconContainer: {
      width: 120,
      height: 120,
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconInner: {
      width: 100,
      height: 100,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: iColor,
      shadowColor: iColor,
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.3,
      shadowRadius: 20,
      elevation: 10,
    },
    textContainer: {
      alignItems: 'center',
    },
    statusText: {
      fontSize: 20,
      fontWeight: '600',
      textAlign: 'center',
    },
    progressText: {
      fontSize: 32,
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: 12,
    },
    progressContainer: {
      marginTop: 48,
      width: width * 0.6,
      height: 4,
      backgroundColor: `${iColor}30`,
      borderRadius: 9999,
      overflow: 'hidden',
    },
    progressBar: {
      height: '100%',
      backgroundColor: iColor,
      borderRadius: 9999,
    },
  });
};
