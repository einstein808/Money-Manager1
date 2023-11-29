// Home.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch posts from JSONPlaceholder API
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  const handleImagePress = () => {
    // Navigate to the home screen
    navigation.navigate('PostDetails');
  };

  const renderPostItem = ({ item }) => (
    <TouchableOpacity onPress={handleImagePress} style={styles.postContainer}>
      {/* Circular Image */}
      <View style={styles.circularImageContainer}>
        <Image
          style={styles.circularImage}
          source={{ uri: `https://picsum.photos/200/200?random=${item.id}` }}
        />
      </View>
      <Text style={styles.postTitle}>{item.title.slice(0, 12)}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Ultimas dicas financeiras</Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPostItem}
        horizontal={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    marginTop: 0,
    height: 200,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  postContainer: {
    marginRight: 16,
    alignItems: 'center',
    height: 40,
  },
  circularImageContainer: {
    borderRadius: 50,
    overflow: 'hidden',
  },
  circularImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: 'cover',
  },
  postTitle: {
    fontSize: 14,
    marginTop: 8,
  },
});

export default Home;
