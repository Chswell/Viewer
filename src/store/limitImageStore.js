import {makeAutoObservable} from 'mobx';

class LimitImageStore {
  limitImage = 10;
  constructor() {
    makeAutoObservable(this);
  }

  setLimitImage(number) {
    this.limitImage = number;
  }
}

export default new LimitImageStore();
