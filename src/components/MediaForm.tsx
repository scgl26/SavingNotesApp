import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

type MediaFormProps = {
  name: string;
  setName: (value: string) => void;
  onSave: () => void;
  isEditing: boolean;
};

export default function MediaForm({
  name,
  setName,
  onSave,
  isEditing,
}: MediaFormProps) {
  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="Ne eklemek istiyorsun?"
        value={name}
        onChangeText={setName}
      />

      <Pressable style={styles.saveButton} onPress={onSave}>
        <Text style={styles.saveButtonText}>
          {isEditing ? "Güncelle" : "Kaydet"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
  },

  saveButton: {
    backgroundColor: "#333",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
