// TabMenu.js
import React, { useRef } from 'react';
import {
  Animated,
  TouchableWithoutFeedback,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const TabMenu = ({ tabs, activeTabIndex, onTabPress }) => {
  const animation = useRef(new Animated.Value(0)).current;

  const animateTab = (index) => {
    Animated.timing(animation, {
      toValue: index,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.tabContainer}>
      <Animated.View
        style={[
          styles.tabOverlay,
          {
            transform: [
              {
                translateX: animation.interpolate({
                  inputRange: [0, tabs.length - 1],
                  outputRange: [0, 100 * (tabs.length - 1)],
                }),
              },
            ],
          },
        ]}
      />
      {tabs.map((tab, index) => (
        <TouchableWithoutFeedback
          key={index}
          onPress={() => {
            onTabPress(index);
            animateTab(index);
          }}
        >
          <View style={styles.tabItem}>
            <Icon
              name={tab.icon}
              size={24}
              color={activeTabIndex === index ? '#4298e7' : 'gray'}
              style={styles.tabIcon}
            />
            {activeTabIndex === index && (
              <Text style={styles.tabText}>{tab.text}</Text>
            )}
          </View>
        </TouchableWithoutFeedback>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#e4f2ff',
    height: 60,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 15,
    paddingBottom: 5,
  },
  tabOverlay: {
    position: 'absolute',
    height: '100%',
    width: 100,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#fff',
  },
  tabItem: {
    alignItems: 'center',
    width: 100,
  },
  tabIcon: {
    marginBottom: 5,
  },
  tabText: {
    fontSize: 16,
  },
});

export default TabMenu;
