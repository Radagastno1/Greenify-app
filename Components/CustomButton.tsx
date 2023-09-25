import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface Props {
  title: string;
  color?: string;
  onPress?: () => void;
  onLogin?: (username: string, password: string) => void;
  isDisabled?: boolean;
}

export default function CustomButton(props: Props) {
  const backgroundColor = props.color || "black";
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }]}
      disabled={props.isDisabled}
      onPress={() => {
        if (props.onPress) {
          props.onPress();
        } else if (props.onLogin) {
          // Här skulle du behöva ha tillgång till användarnamn och lösenord
          // som du kan skicka med som argument till onLogin-funktionen.
          // Anta att du har dem i ditt komponents tillstånd.
          const username = "användarnamn"; // Byt ut detta med rätt värden
          const password = "lösenord"; // Byt ut detta med rätt värden
          props.onLogin(username, password);
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
    paddingHorizontal: 30,
    paddingVertical: 20,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    width: "60%",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
});
