import {makeAutoObservable} from 'mobx';

class ToggleColStore {
  toggleColumn = false;
  constructor() {
    makeAutoObservable(this);
  }

  setToggleColumn() {
    this.toggleColumn = !this.toggleColumn;
  }
}

export default new ToggleColStore();
