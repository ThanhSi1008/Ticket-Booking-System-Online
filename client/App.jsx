import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import ProfileScreen from './components/ProfileScreen';
import MoviesScreen from './components/MoviesScreen';
import MovieDetailsScreen from './components/MovieDetailsScreen';
import ProductListScreen from './components/ProductListScreen'

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'My Profile' }} />
        <Stack.Screen name="Movies" component={MoviesScreen} options={{ title: 'Movies List' }} />
        <Stack.Screen name="ProductList" component={ProductListScreen} />
        <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} options={{ title: 'Movie Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
