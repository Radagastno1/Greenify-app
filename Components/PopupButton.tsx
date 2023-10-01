import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface Props {
  title: string;
  color?: string;
  onPress?: () => void;
  onLogin?: (username: string, password: string) => void;
  isDisabled?: boolean;
}

export default function PopupButton(props: Props) {
  const backgroundColor = props.color || "black";
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }]}
      disabled={props.isDisabled}
      onPress={() => {
        if (props.onPress) {
          props.onPress();
        }
      }}
    >
      <Text style={styles.buttonText}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 40,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    width: "60%",
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
});
