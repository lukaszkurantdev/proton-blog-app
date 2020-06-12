import TcpSocket from 'react-native-tcp-socket';
import TcpSocketType from 'react-native-tcp-socket/lib/types/TcpSocket';

type ActionsType =
  | 'LOGIN'
  | 'REGISTER'
  | 'LOGOUT'
  | 'GET'
  | 'CREATE'
  | 'ALTER'
  | 'DELETE';

export const Actions: {[key in ActionsType]: string} = {
  LOGIN: 'login',
  REGISTER: 'register',
  LOGOUT: 'logout',
  GET: 'get',
  CREATE: 'create',
  ALTER: 'alter',
  DELETE: 'delete',
};

export interface SocketOptions {
  host: string;
  port: number;
}

class Socket {
  connected: boolean = false;
  client: TcpSocketType | undefined;
  data: string = '';

  constructor(
    options: SocketOptions,
    callbackOnConnect?: () => void,
    onError?: () => void,
  ) {
    this.connected = false;
    this.connect(options, callbackOnConnect, onError);
  }

  connect = (
    opts: SocketOptions,
    callback?: () => void,
    onError?: () => void,
  ) => {
    try {
      this.client = TcpSocket.createConnection(
        {
          host: opts.host,
          port: opts.port,
          tls: true,
          tlsCheckValidity: true,
          tlsCert: require('../../../server.pem'),
        },
        () => {
          this.connected = true;
          callback && callback();
        },
      );

      this.client.on('close', () => {
        this.close();
        this.connected = false;
      });

      this.client.on('error', (error) => {
        console.log(error);
        this.close();
        onError && onError();
        this.connected = false;
      });

      this.client?.on('data', (part) => {
        this.data += part.toString('utf8');
      });

      return true;
    } catch (error) {
      this.connected = false;
      onError && onError();
      return false;
    }
  };

  asynchCheck = (resolve: any, reject: any) => {
    if (
      this.data[this.data.length - 2] === '\r' &&
      this.data[this.data.length - 1] === '\n'
    ) {
      const parsedData = JSON.parse(
        this.data.substring(0, this.data.length - 2),
      );
      this.data = '';
      resolve(parsedData);
    } else {
      setTimeout(() => this.asynchCheck(resolve, reject), 50);
    }
  };

  request = async (
    action: ActionsType,
    params: Object,
    callback: (data: any) => void,
  ) => {
    try {
      const request = {action: Actions[action], params};
      const strigifiedJSON = JSON.stringify(request);

      this.client && this.client.write(strigifiedJSON + '\r\n');

      const data = new Promise(this.asynchCheck);
      callback(await data);
    } catch (error) {
      callback({error: 'ConnectionError'});
    }
  };

  close = () => {
    this.client && this.client.destroy();
  };
}

export default Socket;
