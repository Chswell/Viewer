import {makeAutoObservable} from 'mobx';

class NumColStore {
  numColumn = false;
  constructor() {
    makeAutoObservable(this);
  }

  setNumColumn() {
    this.numColumn = !this.numColumn;
  }
}

export default new NumColStore();
