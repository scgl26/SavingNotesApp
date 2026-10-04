import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import CategoryButton from "../components/CategoryButton";

export default function Index() {
  const openCategory = (type: string) => {
    router.push({
      pathname: "/category/[type]",
      params: {
        type: type,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📚 Not Defterim</Text>

      <Text style={styles.question}>Neyi kaydetmek istiyorsun?</Text>

      <CategoryButton
        title="Kitap"
        icon="📖"
        onPress={() => openCategory("book")}
      />

      <CategoryButton
        title="Film"
        icon="🎬"
        onPress={() => openCategory("movie")}
      />

      <CategoryButton
        title="Şarkı"
        icon="🎵"
        onPress={() => openCategory("song")}
      />

      <CategoryButton
        title="Sanatçı"
        icon="🎤"
        onPress={() => openCategory("artist")}
      />

      <CategoryButton
        title="Dizi"
        icon="📺"
        onPress={() => openCategory("series")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
  },

  question: {
    fontSize: 20,
    marginBottom: 20,
  },
});
