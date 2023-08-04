import {makeAutoObservable} from 'mobx';
import {Appearance} from 'react-native';

class ThemeStore {
  theme = Appearance.getColorScheme();
  constructor() {
    makeAutoObservable(this);
  }

  setTheme(theme) {
    this.theme = theme;
  }
}

export default new ThemeStore();
