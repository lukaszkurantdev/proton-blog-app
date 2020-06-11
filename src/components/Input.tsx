import React from 'react';
import {TextInput, StyleSheet, View, Text} from 'react-native';
import IpRegex from 'ip-regex';
//styles
import Colors from '../styles/Colors';
import GlobalStyles from '../styles/GlobalStyles';
import Fonts from '../styles/Fonts';

type InputType = 'default' | 'ip' | 'port' | 'email' | 'password';

interface IProps {
  placeholder?: string;
  containerStyle?: Object;
  type?: InputType;
}

interface IState {
  value: string;
  errorMessage: string | null;
}

const Validations: {
  [key in InputType]: {message: string; func: (value: string) => boolean};
} = {
  default: {
    message: 'Pole nie może być puste!',
    func: (value: string) => !!value,
  },
  ip: {
    message: 'Niepoprawny adres IP',
    func: (value: string) => IpRegex({exact: true}).test(value),
  },
  port: {
    message: 'Niepoprawny numer portu',
    func: (value: string) => {
      var num = +value;
      return num >= 1 && num <= 65355 && value === num.toString();
    },
  },
  email: {
    message: 'Pole nie może być puste!',
    func: (value: string) => IpRegex({exact: true}).test(value),
  },
  password: {
    message: 'Pole nie może być puste!',
    func: (value: string) => IpRegex({exact: true}).test(value),
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
    const {containerStyle, type} = this.props;
    const {errorMessage, value} = this.state;

    const keyboardType =
      type === 'ip' || type === 'port' ? 'numeric' : 'default';

    return (
      <View style={containerStyle}>
        <TextInput
          style={[styles.container, !!errorMessage && styles.errorContainer]}
          value={value}
          onChangeText={this.setValue}
          selectionColor={Colors.PRIMARY}
          onFocus={this.onFocus}
          keyboardType={keyboardType}
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
  errorContainer: {
    borderColor: Colors.DANGER,
  },
  errorText: {
    marginHorizontal: 15,
    marginVertical: 5,
  },
});
