import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Headers from '../components/Header';
import PromoCard from '../components/PromoCard';

const data = [
  { id: '1', title: 'Promo 1: 50% off Frappuccinos', description: 'Enjoy 50% off on all Frappuccino flavors!' },
  { id: '2', title: 'Promo 2: Buy One Get One Free', description: 'Buy any handcrafted beverage and get one free!' },
  { id: '3', title: 'Promo 3: Free Pastry', description: 'Get a free pastry with the purchase of any coffee.' },
  { id: '4', title: 'Promo 4: Gift Cards Offer', description: 'Purchase a gift card worth $25 and receive an extra $5.' },
  { id: '5', title: 'Promo 5: Happy Hour', description: 'Happy Hour: 2 PM - 4 PM. 20% off on all drinks.' },
];

const PromoScreen = () => {
    return (
      <View style={styles.container}>
        <Headers />
        <Text style={styles.title}>Promotions</Text>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PromoCard item={item} />
          )} 
        />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#00704A',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      marginTop: 20,
      color: '#fff',
    },

  });
  
  export default PromoScreen;