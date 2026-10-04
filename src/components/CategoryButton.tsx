import { StyleSheet, Text, TouchableOpacity } from "react-native";

type CategoryButtonProps = {
  title: string;
  icon: string;
  onPress: () => void;
};

export default function CategoryButton({
  title,
  icon,
  onPress,
}: CategoryButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "85%",
    padding: 18,
    marginVertical: 6,
    borderRadius: 12,
    backgroundColor: "#eeeeee",
    flexDirection: "row",
    alignItems: "center",
  },

  icon: {
    fontSize: 24,
    marginRight: 12,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
  },
});
