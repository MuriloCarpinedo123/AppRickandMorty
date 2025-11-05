import { Button, Text, View } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Bem-vindo!</Text>
      <Button
        title="Ver personagens"
        onPress={() => navigation.navigate("Characters")}
      />
    </View>
  );
}
