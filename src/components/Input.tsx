import React from 'react';
import {TextInput, StyleSheet, View, Text} from 'react-native';
//styles
import Colors from '../styles/Colors';

interface IProps {
  placeholder?: string;
  containerStyle?: Object;
}

interface IState {
  value: string;
  errorMessage: string | null;
}

class Input extends React.PureComponent<IProps, IState> {
  state = {
    value: '',
    errorMessage: null,
  };

  getValue = (): string => {
    return this.state.value;
  };

  setValue = (value: string) => {
    this.setState({value});
  };

  validate = (): boolean => {
    return this.state.value.length !== 0;
  };

  render = () => {
    const {containerStyle} = this.props;
    const {errorMessage, value} = this.state;

    return (
      <View style={containerStyle}>
        <TextInput
          style={[styles.container, errorMessage && styles.errorContainer]}
          value={value}
          onChangeText={this.setValue}
          selectionColor={Colors.PRIMARY}
          {...this.props}
        />
        {errorMessage && <Text style={[styles.errorText]}>Wystąpił błąd</Text>}
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
  },
  errorContainer: {
    borderColor: Colors.PRIMARY,
  },
  errorText: {
    marginHorizontal: 15,
    marginVertical: 5,
  },
});
