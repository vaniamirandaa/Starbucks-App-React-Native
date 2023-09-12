import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground, TouchableHighlight } from 'react-native';

const LandingScreen = () => {
  const navigation = useNavigation();
  const handleNavigate = () => {
    navigation.navigate('Home');
    console.log(navigation);
  };
  const handleToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <ImageBackground
      source={{ uri: 'https://www.starbucks.pt/sites/starbucks-pt/files/styles/c01_vertical_card_724x1009/public/2023-05/CARD-LOGO.png.webp?itok=cReoObVf' }}
      style={styles.container}
    >
    <View>
    <View>
        <Text style={[styles.welcomeText]}>Welcome to Starbucks</Text>
        <TouchableHighlight
            style={styles.buttonBg}
            onPress={handleNavigate}
            >
            <Text style={styles.text}>Explore Menu</Text>
        </TouchableHighlight>
        <TouchableHighlight
            style={styles.buttonBg}
            onPress={handleToLogin}
            >
            <Text style={styles.text}>Login</Text>
        </TouchableHighlight>
    </View>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonBg: {
      marginTop: 20,
      backgroundColor: 'yellow',
      borderRadius: 20,
      padding: 10,
      paddingHorizontal: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    welcomeText: {
        marginTop: 180,
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
      },
  });
export default LandingScreen;
