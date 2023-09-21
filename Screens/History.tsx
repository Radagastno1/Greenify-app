import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "react-native";
import { RootStackParamList } from "../Navigator";

type Props = NativeStackScreenProps<RootStackParamList, "HistoryScreen">;

export default function History() {
  return <View></View>;
}
