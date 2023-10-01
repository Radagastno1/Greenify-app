import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Image } from "react-native-elements";
import { useGarbageContext } from "../Contexts/GarbageContext";
import { RootStackParamList } from "../Navigator";
import { Garbage } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "HistoryScreen">;

export default function History({ navigation }: Props) {
  const { garbage } = useGarbageContext();

  useEffect(() => {
    navigation.setOptions({
      title: "",
      headerTransparent: true,
    });
  }, []);

  const renderItem = ({ item }: { item: Garbage }) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => {
        navigation.navigate("TreasureInfo", { id: item.id });
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image source={{ uri: item.url }} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.material}>
            {item.material
              ? item.material.toUpperCase()
              : "Ingen materialinformation"}
          </Text>

          <Text style={styles.date}>{item.date}</Text>
        </View>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text style={styles.point}>{item.points} p</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {garbage.length < 0 ? (
        <Text>Ingen skatt än</Text>
      ) : (
        <FlatList
          style={styles.list}
          data={garbage || []}
          keyExtractor={(item) => item.id?.toString() || ""}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(164,116,156, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    marginTop: 100,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    marginBottom: 2,
    borderColor: "#ccc",
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  image: {
    marginHorizontal: 10,
    height: 70,
    width: 70,
    borderRadius: 10,
    borderColor: "white",
    borderWidth: 5,
  },
  details: {
    flex: 1,
  },
  material: {
    fontSize: 15,
    fontWeight: "bold",
    color: "rgba(40, 24, 2, 0.87)",
  },
  date: {
    fontSize: 15,
    color: "rgba(84, 59, 27, 0.87)",
  },
  point: {
    borderRadius: 50,
    height: 75,
    width: 75,
    borderColor: "rgba(255, 173, 2, 0.61)",
    borderWidth: 10,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 13,
    fontWeight: "bold",
    color: "white",
    backgroundColor: "rgba(255, 173, 2, 0.61)",
  },
});
