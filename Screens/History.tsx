import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useGarbageContext } from "../Contexts/GarbageContext";
import { RootStackParamList } from "../Navigator";
import { Garbage } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "HistoryScreen">;

export default function History({ navigation }: Props) {
  const { garbage, getGarbage } = useGarbageContext();

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
          <Text style={styles.material}>{item.material.toUpperCase()}</Text>
          <Text style={styles.date}>{item.date}</Text>
        </View>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text style={styles.point}>{item.point} p</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  useEffect(() => {
    // Anropa getGarbage när komponenten monteras
    getGarbage().catch((error) => {
      console.error("Det uppstod ett fel när du hämtade skräp:", error);
    });

    navigation.setOptions({
      title: "",
      headerTransparent: true,
    });
  }, [getGarbage, navigation]);

  return (
    <View style={styles.container}>
      {/* <ImageBackground
        style={styles.backgroundImage}
        source={{
          uri: "https://i.imgur.com/sWAQJaD.png",
        }}
      ></ImageBackground> */}

      <FlatList
        style={styles.list}
        data={garbage || []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
    backgroundColor: "rgba(53,182,96, 0.4)",
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
    height: 100,
    width: 100,
    borderRadius: 10,
    borderColor: "white",
    borderWidth: 5,
  },
  details: {
    flex: 1,
  },
  material: {
    fontSize: 20,
    fontWeight: "bold",
    color: "rgba(40, 24, 2, 0.87)",
  },
  date: {
    fontSize: 15,
    color: "rgba(84, 59, 27, 0.87)",
  },
  point: {
    borderRadius: 50,
    height: 85,
    width: 85,
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
