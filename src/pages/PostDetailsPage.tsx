import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
//components
import TopBar from '../components/TopBar';
import Post from '../components/Post';
import Carousel from '../components/Carousel';
//models
import {Post as PostModel} from '../core/models/Post.model';
import GlobalStyles from '../styles/GlobalStyles';
import TranslationService from '../core/services/TranslationService';

interface IProps {
  navigation: any;
  route: any;
}
export default class PostDetailsPage extends React.Component<IProps> {
  render = () => {
    console.log(this.props.route);
    const {image, title, content} = this.props.route.params.data;
    return (
      <>
        <TopBar title={TranslationService.t('details')} />
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={GlobalStyles.mainHeader}>{title}</Text>
          <Image style={styles.image} source={{uri: image}} />
          <Text
            style={[GlobalStyles.mainHeaderDescription, styles.textJustify]}>
            {content}
          </Text>
        </ScrollView>
      </>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  image: {
    height: 200,
    marginVertical: 20,
    borderRadius: 10,
  },
  textJustify: {
    textAlign: 'justify',
  },
});
