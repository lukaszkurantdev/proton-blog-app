import React from 'react';
import {Text, StyleSheet, Image, ScrollView} from 'react-native';
import {inject, observer} from 'mobx-react';
//components
import TopBar from '../components/TopBar';
import Button from '../components/Button';
//models
import GlobalStyles from '../styles/GlobalStyles';
import TranslationService from '../core/services/TranslationService';
//stores
import RootStore from '../core/store/RootStore';

interface IProps {
  navigation: any;
  route: any;
  store: RootStore;
}

@inject('store')
@observer
export default class PostDetailsPage extends React.Component<IProps> {
  delete = () => {
    const {id} = this.props.route.params.data;
    this.props.store.postsStore.removePost(id, () => {
      this.props.navigation.goBack();
      this.props.navigation.goBack();
    });
  };

  edit = () => {
    const post = this.props.route.params.data;
    this.props.navigation.navigate('Edit', {post});
  };

  render = () => {
    const {image, title, content, user_id} = this.props.route.params.data;
    const {userId} = this.props.store.userAuthStore;
    const isUserPost = userId === user_id;

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
          {isUserPost && (
            <>
              <Button
                title={TranslationService.t('edit')}
                type="secondary"
                containerStyle={styles.firstButton}
                onPress={this.edit}
              />
              <Button
                title={TranslationService.t('delete')}
                type="primary"
                containerStyle={styles.secondButton}
                onPress={this.delete}
              />
            </>
          )}
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
  firstButton: {
    marginTop: 20,
  },
  secondButton: {
    marginTop: -30,
  },
});
