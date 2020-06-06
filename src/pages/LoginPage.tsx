import React from 'react';
import {View} from 'react-native';
import Button from '../components/Button';
import Input from '../components/Input';
import Loader from '../components/Loader';

class LoginPage extends React.Component {
  render = () => {
    return (
      <View style={{flex: 1}}>
        <Button title="test" />
        <Input />
        <Loader />
      </View>
    );
  };
}

export default LoginPage;
