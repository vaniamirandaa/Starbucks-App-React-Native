import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const Search = ({ search, handleSearch }) => {
  return (
    <TextInput
      style={styles.searchForm}
      placeholder="What do you want to eat today?"
      value={search}
      onChangeText={handleSearch}
    />
  );
};

const styles = StyleSheet.create({
  searchForm: {
    margin: 16,
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#00704A',
    backgroundColor: 'white',
    maxHeight: 90,
  },
});

export default Search;
