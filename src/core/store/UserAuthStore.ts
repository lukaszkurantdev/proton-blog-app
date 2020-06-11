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
  login = (username: string, password: string, callback?: () => void) => {
    this.loginError = false;
    this.fetchingLogging = true;

    const socket = this.rootStore.connectionStore.socket;

    socket.send('LOGIN', {username, password});
    const data = socket.get();

    console.log('data', data);

    if (data.error || data.status === 'ERROR') {
      this.loginError = true;
      this.fetchingLogging = false;
    } else {
      callback && callback();
    }
  };

  @action
  register = (username: string, password: string, callback?: () => void) => {
    this.registrationError = false;
    this.fetchingRegistration = true;

    const socket = this.rootStore.connectionStore.socket;

    console.log({username, password});
    socket.send('REGISTER', {username, password});
    const data = socket.get();

    console.log('data', data);

    if (data.error || data.status === 'ERROR') {
      this.registrationError = true;
      this.fetchingRegistration = false;
    } else {
      this.registeredPrompt = true;
      callback && callback();
    }
  };
}

export default UserAuthStore;
