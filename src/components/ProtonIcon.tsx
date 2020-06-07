import React from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
//styles
import Colors from '../styles/Colors';
import GlobalStyles from '../styles/GlobalStyles';

type IconType = 'primary' | 'secondary';

interface IProps {
  type: IconType;
  containerSize?: number;
  iconSize?: number;
}

const IconColors: {
  [key in IconType]: {backgroundColor: string; iconColor: string};
} = {
  primary: {
    backgroundColor: Colors.SECONDARY,
    iconColor: Colors.WHITE,
  },
  secondary: {
    backgroundColor: Colors.WHITE,
    iconColor: Colors.SECONDARY,
  },
};

const ProtonIcon = (props: IProps) => {
  const iconColors = IconColors[props.type];
  const containerSize = props.containerSize || 100;
  const iconSize = props.iconSize || 70;

  return (
    <View
      style={[
        styles.iconContainer,
        GlobalStyles.shadow,
        {
          backgroundColor: iconColors.backgroundColor,
          height: containerSize,
          width: containerSize,
        },
      ]}>
      <Icon name="ios-planet" size={iconSize} color={iconColors.iconColor} />
    </View>
  );
};

export default ProtonIcon;

const styles = StyleSheet.create({
  iconContainer: {
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
