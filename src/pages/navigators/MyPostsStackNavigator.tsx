import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
//pages
import MyPostsPage from '../MyPostsPage';
import PostDetailsPage from '../PostDetailsPage';

const Stack = createStackNavigator();

export default class MyPostsStackNavigator extends React.Component {
  render = () => (
    <NavigationContainer independent>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="My posts" component={MyPostsPage} />
        <Stack.Screen name="Details" component={PostDetailsPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
