import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface Props {
  title: string;
  color?: string;
  onPress: () => void;
}

export default function CustomButton(props: Props) {
  const backgroundColor = props.color || "black";
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }]}
      onPress={props.onPress}
    >
      <Text style={styles.buttonText}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 40,
    paddingHorizontal: 30,
    paddingVertical: 20,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
});
