import React from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
//styles
import Colors from '../styles/Colors';
import GlobalStyles from '../styles/GlobalStyles';

type IconType = 'primary' | 'secondary';

interface IProps {
  type: IconType;
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

  return (
    <View
      style={[
        styles.iconContainer,
        GlobalStyles.shadow,
        {backgroundColor: iconColors.backgroundColor},
      ]}>
      <Icon name="ios-planet" size={70} color={iconColors.iconColor} />
    </View>
  );
};

export default ProtonIcon;

const styles = StyleSheet.create({
  iconContainer: {
    height: 100,
    width: 100,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
