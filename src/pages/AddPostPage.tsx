import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
//components
import TopBar from '../components/TopBar';
import Post from '../components/Post';
import Carousel from '../components/Carousel';
//models
import {Post as PostModel} from '../core/models/Post.model';
import GlobalStyles from '../styles/GlobalStyles';

export default class AddPostPage extends React.Component {
  render = () => {
    return (
      <>
        <TopBar title="Add new post" />
      </>
    );
  };
}

const styles = StyleSheet.create({});
