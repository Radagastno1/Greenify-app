import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { Trash } from "../Contexts/UserContext";
import { useUserContext } from "../Contexts/UserContext";
import { RootStackParamList } from "../Navigator";

type Props = NativeStackScreenProps<RootStackParamList, "HistoryScreen">;

export default function History({ navigation }: Props) {
  const { user } = useUserContext();

  const renderItem = ({ item }: { item: Trash }) => (
    <View style={styles.listItem}>
      <Image source={{ uri: item.url }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.material}>{item.material}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={user?.trash || []}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  material: {
    fontSize: 16,
    fontWeight: "bold",
  },
  date: {
    fontSize: 14,
    color: "#888",
  },
});
