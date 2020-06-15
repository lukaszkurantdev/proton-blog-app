import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {observer, inject, Observer} from 'mobx-react';
import LinearGradient from 'react-native-linear-gradient';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
//components
import Button from '../components/Button';
import Input from '../components/Input';
import ProtonIcon from '../components/ProtonIcon';
import Loader from '../components/Loader';
//styles
import Colors from '../styles/Colors';
import GlobalStyles from '../styles/GlobalStyles';
//services
import TranslationService from '../core/services/TranslationService';
import {SocketOptions} from '../core/services/SocketService';
//stores
import RootStore from '../core/store/RootStore';

interface IProps {
  store: RootStore;
  navigation: any;
}

@inject('store')
@observer
class StartPage extends React.Component<IProps> {
  ipAddressInputRef = React.createRef<Input>();
  portInputRef = React.createRef<Input>();

  constructor(props: IProps) {
    super(props);
  }

  connectToServer = (
    options: SocketOptions = {host: '51.38.191.101', port: 6666},
  ) => {
    console.log(options);
    this.props.store.connectionStore.setSocket(options, this.onConnect);
  };

  connectToCustomServer = () => {
    const ipRef = this.ipAddressInputRef.current;
    const portRef = this.portInputRef.current;

    if (ipRef && portRef) {
      const validations = [ipRef.validate(), portRef.validate()];

      if (validations.findIndex((v) => !v) === -1) {
        const host = ipRef.getValue();
        const port = parseInt(portRef.getValue());

        this.connectToServer({host, port});
      }
    }
  };

  onConnect = () => {
    this.props.navigation.navigate('Login');
  };

  render() {
    const {connectingToServer, connectError} = this.props.store.connectionStore;

    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
        <LinearGradient
          colors={[Colors.PRIMARY, Colors.SECONDARY]}
          start={{x: -1, y: -1}}
          end={{x: 1, y: 1}}
          style={styles.topContainer}>
          <ProtonIcon type="secondary" />
        </LinearGradient>

        <View style={styles.bottomContainer}>
          <Text style={[GlobalStyles.mainHeader, styles.centered]}>
            {TranslationService.t('app_name')}
          </Text>

          <Text style={[GlobalStyles.mainHeaderDescription, styles.centered]}>
            {TranslationService.t('app_slug')}
          </Text>

          {connectError && (
            <Text
              style={[
                GlobalStyles.errorText,
                styles.centered,
                styles.errorText,
              ]}>
              {TranslationService.t('connection_error')}
            </Text>
          )}

          <Button
            title={TranslationService.t('default_server_conn')}
            onPress={() => this.connectToServer()}
            loading={connectingToServer}
          />

          <View style={GlobalStyles.separator} />

          <Text
            style={[
              GlobalStyles.mainHeaderDescription,
              styles.centered,
              styles.description,
            ]}>
            {TranslationService.t('write_manual')}
          </Text>

          <Input
            ref={this.ipAddressInputRef}
            type="ip"
            placeholder={TranslationService.t('ip_address')}
          />

          <Input
            ref={this.portInputRef}
            type="port"
            placeholder={TranslationService.t('port')}
          />

          <Button
            title={TranslationService.t('connect')}
            type="secondary"
            onPress={this.connectToCustomServer}
            loading={connectingToServer}
          />
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default StartPage;

const styles = StyleSheet.create({
  topContainer: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },
  bottomContainer: {
    flex: 1,
    top: -20,
    backgroundColor: Colors.BACKGROUND,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 30,
  },
  centered: {
    textAlign: 'center',
  },
  buttonMargins: {
    marginVertical: 15,
  },
  description: {
    marginTop: 10,
    marginBottom: 30,
  },
  errorText: {
    marginTop: 20,
  },
});
