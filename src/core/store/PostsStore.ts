import {observable, action, computed} from 'mobx';
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

  @computed
  get userPosts() {
    const {userId} = this.rootStore.userAuthStore;
    console.log(userId);
    return this.posts.filter((v) => {
      console.log(v.user_id === userId, v.user_id, userId);
      return v.user_id === userId;
    });
  }

  @action
  getList = () => {
    this.fetchingList = true;
    this.listError = false;

    const socket = this.rootStore.connectionStore.socket;

    socket.request('GET', {}, (data) => {
      if (data.data) this.posts = data.data;

      if (!(data.status && data.status === 'OK')) {
        this.listError = true;
      }

      this.fetchingList = false;
    });
  };

  @action
  createPost = async (post: Post, callback: (data: any) => void) => {
    this.fetchingPostForm = true;
    this.postFormError = false;

    const socket = this.rootStore.connectionStore.socket;
    console.log('create');
    socket.request('CREATE', post, (data) => {
      console.log('data', data);

      if (data.status && data.status === 'OK') {
        this.getList();
        callback && callback(data);
      } else {
        this.postFormError = true;
      }

      this.fetchingPostForm = false;
    });
  };

  @action
  alterPost = (post: Post, callback: (data: any) => void) => {
    this.fetchingPostForm = true;
    this.postFormError = false;

    const socket = this.rootStore.connectionStore.socket;
    console.log('create');
    socket.request('ALTER', post, (data) => {
      console.log('data', data);

      if (data.status && data.status === 'OK') {
        this.getList();
        callback && callback(data);
      } else {
        this.postFormError = true;
      }

      this.fetchingPostForm = false;
    });
  };

  @action
  removePost = (id: number, callback: (data: any) => void) => {
    const socket = this.rootStore.connectionStore.socket;
    console.log('create');
    socket.request('DELETE', {id}, (data) => {
      console.log('data', data);

      if (data.status && data.status === 'OK') {
        this.getList();
        callback && callback(data);
      } else {
        this.postFormError = true;
      }

      this.fetchingPostForm = false;
    });
  };
}

export default PostsStore;
