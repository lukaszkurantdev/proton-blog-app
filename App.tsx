import React from 'react';
import {View} from 'react-native';
//navigator
import MainStackNavigator from './src/pages/navigators/MainStackNavigator';

export default class App extends React.Component {
  render = () => {
    return (
      <View>
        <MainStackNavigator />
      </View>
    );
  };
}
