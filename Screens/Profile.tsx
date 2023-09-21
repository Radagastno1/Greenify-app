import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, View } from "react-native";
import { RootStackParamList } from "../App";
import { users } from "../MockedUsers";

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

export default function ProfileScreen({ route, navigation }: Props) {
  //detta ska kanske hända i inlogg? eller
  const userId = route.params?.userId;
  const allUsers = users;
  const thisUser = allUsers.find((u) => u.id === userId);

  return (
    <View>
      <Text>{thisUser?.username}</Text>
    </View>
  );
}
