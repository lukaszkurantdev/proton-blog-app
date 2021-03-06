import React from 'react';
import {TextInput, StyleSheet, View, Text} from 'react-native';
import IpRegex from 'ip-regex';
//styles
import Colors from '../styles/Colors';
import GlobalStyles from '../styles/GlobalStyles';
import Fonts from '../styles/Fonts';
//services
import TranslationService from '../core/services/TranslationService';

type InputType = 'default' | 'ip' | 'port' | 'username' | 'password';

interface IProps {
  placeholder?: string;
  containerStyle?: Object;
  type?: InputType;
  multiline?: boolean;
}

interface IState {
  value: string;
  errorMessage: string | null;
}

const Validations: {
  [key in InputType]: {message: string; func: (value: string) => boolean};
} = {
  default: {
    message: TranslationService.t('empty_field'),
    func: (value: string) => !!value,
  },
  ip: {
    message: TranslationService.t('incorrect_ip'),
    func: (value: string) => IpRegex({exact: true}).test(value),
  },
  port: {
    message: TranslationService.t('incorrrect_port'),
    func: (value: string) => {
      var num = +value;
      return num >= 1 && num <= 65355 && value === num.toString();
    },
  },
  username: {
    message: TranslationService.t('invalid_username'),
    func: (value: string) => value.length > 5,
  },
  password: {
    message: TranslationService.t('incorrect_password'),
    func: (value: string) => value.length > 5,
  },
};

class Input extends React.PureComponent<IProps, IState> {
  state = {
    value: '',
    errorMessage: '',
  };

  getValue = (): string => {
    return this.state.value;
  };

  setValue = (value: string) => {
    this.setState({value});
  };

  validate = (): boolean => {
    const {type} = this.props;
    let validate = true;

    if (type !== 'default') {
      validate = Validations[type || 'default'].func(this.state.value);
    }

    if (!validate) {
      this.setState({errorMessage: Validations[type || 'default'].message});
    } else if (this.state.errorMessage.length !== 0) {
      this.setState({errorMessage: ''});
    }

    return this.state.value.length !== 0 && validate;
  };

  onFocus = () => {
    if (this.state.errorMessage.length !== 0) {
      this.setState({errorMessage: ''});
    }
  };

  render = () => {
    const {containerStyle, type, multiline} = this.props;
    const {errorMessage, value} = this.state;

    const keyboardType =
      type === 'ip' || type === 'port' ? 'numeric' : 'default';

    return (
      <View style={containerStyle}>
        <TextInput
          style={[
            styles.container,
            multiline && styles.multiline,
            !!errorMessage && styles.errorContainer,
          ]}
          value={value}
          onChangeText={this.setValue}
          selectionColor={Colors.PRIMARY}
          onFocus={this.onFocus}
          keyboardType={keyboardType}
          secureTextEntry={type === 'password'}
          multiline={!!multiline}
          {...this.props}
        />
        {!!errorMessage && (
          <Text style={[GlobalStyles.errorText, styles.errorText]}>
            {errorMessage}
          </Text>
        )}
      </View>
    );
  };
}

export default Input;

const styles = StyleSheet.create({
  container: {
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: Colors.WHITE,
    borderColor: Colors.GRAY,
    paddingHorizontal: 15,
    fontFamily: Fonts.REGULAR,
    marginVertical: 5,
  },
  multiline: {
    height: 100,
  },
  errorContainer: {
    borderColor: Colors.DANGER,
  },
  errorText: {
    marginHorizontal: 15,
    marginVertical: 5,
  },
});
