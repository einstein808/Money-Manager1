// PostDetailsStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PostDetails from '../postDetails';

const Stack = createNativeStackNavigator();

const PostDetailsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PostDetails" component={PostDetails} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default PostDetailsStack;
