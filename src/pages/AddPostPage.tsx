import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {inject, observer} from 'mobx-react';
//components
import TopBar from '../components/TopBar';
import ImagePicker from '../components/ImagePicker';
import GlobalStyles from '../styles/GlobalStyles';
//models
import TranslationService from '../core/services/TranslationService';
import Input from '../components/Input';
import Button from '../components/Button';
//types
import {Post} from '../core/models/Post.model';
//stores
import RootStore from '../core/store/RootStore';

interface IProps {
  store: RootStore;
  navigation: any;
}

@inject('store')
@observer
export default class AddPostPage extends React.Component<IProps> {
  titleInputRef = React.createRef<Input>();
  contentInputRef = React.createRef<Input>();
  imagePickerRef = React.createRef<ImagePicker>();

  navigateToPostList = () => {
    this.props.navigation.navigate('UserNavigator', {screen: 'My Posts'});
  };

  create = async () => {
    const titleRef = this.titleInputRef.current;
    const contentRef = this.contentInputRef.current;
    const imageRef = this.imagePickerRef.current;

    if (titleRef && contentRef && imageRef) {
      const validations = [
        titleRef.validate(),
        contentRef.validate(),
        imageRef.validate(),
      ];

      if (validations.findIndex((v) => !v) === -1) {
        const post: Post = {
          title: titleRef.getValue(),
          content: contentRef.getValue(),
          image: await imageRef.getValue(),
        };

        this.props.store.postsStore.createPost(post, this.navigateToPostList);
      }
    }
  };

  render() {
    const {fetchingPostForm, postFormError} = this.props.store.postsStore;

    return (
      <>
        <TopBar title={TranslationService.t('add_new_post')} />
        <KeyboardAwareScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="always">
          {postFormError && (
            <Text style={[GlobalStyles.errorText, styles.errorText]}>
              {TranslationService.t('not_logged')}
            </Text>
          )}

          <ImagePicker ref={this.imagePickerRef} />

          <Input
            ref={this.titleInputRef}
            placeholder={TranslationService.t('title')}
          />

          <Input
            ref={this.contentInputRef}
            placeholder={TranslationService.t('content')}
          />

          <Button
            onPress={this.create}
            loading={fetchingPostForm}
            type="primary"
            title={TranslationService.t('add_post')}
          />
        </KeyboardAwareScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  errorText: {},
});
