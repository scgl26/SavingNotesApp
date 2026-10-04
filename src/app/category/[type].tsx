import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
    Alert,
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

import MediaForm from "../../components/MediaForm";
import MediaItem from "../../components/MediaItem";
import { Media } from "../../types/Media";

export default function CategoryPage() {
  const { type } = useLocalSearchParams();

  const [items, setItems] = useState<Media[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const categoryNames: Record<string, string> = {
    book: "Kitaplar",
    movie: "Filmler",
    song: "Şarkılar",
    artist: "Sanatçılar",
    series: "Diziler",
  };

  const categoryTitle = categoryNames[type as string] ?? "Kayıtlar";

  // Bu kategoriye özel storage anahtarı
  const storageKey = `media_${type}`;

  // Kategori açıldığında kayıtları telefondan getir
  useEffect(() => {
    loadItems();
  }, [type]);

  const loadItems = async () => {
    try {
      const savedItems = await AsyncStorage.getItem(storageKey);

      if (savedItems) {
        setItems(JSON.parse(savedItems));
      }
    } catch (error) {
      console.log("Kayıtlar yüklenemedi:", error);
    }
  };

  // Listeyi telefona kaydet
  const saveItems = async (newItems: Media[]) => {
    try {
      await AsyncStorage.setItem(storageKey, JSON.stringify(newItems));

      setItems(newItems);
    } catch (error) {
      console.log("Kayıtlar kaydedilemedi:", error);
    }
  };

  const addItem = () => {
    if (!name.trim()) {
      Alert.alert("Uyarı", "Lütfen bir isim gir.");
      return;
    }

    const newItem: Media = {
      id: Date.now(),
      name: name.trim(),
    };

    saveItems([...items, newItem]);
    closeForm();
  };

  const deleteItem = (id: number) => {
    Alert.alert("Kaydı Sil", "Bu kaydı silmek istediğine emin misin?", [
      {
        text: "Vazgeç",
        style: "cancel",
      },
      {
        text: "Sil",
        style: "destructive",
        onPress: () => {
          const newItems = items.filter((item) => item.id !== id);

          saveItems(newItems);
        },
      },
    ]);
  };

  const startEdit = (item: Media) => {
    setEditingId(item.id);
    setName(item.name);
    setShowForm(true);
  };

  const updateItem = () => {
    if (!name.trim()) {
      Alert.alert("Uyarı", "Lütfen bir isim gir.");
      return;
    }

    const newItems = items.map((item) =>
      item.id === editingId ? { ...item, name: name.trim() } : item,
    );

    saveItems(newItems);
    closeForm();
  };

  const saveItem = () => {
    if (editingId !== null) {
      updateItem();
    } else {
      addItem();
    }
  };

  const closeForm = () => {
    setName("");
    setEditingId(null);
    setShowForm(false);
  };

  const openAddForm = () => {
    setEditingId(null);
    setName("");
    setShowForm(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{categoryTitle}</Text>

        <Pressable style={styles.addButton} onPress={openAddForm}>
          <Text style={styles.addButtonText}>+</Text>
        </Pressable>
      </View>

      {showForm && (
        <MediaForm
          name={name}
          setName={setName}
          onSave={saveItem}
          isEditing={editingId !== null}
        />
      )}

      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MediaItem item={item} onEdit={startEdit} onDelete={deleteItem} />
        )}
        ListEmptyComponent={
          !showForm ? (
            <Text style={styles.emptyText}>Henüz kayıt yok.</Text>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
  },

  addButton: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },

  addButtonText: {
    color: "white",
    fontSize: 30,
  },

  emptyText: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#777",
  },
});
