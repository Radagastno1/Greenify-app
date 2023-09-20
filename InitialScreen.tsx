import { useNavigation } from "@react-navigation/native";
import { Button, Text, View } from "react-native";

export default function InitialScreen() {
  const navigation = useNavigation();
  return (
    <View>
      <Text>första sidan</Text>
      <Button
        title="Gå till Location"
        onPress={() => {
          navigation.navigate("Location" as never);
        }}
      />
    </View>
  );
}
