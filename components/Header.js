import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color="#b8c2cd" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Пошук"
          placeholderTextColor="#b8c2cd"
        />
      </View>
      <TouchableOpacity style={styles.favoriteButton}>
        <Feather name="heart" size={24} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.cartButton}>
        <Feather name="shopping-bag" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingVertical: 5,
  },
  searchContainer: {
    flex: 0.85,
    backgroundColor: '#fff',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    position: 'absolute',
    left: 15,
    zIndex: 1,
  },
  searchInput: {
    flex: 1,
    paddingLeft: 40,
    paddingRight: 10,
    fontSize: 16,
  },
  favoriteButton: {
    marginLeft: 10,
  },
  cartButton: {
    marginLeft: 10,
  },
});

export default Header;
