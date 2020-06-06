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
