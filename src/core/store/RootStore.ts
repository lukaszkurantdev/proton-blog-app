import ConnectionStore from './ConnectionStore';

export class RootStore {
  connectionStore: ConnectionStore;

  constructor() {
    this.connectionStore = new ConnectionStore(this);
  }
}

export default new RootStore();
