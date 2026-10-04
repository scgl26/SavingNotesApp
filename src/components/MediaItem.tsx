import { Pressable, StyleSheet, Text, View } from "react-native";
import { Media } from "../types/Media";

type MediaItemProps = {
  item: Media;
  onEdit: (item: Media) => void;
  onDelete: (id: number) => void;
};

export default function MediaItem({ item, onEdit, onDelete }: MediaItemProps) {
  return (
    <View style={styles.item}>
      <Text style={styles.name}>{item.name}</Text>

      <View style={styles.actions}>
        <Pressable onPress={() => onEdit(item)}>
          <Text style={styles.edit}>✎</Text>
        </Pressable>

        <Pressable onPress={() => onDelete(item.id)}>
          <Text style={styles.delete}>🗑</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    marginBottom: 10,
    backgroundColor: "#eee",
    borderRadius: 10,
  },

  name: {
    fontSize: 18,
    flex: 1,
  },

  actions: {
    flexDirection: "row",
    gap: 15,
  },

  edit: {
    fontSize: 22,
  },

  delete: {
    fontSize: 20,
  },
});
