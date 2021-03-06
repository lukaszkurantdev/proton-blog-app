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

  @observable
  userId: number = 0;

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
        console.log('id usera', data.data[0].user_id);
        this.userId = data.data[0].user_id;
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

  @action
  logout = (callback?: () => void) => {
    const socket = this.rootStore.connectionStore.socket;

    socket.request('LOGOUT', {}, (data) => {
      console.log('data', data);

      if (data.status && data.status === 'OK') {
        this.registeredPrompt = true;
        callback && callback();
      }
    });
  };
}

export default UserAuthStore;
