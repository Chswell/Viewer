import {makeAutoObservable} from 'mobx';

class Counter {
  numColumn = false;
  constructor() {
    makeAutoObservable(this);
  }

  setNumColumn() {
    this.numColumn = !this.numColumn;
  }
}

export default new Counter();
