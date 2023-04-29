import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Header from './components/Header';
import SwiperComponent from './components/SwiperComponent';



const App = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (!isConnected) {
    return (
      <View style={styles.noInternetContainer}>
        <Text>Oops, I guess you're not connected to the Internet</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      <SwiperComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10, // отступы по горизонтали
    paddingVertical: 10, // отступы по вертикали
  },
  noInternetContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
});

export default App;
