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
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});
