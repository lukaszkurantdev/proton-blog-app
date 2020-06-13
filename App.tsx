import React from 'react';
import SplashScreen from 'react-native-splash-screen';
//navigator
import MainStackNavigator from './src/pages/navigators/MainStackNavigator';
//state tree
import {Provider} from 'mobx-react';
import Store from './src/core/store/RootStore';

export default class App extends React.Component {
  componentDidMount = () => {
    SplashScreen.hide();
  };

  render = () => {
    return (
      <Provider store={new Store()}>
        <MainStackNavigator />
      </Provider>
    );
  };
}
