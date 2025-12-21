import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
export const createStyles = (primaryColor: string, backgroundColor: string) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width,
      height,
    },
    content: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    circle: {
      position: 'absolute',
      width: 100,
      height: 100,
      borderRadius: 50,
      borderWidth: 4,
    },
    logoContainer: {
      width: 120,
      height: 120,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logoInner: {
      width: 100,
      height: 100,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: primaryColor,
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.3,
      shadowRadius: 20,
      elevation: 10,
    },
    cartIcon: {
      width: 60,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cartBody: {
      width: 45,
      height: 35,
      borderWidth: 4,
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
      borderTopRightRadius: 8,
      marginBottom: 8,
    },
    cartWheels: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: 45,
      marginTop: -4,
    },
    wheel: {
      width: 8,
      height: 8,
      borderRadius: 4,
    },
    progressContainer: {
      position: 'absolute',
      bottom: -80,
      width: 200,
      height: 4,
      backgroundColor: `${backgroundColor}20`,
      borderRadius: 2,
      overflow: 'hidden',
    },
    progressBar: {
      width: '40%',
      height: '100%',
      borderRadius: 2,
    },
  });
