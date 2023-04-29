import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import 'react-native-gesture-handler';

import Header from './components/Header';
import SwiperComponent from './components/SwiperComponent';

import CategoryScreen from './components/screens/CategoryScreen';
import ProfileScreen from './components/screens/ProfileScreen';
import CartScreen from './components/screens/CartScreen';

const Tab = createBottomTabNavigator();

const HomeScreen = () => (
  <View style={styles.container}>
    <Header />
    <SwiperComponent />
  </View>
);

const App = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
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
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
          
            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Category') {
              iconName = 'grid';
            } else if (route.name === 'Profile') {
              iconName = 'user';
            } else if (route.name === 'Cart') {
              iconName = 'shopping-cart';
            }
          
            const iconColor = focused ? '#4298e7' : color;
          
            return <Icon name={iconName} size={size} color={iconColor} />;
          },
          
          tabBarLabel: ({ focused, color }) => {
            if (focused) {
              return (
                <Text
                  style={{
                    fontSize: 12,
                    marginBottom: 5,
                    color,
                  }}
                >
                  {route.name}
                </Text>
              );
            } else {
              return null;
            }
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            height: 60,
            paddingBottom: 5,
            paddingHorizontal: 15,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
          tabBarShowLabel: false,
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen name="Category" component={CategoryScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Cart" component={CartScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
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
