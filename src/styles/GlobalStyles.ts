import {StyleSheet} from 'react-native';
import Fonts from './Fonts';
import Colors from './Colors';

const GlobalStyles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 10,
  },
  smallShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  separator: {
    backgroundColor: Colors.GRAY,
    marginVertical: 20,
    height: 1,
    width: '40%',
    alignSelf: 'center',
  },

  buttonText: {
    color: Colors.WHITE,
    fontFamily: Fonts.REGULAR,
  },
  mainHeader: {
    color: Colors.TEXTPRIMARY,
    fontFamily: Fonts.BOLD,
    fontSize: 20,
  },
  mainHeaderDescription: {
    color: Colors.TEXTSECONDARY,
    fontFamily: Fonts.REGULAR,
  },
  errorText: {
    color: Colors.DANGER,
    fontFamily: Fonts.REGULAR,
    fontSize: 12,
  },
});

export default GlobalStyles;
