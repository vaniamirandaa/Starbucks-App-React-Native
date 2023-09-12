import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home'
import ItemDetail from '../screens/ItemDetail';
import LandingScreen from '../screens/LandingScreen';
import LoginScreen from '../screens/LoginScreen';
import PromoScreen from '../screens/PromoScreen';

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <Stack.Navigator initialRouteName="Landing">
      <Stack.Screen name="Landing" component={LandingScreen}/>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Detail" component={ItemDetail} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Promo" component={PromoScreen} />


    </Stack.Navigator>
  );
}
