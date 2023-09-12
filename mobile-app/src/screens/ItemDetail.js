import React from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import Headers from '../components/Header';
import { useNavigation } from '@react-navigation/native';

const GET_ITEM = gql`
  query GetItem($getItemId: ID!) {
    getItem(id: $getItemId) {
      id
      name
      description
      price
      User {
        username
      }
      imgUrl
      Category {
        name
      }
      Ingredients {
        name
      }
    }
  }
`;

export default function ItemDetail({ route }) {
  const { item } = route.params;

  const navigation = useNavigation();

  const { loading, error, data } = useQuery(GET_ITEM, {
    variables: { getItemId: item.id }
  });

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

  const fetchedItem = data.getItem;
  const user = fetchedItem.User;

  return (
    <View style={styles.container}>
      <Headers />
      <View style={styles.contentContainer}>
        <Image style={styles.itemImage} source={{ uri: fetchedItem.imgUrl }} />
        <Text style={styles.itemName}>{fetchedItem.name}</Text>
        <Text style={styles.itemPrice}>Rp. {fetchedItem.price}</Text>
        <Text style={styles.itemDescription}>{fetchedItem.description}</Text>
        <Text style={{ marginTop: 5 }}>Category: {fetchedItem.Category.name}</Text>
        <Text style={{ marginTop: 5 }}>Made with:</Text>
        <View style={styles.ingredientsList}>
          {fetchedItem.Ingredients.map((ingredient, index) => (
            <Text key={index}>- {ingredient.name}</Text>
            ))}
        </View>
          {user && <Text style={{ marginTop: 20 }}>Posted by: {user.username}</Text>}
        <TouchableOpacity style={styles.checkPromoButton} onPress={() => navigation.navigate('Promo')}>
          <Text style={styles.buttonText}>Check Promo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'left',
    paddingHorizontal: 20,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemImage: {
    marginTop: 20,
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginBottom: 16,    
  },
  itemName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'left',
  },
  itemPrice: {
    fontSize: 18,
    color: '#777',
    marginBottom: 8,
  },
  itemDescription: {
    fontSize: 16,
  },
  checkPromoButton: {
    backgroundColor: '#006241',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
