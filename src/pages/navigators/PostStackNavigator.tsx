import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
//pages
import PostsListPage from '../PostsListPage';
import PostDetailsPage from '../PostDetailsPage';

const Stack = createStackNavigator();

export default class PostStackNavigator extends React.Component {
  render = () => (
    <NavigationContainer independent>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Posts List" component={PostsListPage} />
        <Stack.Screen name="Details" component={PostDetailsPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
