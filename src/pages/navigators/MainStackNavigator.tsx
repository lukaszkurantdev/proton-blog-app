import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
//pages

const Stack = createStackNavigator();

export default class MainStackNavigator extends React.Component {
  render = () => (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={<></>} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
