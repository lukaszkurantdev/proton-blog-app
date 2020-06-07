import TcpSocket from 'react-native-tcp-socket';
import TcpSocketType from 'react-native-tcp-socket/lib/types/TcpSocket';

type ActionsType = 'LOGIN';

export const Actions: {[key in ActionsType]: string} = {
  LOGIN: 'login',
};

interface SocketOptions {
  host: string;
  port: number;
}

class Socket {
  connected: boolean = false;
  client: TcpSocketType | undefined;

  constructor(options: SocketOptions) {
    this.connected = false;
    this.connect(options);
  }

  connect = (options: SocketOptions) => {
    try {
      this.client = TcpSocket.createConnection(
        {
          host: options.host,
          port: options.port,
          tls: true,
          tlsCheckValidity: true,
          tlsCert: require('../../server.pem'),
        },
        () => {
          this.connected = true;
        },
      );

      this.client.on('close', () => {
        this.close();
        this.connected = false;
      });

      this.client.on('error', (error) => {
        console.log(error);
        this.close();
        this.connected = false;
      });

      return true;
    } catch (error) {
      this.connected = false;
      return false;
    }
  };

  get = () => {
    try {
      let data = '';

      while (data.includes('\r\n')) {
        this.client &&
          this.client.on('data', (part) => {
            data += part.toString('utf8');
          });
      }

      data = JSON.parse(data.substring(0, data.length - 2));

      return data;
    } catch (error) {
      return {error: 'ConnectionError'};
    }
  };

  send = (action: ActionsType, params: Object) => {
    try {
      const request = {action, params};
      const strigifiedJSON = JSON.stringify(request);

      this.client && this.client.write(strigifiedJSON + '\r\n');
    } catch (error) {
      return {error: 'ConnectionError'};
    }
  };

  close = () => {
    this.client && this.client.destroy();
  };
}

export default Socket;
