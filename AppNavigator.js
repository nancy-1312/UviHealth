import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import Post from './src/screens/Post';

const Stack = createNativeStackNavigator();

function AppStack() {
  return (
      <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown: false,gestureEnabled: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Post" component={Post} />
      </Stack.Navigator>
  );
}

export {AppStack};