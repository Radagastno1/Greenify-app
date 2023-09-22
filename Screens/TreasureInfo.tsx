import { RouteProp, useRoute } from "@react-navigation/native";
import { Text, View } from "react-native";
import { useUserContext } from "../Contexts/UserContext";
import { RootStackParamList } from "../Navigator";

type Props = RouteProp<RootStackParamList, "TreasureInfo">;

export default function TreasureInfo() {
  const { user } = useUserContext();
  const route = useRoute<Props>();
  const { id } = route.params;
  const specificTrash = user?.trash.find((t) => t.id === id);

  return (
    <View>
      <Text>{specificTrash?.material}</Text>
    </View>
  );
}
