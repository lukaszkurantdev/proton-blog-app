import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native';
//styles
import Colors from '../styles/Colors';
import GlobalStyles from '../styles/GlobalStyles';

interface IProps {
  title: string;
  loading?: boolean;
  containerStyle?: Object;
}

const Button = (props: IProps) => {
  const {title, loading, containerStyle} = props;

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={[styles.container, GlobalStyles.shadow, containerStyle]}>
      {loading ? (
        <ActivityIndicator color={Colors.WHITE} />
      ) : (
        <Text style={GlobalStyles.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: 'red',
    marginHorizontal: 15,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
