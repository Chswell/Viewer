import React from 'react';
import {Navigation} from './src/screens/Navigation';
import {Appearance} from 'react-native';
import ThemeStore from './src/store/themeStore';
import {observer} from 'mobx-react-lite';

const App = observer((): JSX.Element => {
  Appearance.addChangeListener(scheme => {
    ThemeStore.setTheme(scheme.colorScheme);
  });
  return <Navigation />;
});

export default App;
