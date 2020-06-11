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

      return true;
    } catch (error) {
      this.connected = false;
      onError && onError();
      return false;
    }
  };

  request = (
    action: ActionsType,
    params: Object,
    callback: (data: any) => void,
  ) => {
    try {
      const request = {action: Actions[action], params};
      console.log(request);
      const strigifiedJSON = JSON.stringify(request);

      let data = '';

      const listener = this.client?.on('data', (part) => {
        console.log('part', part);
        data += part.toString('utf8');

        if (data.includes('\r\n')) {
          const parsedData = JSON.parse(data.substring(0, data.length - 2));
          data = '';
          callback(parsedData);
          listener?.remove();
        }
      });

      this.client && this.client.write(strigifiedJSON + '\r\n');
    } catch (error) {
      callback({error: 'ConnectionError'});
    }
  };

  close = () => {
    this.client && this.client.destroy();
  };
}

export default Socket;
