// PostDetails.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const PostDetails = () => {
  const fakePost = {
    title: 'Lorem Ipsum',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  };

  return (
    <View style={styles.postDetailsContainer}>
      <Image style={styles.postImageDetails} source={{ uri: 'https://picsum.photos/400/600' }} />
      <Text style={styles.postTitleDetails}>{fakePost.title}</Text>
      <Text style={styles.postBodyDetails}>{fakePost.body}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  postDetailsContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    alignItems: 'center',
  },
  postImageDetails: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  postTitleDetails: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  postBodyDetails: {
    fontSize: 16,
    marginTop: 8,
  },
});

export default PostDetails;
