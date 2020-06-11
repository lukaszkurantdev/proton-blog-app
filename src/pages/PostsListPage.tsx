import React from 'react';
import {Text, StyleSheet, FlatList} from 'react-native';
import {inject, observer} from 'mobx-react';
//components
import TopBar from '../components/TopBar';
import Post from '../components/Post';
import Carousel from '../components/Carousel';
import ErrorContainer from '../components/ErrorContainer';
//models
import {Post as PostModel} from '../core/models/Post.model';
import GlobalStyles from '../styles/GlobalStyles';
import TranslationService from '../core/services/TranslationService';
//stores
import RootStore from '../core/store/RootStore';
import Loader from '../components/Loader';

interface IProps {
  navigation: any;
  store: RootStore;
}

@inject('store')
@observer
export default class PostsListPage extends React.Component<IProps> {
  componentDidMount = () => {
    // this.props.store.postsStore.getList();
  };

  renderItem = ({item, index}: {item: PostModel; index: number}) => (
    <Post {...item} onPress={() => this.showDetails(item)} />
  );

  keyExtractor = (_item: any, index: number) => '' + index;

  showDetails = (item: PostModel) => {
    this.props.navigation.navigate('Details', {data: item});
  };

  render() {
    const {fetchingPostForm, listError} = this.props.store.postsStore;
    return (
      <>
        <TopBar title={TranslationService.t('proton_blog')} />
        {fetchingPostForm ? (
          <Loader />
        ) : listError ? (
          <ErrorContainer />
        ) : (
          <FlatList
            data={[]}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            contentContainerStyle={styles.flatListContent}
            ListHeaderComponent={
              <>
                <Text style={[GlobalStyles.mainHeader, styles.header]}>
                  {TranslationService.t('proposed')}
                </Text>
                <Carousel data={[]} />
                <Text
                  style={[
                    GlobalStyles.mainHeader,
                    styles.header,
                    styles.othersHeader,
                  ]}>
                  {TranslationService.t('others')}
                </Text>
              </>
            }
          />
        )}
      </>
    );
  }
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
