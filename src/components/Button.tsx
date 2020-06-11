import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
//styles
import Colors from '../styles/Colors';
import GlobalStyles from '../styles/GlobalStyles';

interface IProps {
  title: string;
  loading?: boolean;
  containerStyle?: Object;
  type?: 'primary' | 'secondary';
  onPress?: () => void;
}

const TypeColors = {
  primary: {
    background: [Colors.PRIMARY, Colors.SECONDARY],
    text: Colors.WHITE,
  },
  secondary: {
    background: [Colors.WHITE, Colors.WHITE],
    text: Colors.PRIMARY,
  },
};

const Button = (props: IProps) => {
  const {title, loading, containerStyle, type, onPress} = props;
  const typeColors = TypeColors[type || 'primary'];

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={[containerStyle]}
      onPress={onPress}>
      <LinearGradient
        colors={typeColors.background}
        start={{x: -1, y: -1}}
        end={{x: 1, y: 1}}
        style={[styles.container, GlobalStyles.shadow]}>
        {loading ? (
          <ActivityIndicator color={typeColors.text} />
        ) : (
          <Text style={[GlobalStyles.buttonText, {color: typeColors.text}]}>
            {title}
          </Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    height: 50,
    marginHorizontal: 15,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 25,
  },
});
