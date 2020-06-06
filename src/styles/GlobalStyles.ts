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
    elevation: 12,
  },

  buttonText: {
    color: Colors.WHITE,
    fontFamily: Fonts.REGULAR,
  },
});

export default GlobalStyles;
