import {makeAutoObservable} from 'mobx';

class SearchTextStore {
  searchText = '';
  constructor() {
    makeAutoObservable(this);
  }

  setSearchText(text) {
    this.searchText = text;
  }
}

export default new SearchTextStore();
