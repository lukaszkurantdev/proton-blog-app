import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
//components
import ProtonIcon from './ProtonIcon';
//styles
import Colors from '../styles/Colors';
import GlobalStyles from '../styles/GlobalStyles';

interface IProps {
  title?: string;
}

const TopBar = (props: IProps) => (
  <View style={[styles.container, GlobalStyles.smallShadow]}>
    <Text style={GlobalStyles.mainHeader}>{props.title}</Text>
    <ProtonIcon type="primary" containerSize={40} iconSize={30} />
  </View>
);

export default TopBar;

const styles = StyleSheet.create({
  container: {
    height: 60,
    justifyContent: 'space-between',
    backgroundColor: Colors.WHITE,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
});
