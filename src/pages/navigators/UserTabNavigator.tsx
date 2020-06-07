import React from 'react';
import {StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
//styles
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';
//pages
import AddPostPage from '../AddPostPage';
import MyPostsStackNavigator from './MyPostsStackNavigator';
import PostStackNavigator from './PostStackNavigator';

const Tab = createBottomTabNavigator();

const BottomBarIcons: {[key in string]: string} = {
  'Posts List': 'ios-compass',
  'My Posts': 'ios-heart',
  'Add Post': 'ios-add-circle-outline',
};

export default class UserTabNavigator extends React.Component {
  render = () => (
    <NavigationContainer independent>
      <StatusBar
        backgroundColor={Colors.WHITE}
        translucent={false}
        barStyle="dark-content"
      />
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            const iconName = BottomBarIcons[route.name];
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: Colors.SECONDARY,
          inactiveTintColor: Colors.GRAY,
          style: {
            height: 50,
          },
          labelStyle: {
            fontFamily: Fonts.REGULAR,
            marginBottom: 5,
          },
        }}>
        <Tab.Screen name="Posts List" component={PostStackNavigator} />
        <Tab.Screen name="My Posts" component={MyPostsStackNavigator} />
        <Tab.Screen name="Add Post" component={AddPostPage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
