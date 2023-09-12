import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Header, Icon } from 'react-native-elements';

const Headers = () => {


  return (
    <Header
      containerStyle={styles.headerContainer}

      centerComponent={
        <Image
          source={{
            uri: 'https://www.freepnglogos.com/uploads/starbucks-coffe-logo-hd-image-15.png',
          }}
          style={styles.logoImage}
        />
      }
    />
  );
};

const styles = {
    headerContainer: {
        backgroundColor: '#00704A',
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'center',
        height: '10%',
      },
      logoImage: {
        width: 150,
        height: 50,
        resizeMode: 'contain',
        marginTop: -50,
      },
};

export default Headers;
