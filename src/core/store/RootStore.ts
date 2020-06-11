import ConnectionStore from './ConnectionStore';
import UserAuthStore from './UserAuthStore';

export class RootStore {
  connectionStore: ConnectionStore;
  userAuthStore: UserAuthStore;

  constructor() {
    this.connectionStore = new ConnectionStore(this);
    this.userAuthStore = new UserAuthStore(this);
  }
}

export default RootStore;
