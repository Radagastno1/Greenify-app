import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Text, View } from "react-native";
import { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "Initial">;

export default function InitialScreen({ navigation }: Props) {
  return (
    <View>
      <Text>Första sidan</Text>
      <Button
        title="Make green"
        onPress={() => {
          navigation.navigate("Gather");
        }}
      />
      <Button
        title="Min profil"
        onPress={() => {
          navigation.navigate("Profile", {userId: 1});
        }}
      />
    </View>
  );
}
