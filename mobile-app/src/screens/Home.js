import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  ActivityIndicator,
} from 'react-native';
Headers
import ItemCard from '../components/ItemCard';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import Search from '../components/Search';
import Headers from '../components/Header';
import ImageHeader from '../components/ImageHeader';

const GET_ITEMS = gql`
  query GetItems {
    getItems {
      id
      name
      imgUrl
      price
    }
  }
`;

export default function Home() {
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState(null);

  const { loading, error, data } = useQuery(GET_ITEMS);

  const handleSearch = (text) => {
    setSearch(text);
    setTags(null);
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#00704A" />
      </View>
    );
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  const items = data.getItems;

  const filteredItems = items.filter(
    (item) => item.name.toLowerCase().includes(search.toLowerCase())
  );


  return (
    <View style={styles.container}>
      <Headers />
      <ImageHeader /> 
      <Search search={search} handleSearch={handleSearch} />

      <View style={styles.contentContainer}>
      <FlatList
        style={styles.itemList}
        data={filteredItems}
        renderItem={({ item }) => <ItemCard item={item} />}
        keyExtractor={(item) => item.id.toString()}
      />

      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  itemList: {
    flexGrow: 1,
    marginTop: 16,
    backgroundColor: '#00704A',
  },
  
});
