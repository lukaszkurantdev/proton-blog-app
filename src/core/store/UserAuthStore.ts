import {observable, action} from 'mobx';
import {RootStore} from './RootStore';

class UserAuthStore {
  rootStore: RootStore;

  @observable
  registeredPrompt = false;

  @observable
  fetchingRegistration = false;

  @observable
  fetchingLogging = false;

  @observable
  loginError = false;

  @observable
  registrationError = false;

  constructor(rootStore: any) {
    this.rootStore = rootStore;
  }

  @action
  hideRegisteredPrompt = () => {
    this.registeredPrompt = false;
  };

  @action
  login = async (username: string, password: string, callback?: () => void) => {
    this.loginError = false;
    this.fetchingLogging = true;

    const socket = this.rootStore.connectionStore.socket;

    socket.request('LOGIN', {username, password}, (data) => {
      console.log('data', data);

      if (data.status && data.status === 'OK') {
        callback && callback();
      } else {
        this.loginError = true;
      }
      this.fetchingLogging = false;
    });
  };

  @action
  register = (username: string, password: string, callback?: () => void) => {
    this.registrationError = false;
    this.fetchingRegistration = true;

    const socket = this.rootStore.connectionStore.socket;

    socket.request('REGISTER', {username, password}, (data) => {
      console.log('data', data);

      if (data.status && data.status === 'OK') {
        this.registeredPrompt = true;
        callback && callback();
      } else {
        this.registrationError = true;
      }
      this.fetchingRegistration = false;
    });
  };
}

export default UserAuthStore;
