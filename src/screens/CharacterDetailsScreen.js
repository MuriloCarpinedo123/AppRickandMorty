import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function CharacterDetailsScreen({ route }) {
  const { personagem } = route.params;

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: personagem.image }} 
        style={styles.image}
      />

      <Text style={styles.name}>{personagem.name}</Text>
      <Text>Status: {personagem.status}</Text>
      <Text>Espécie: {personagem.species}</Text>
      <Text>Gênero: {personagem.gender}</Text>
      <Text>Origem: {personagem.origin.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
