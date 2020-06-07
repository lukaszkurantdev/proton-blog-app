import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
//components
import TopBar from '../components/TopBar';
import Post from '../components/Post';
import Carousel from '../components/Carousel';
//models
import {Post as PostModel} from '../core/models/Post.model';
import GlobalStyles from '../styles/GlobalStyles';
import TranslationService from '../core/services/TranslationService';

export default class AddPostPage extends React.Component {
  render = () => {
    return (
      <>
        <TopBar title={TranslationService.t('add_new_post')} />
      </>
    );
  };
}

const styles = StyleSheet.create({});
