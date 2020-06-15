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
  route: any;
  navigation: any;
}

@inject('store')
@observer
export default class AddPostPage extends React.Component<IProps> {
  titleInputRef = React.createRef<Input>();
  contentInputRef = React.createRef<Input>();
  imagePickerRef = React.createRef<ImagePicker>();

  postToEdit: Post | undefined =
    this.props.route.params && this.props.route.params.post;

  componentDidMount = () => {
    if (this.postToEdit) {
      const titleRef = this.titleInputRef.current;
      const contentRef = this.contentInputRef.current;
      const imageRef = this.imagePickerRef.current;

      if (titleRef && contentRef && imageRef) {
        titleRef.setValue(this.postToEdit.title);
        contentRef.setValue(this.postToEdit.content);
        imageRef.setValue(this.postToEdit.image);
      }
    }
  };

  navigateToPostList = () => {
    this.props.navigation.navigate('Posts List');
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
          image: imageRef.getValue(),
        };

        if (this.postToEdit) {
          (post.id = this.postToEdit.id),
            (post.user_id = this.postToEdit.user_id);
          this.props.store.postsStore.alterPost(post, () => {
            titleRef.setValue('');
            contentRef.setValue('');
            imageRef.setValue('');
            this.props.navigation.goBack();
            this.props.navigation.goBack();
          });
        } else {
          this.props.store.postsStore.createPost(post, () => {
            titleRef.setValue('');
            contentRef.setValue('');
            imageRef.setValue('');
            this.navigateToPostList();
          });
        }
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
            multiline
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
