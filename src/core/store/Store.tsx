import {decorate, observable, action} from 'mobx';

class Store {
  @observable
  test = '';
}

export default new Store();
