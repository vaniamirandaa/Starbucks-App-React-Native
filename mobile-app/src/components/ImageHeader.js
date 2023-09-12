import React from 'react';
import { View, Image, ScrollView, StyleSheet } from 'react-native';

const images = [
    'https://craftedforhome.com/img/socialsharing/fb-share-home.png',
    'https://dis-prod.assetful.loblaw.ca/content/dam/loblaw-companies-limited/creative-assets/grocery/2022/loblaw-media/pcx/wk32/cs-9922_starbucks-core/wk32_all_hub-banner_starbucks_b3_en.jpg',
    'https://images.summitmedia-digital.com/sap/images/2021/10/05/starbucks-preview-mainimage-1633415869.jpg',
  ];

const ImageHeader = () => {
  return (
    <View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {images.map((imageUrl, index) => (
          <Image key={index} style={styles.bannerImage} source={{ uri: imageUrl }} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  bannerImage: {
    width: 250,
    height: 150,
    marginRight: 8,
    borderRadius: 8,
    marginTop: 10,
  },
});

export default ImageHeader;
