import {observable, action} from 'mobx';
import Socket, {SocketOptions} from '../services/SocketService';
import {RootStore} from './RootStore';

class ConnectionStore {
  rootStore: RootStore;

  @observable
  socket: Socket = new Socket({host: '192.168.0.178', port: 6666});

  @observable
  connectingToServer = false;

  @observable
  connectError = false;

  constructor(rootStore: any) {
    this.rootStore = rootStore;
  }

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

  @action
  closeSocket = () => {
    this.socket.close();
  };
}

export default ConnectionStore;
