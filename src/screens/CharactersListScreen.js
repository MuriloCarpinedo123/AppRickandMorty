import React, { useState } from 'react';
import { Alert, View, ScrollView, Text, Image, Button, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://rickandmortyapi.com/api/character',
});

export default function App() {
  const [personagens, setPersonagens] = useState([]);
  const [loading, setLoading] = useState(false);

  async function buscarPersonagens() {
    try {
      setLoading(true);

      const resposta = await api.get('/');

      setPersonagens(resposta.data.results);

    } catch (erro) {
      Alert.alert('Erro', 'Não foi possível carregar os personagens');
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView style={styles.container}>

      <Button title="Buscar personagens" onPress={buscarPersonagens} />

      {loading && (
        <ActivityIndicator size="large" color="blue" />
      )}

      {personagens.map((p) => (
        <View key={p.id} style={styles.card}>
          <Image
            source={{ uri: p.image }}
            style={styles.image}
          />
          <Text style={styles.name}>{p.name}</Text>
          <Text style={styles.info}>Status: {p.status}</Text>
          <Text style={styles.info}>Espécie: {p.species}</Text>
        </View>
      ))}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f2f2f2",
  },
  card: {
    marginBottom: 20,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    elevation: 3, // sombra no android
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  info: {
    fontSize: 14,
    color: "#444",
  },
});
