import ConnectionStore from './ConnectionStore';
import UserAuthStore from './UserAuthStore';
import PostsStore from './PostsStore';

export class RootStore {
  connectionStore: ConnectionStore;
  userAuthStore: UserAuthStore;
  postsStore: PostsStore;

  constructor() {
    this.connectionStore = new ConnectionStore(this);
    this.userAuthStore = new UserAuthStore(this);
    this.postsStore = new PostsStore(this);
  }
}

export default RootStore;
