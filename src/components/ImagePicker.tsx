import React from 'react';
import {Image, TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import Icon from 'react-native-vector-icons/Ionicons';
//styles
import GlobalStyles from '../styles/GlobalStyles';
import Colors from '../styles/Colors';
//services
import TranslationService from '../core/services/TranslationService';

export default class ImagePick extends React.Component {
  state = {
    imageBase64: '',
    errorMessage: '',
  };

  pickImage = () => {
    const options = {
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        this.setState({
          imageBase64: 'data:image/jpeg;base64,' + response.data,
          errorMessage: '',
        });
      }
    });
  };

  validate = () => {
    const validate = this.state.imageBase64.length !== 0;

    if (!validate) {
      this.setState({errorMessage: TranslationService.t('empty_field')});
    } else {
      this.setState({errorMessage: ''});
    }

    return validate;
  };

  getValue = async () => {
    return this.state.imageBase64;
  };

  render = () => {
    return (
      <>
        <TouchableOpacity
          style={[
            styles.imagePicker,
            !!this.state.errorMessage && styles.errorContainer,
          ]}
          onPress={this.pickImage}>
          {!!this.state.imageBase64 ? (
            <Image
              style={styles.image}
              source={{uri: this.state.imageBase64}}
            />
          ) : (
            <View style={styles.iconContainer}>
              <Icon name="ios-images" size={40} color={Colors.SECONDARY} />
              <Text
                style={[GlobalStyles.mainHeaderDescription, styles.iconHeader]}>
                {TranslationService.t('add_image')}
              </Text>
            </View>
          )}
        </TouchableOpacity>
        {!!this.state.errorMessage && (
          <Text style={[GlobalStyles.errorText, styles.errorText]}>
            {TranslationService.t('empty_field')}
          </Text>
        )}
      </>
    );
  };
}

const styles = StyleSheet.create({
  imagePicker: {
    height: 200,
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    marginBottom: 20,
    backgroundColor: Colors.WHITE,
  },
  errorContainer: {
    borderColor: Colors.DANGER,
    marginBottom: 10,
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
  errorText: {
    marginBottom: 20,
    marginHorizontal: 15,
  },
});
