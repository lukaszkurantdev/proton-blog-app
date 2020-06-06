import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
//styles
import Colors from '../../styles/Colors';
//pages
import LoginPage from '../LoginPage';

const Stack = createStackNavigator();

export default class MainStackNavigator extends React.Component {
  render = () => (
    <NavigationContainer>
      <StatusBar backgroundColor={Colors.PRIMARY} />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={LoginPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
