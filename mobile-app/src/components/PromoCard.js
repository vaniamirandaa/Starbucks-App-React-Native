import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PromoCard = ({ item }) => {
  return (
    <View style={styles.promoItem}>
      <View style={styles.voucherContainer}>
        <Text style={styles.voucherTitle}>{item.title}</Text>
        <Text style={styles.voucherDescription}>{item.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  promoItem: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  voucherContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  voucherTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#006241',
    marginBottom: 10,
  },
  voucherDescription: {
    fontSize: 16,
    color: '#333',
  },
});

export default PromoCard;
