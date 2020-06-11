import {observable, action} from 'mobx';
import {RootStore} from './RootStore';
import {Post} from '../models/Post.model';

class PostsStore {
  rootStore: RootStore;

  @observable
  posts: Post[] = [];

  @observable
  fetchingList: boolean = false;

  @observable
  fetchingPostForm: boolean = false;

  @observable
  postFormError: boolean = false;

  @observable
  listError: boolean = false;

  constructor(rootStore: any) {
    this.rootStore = rootStore;
  }

  @action
  getList = () => {
    this.fetchingList = true;
    this.listError = false;

    const socket = this.rootStore.connectionStore.socket;

    socket.request('GET', {}, (data) => {
      console.log('data', data);

      if (!(data.status && data.status === 'OK')) {
        this.listError = true;
      }

      this.fetchingList = false;
    });
  };
}

export default PostsStore;
