import React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {inject, observer} from 'mobx-react';
//components
import TopBar from '../components/TopBar';
import Post from '../components/Post';
import ErrorContainer from '../components/ErrorContainer';
import Loader from '../components/Loader';
//models
import {Post as PostModel} from '../core/models/Post.model';
import TranslationService from '../core/services/TranslationService';
import RootStore from '../core/store/RootStore';

interface IProps {
  navigation: any;
  store: RootStore;
}

@inject('store')
@observer
export default class MyPostsPage extends React.Component<IProps> {
  renderItem = ({item, index}: {item: PostModel; index: number}) => (
    <Post {...item} onPress={() => this.showDetails(item)} />
  );

  keyExtractor = (_item: any, index: number) => '' + index;

  showDetails = (item: PostModel) => {
    this.props.navigation.navigate('Details', {data: item});
  };

  render = () => {
    const {
      fetchingPostForm,
      listError,
      userPosts,
    } = this.props.store.postsStore;

    return (
      <>
        <TopBar title={TranslationService.t('my_posts')} />

        {fetchingPostForm ? (
          <Loader />
        ) : listError ? (
          <ErrorContainer />
        ) : (
          <FlatList
            data={userPosts.reverse()}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            contentContainerStyle={styles.flatListContent}
          />
        )}
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
