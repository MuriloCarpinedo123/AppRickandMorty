import React, { useState, useEffect } from 'react';
import {
  Alert,
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator
} from 'react-native';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://rickandmortyapi.com/api/character',
});

export default function CharactersListScreen({ navigation }) {
  const [personagens, setPersonagens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [busca, setBusca] = useState("");

  async function buscarTodos() {
    try {
      setLoading(true);
      const resposta = await api.get('/');
      setPersonagens(resposta.data.results);
    } catch {
      Alert.alert("Erro", "Não foi possível carregar os personagens.");
    } finally {
      setLoading(false);
    }
  }

  async function buscarPorNome(nome) {
    if (nome.trim() === "") {
      buscarTodos();
      return;
    }

    try {
      setLoading(true);
      const resposta = await api.get(`/?name=${nome}`);
      setPersonagens(resposta.data.results);
    } catch {
      setPersonagens([]); 
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    buscarTodos();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      buscarPorNome(busca);
    }, 500); // debounce

    return () => clearTimeout(delay);
  }, [busca]);

  return (
    <ScrollView style={styles.container}>

      <TextInput
        style={styles.input}
        placeholder="Buscar personagem..."
        value={busca}
        onChangeText={setBusca}
      />

      {loading && <ActivityIndicator size="large" color="blue" />}

      {personagens.map((p) => (
        <TouchableOpacity
          key={p.id}
          style={styles.card}
          onPress={() =>
            navigation.navigate("CharacterDetails", { personagem: p })
          }
        >
          <Image source={{ uri: p.image }} style={styles.image} />
          <Text style={styles.name}>{p.name}</Text>
          <Text style={styles.info}>Status: {p.status}</Text>
          <Text style={styles.info}>Espécie: {p.species}</Text>
        </TouchableOpacity>
      ))}

      {!loading && personagens.length === 0 && (
        <Text style={styles.nothing}>Nenhum personagem encontrado.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f2f2f2",
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  card: {
    marginBottom: 20,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    elevation: 3,
    alignItems: "center",
  },
  image: {
    width: 120,
    height: 120,
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
  nothing: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#555",
  },
});
