import React from 'react';
import {View} from 'react-native';
//navigator
import MainStackNavigator from './src/pages/navigators/MainStackNavigator';
//state tree
import {Provider} from 'mobx-react';
import Store from './src/core/store/Store';

export default class App extends React.Component {
  render = () => {
    return (
      <Provider store={Store}>
        <MainStackNavigator />
      </Provider>
    );
  };
}
