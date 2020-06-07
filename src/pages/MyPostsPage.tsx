import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
//components
import TopBar from '../components/TopBar';
import Post from '../components/Post';
import Carousel from '../components/Carousel';
//models
import {Post as PostModel} from '../core/models/Post.model';
import GlobalStyles from '../styles/GlobalStyles';

export default class MyPostsPage extends React.Component {
  renderItem = ({item, index}: {item: PostModel; index: number}) => (
    <Post {...item} />
  );

  keyExtractor = (_item: any, index: number) => '' + index;

  render = () => {
    return (
      <>
        <TopBar title="My posts" />

        <FlatList
          data={fakeData}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          contentContainerStyle={styles.flatListContent}
        />
      </>
    );
  };
}

const styles = StyleSheet.create({
  flatListContent: {
    paddingVertical: 20,
  },
  header: {
    marginHorizontal: 20,
  },
  othersHeader: {
    marginBottom: 10,
  },
});

const fakeData: PostModel[] = [
  {
    image: 'https://miro.medium.com/max/3000/1*MI686k5sDQrISBM6L8pf5A.jpeg',
    title: 'Lorem ipsum dorem',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    image: 'https://miro.medium.com/max/3000/1*MI686k5sDQrISBM6L8pf5A.jpeg',
    title: 'Lorem ipsum dorem',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    image: 'https://miro.medium.com/max/3000/1*MI686k5sDQrISBM6L8pf5A.jpeg',
    title: 'Lorem ipsum dorem',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    image: 'https://live.staticflickr.com/4561/38054606355_26429c884f_b.jpg',
    title: 'Lorem ipsum dorem',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    image: 'https://live.staticflickr.com/4561/38054606355_26429c884f_b.jpg',
    title: 'Lorem ipsum dorem',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    image: 'https://live.staticflickr.com/4561/38054606355_26429c884f_b.jpg',
    title: 'Lorem ipsum dorem',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
];
