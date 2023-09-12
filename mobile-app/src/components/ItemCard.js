import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

export default function ItemCard({ item, width }) {
  const navigation = useNavigation();
  const [isLiked, setIsLiked] = useState(false);

  const handleClick = () => {
    navigation.navigate('Detail', { item });
    console.log(navigation);

  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <TouchableOpacity onPress={handleClick}>
      <Card containerStyle={[styles.cardContainer, { width: width }]}>
        <ListItem containerStyle={styles.listItemContainer}>
          <Image style={styles.itemImage} source={{ uri: item.imgUrl }} />
          <View style={styles.detailsContainer}>
            <View style={styles.titleContainer}>
              <Card.Title style={styles.itemName}>{item.name}</Card.Title>
              <Text style={styles.itemPrice}>Rp. {item.price}</Text>
            </View>
            <TouchableOpacity onPress={handleLike} style={styles.likeIcon}>
              <MaterialIcons
                name={isLiked ? 'favorite' : 'favorite-border'}
                size={24}
                color={isLiked ? 'red' : 'black'}
              />
            </TouchableOpacity>
          </View>
        </ListItem>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: 8,
    borderRadius: 10,
  },
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 100,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 4,
    marginLeft: -10,
    textAlign: 'left',
  },
  itemPrice: {
    fontSize: 12,
    color: '#777',
    marginLeft: -10,
  },
  likeIcon: {
    position: 'absolute',
    bottom: -25,
    right: -10,
  },
});
