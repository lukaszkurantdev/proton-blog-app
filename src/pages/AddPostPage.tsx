import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/Ionicons';
//components
import TopBar from '../components/TopBar';
import ImagePicker from 'react-native-image-picker';
//models
import GlobalStyles from '../styles/GlobalStyles';
import TranslationService from '../core/services/TranslationService';
import Colors from '../styles/Colors';
import Input from '../components/Input';
import Button from '../components/Button';

export default class AddPostPage extends React.Component {
  state = {
    image: {uri: ''},
  };

  pickImage = () => {
    const options = {
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};

        this.setState({
          image: source,
        });
        console.log(response.uri);
      }
    });
  };
  render = () => {
    return (
      <>
        <TopBar title={TranslationService.t('add_new_post')} />
        <KeyboardAwareScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="always">
          <TouchableOpacity style={styles.imagePicker} onPress={this.pickImage}>
            {!!this.state.image.uri ? (
              <Image style={styles.image} source={this.state.image} />
            ) : (
              <View style={styles.iconContainer}>
                <Icon name="ios-images" size={40} color={Colors.SECONDARY} />
                <Text
                  style={[
                    GlobalStyles.mainHeaderDescription,
                    styles.iconHeader,
                  ]}>
                  {TranslationService.t('add_image')}
                </Text>
              </View>
            )}
          </TouchableOpacity>

          <Input placeholder={TranslationService.t('title')} />
          <Input placeholder={TranslationService.t('content')} />

          <Button type="primary" title={TranslationService.t('add_post')} />
        </KeyboardAwareScrollView>
      </>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  imagePicker: {
    height: 200,
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    marginBottom: 20,
  },
  image: {
    height: 198,
    width: '100%',
    borderRadius: 10,
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconHeader: {
    marginTop: 10,
  },
});
