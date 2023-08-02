import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PinList from './components/PinList';

function App(): JSX.Element {
  return (
    <>
      <SafeAreaView style={styles.bgHeader}>
        <StatusBar />
        <ScrollView>
          <View>
            <Text style={styles.titleHeader}>Viewer</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
      <ScrollView style={styles.bgContent}>
        <View>
          <PinList />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  titleHeader: {
    color: '#61c9d2',
    fontSize: 30,
  },
  bgHeader: {
    backgroundColor: '#3F91F2',
    padding: 10,
  },
  bgContent: {
    backgroundColor: '#dcddfa',
    padding: 10,
  },
});

export default App;
