import {decorate, observable, action, computed, autorun} from 'mobx';
import Socket, {SocketOptions} from '../services/SocketService';

class Store {
  @observable
  socket: Socket = new Socket({host: '192.168.0.178', port: 6666});

  @observable
  connectingToServer = false;

  @observable
  connectError = false;

  @action
  setSocket = (options: SocketOptions, callback?: () => void) => {
    this.connectingToServer = true;

    const cback = () => {
      this.connectingToServer = false;
      callback && callback();
    };

    const onError = () => {
      this.connectingToServer = false;
      this.connectError = true;
    };

    this.socket = new Socket(options, cback, onError);
  };
}

export default new Store();
