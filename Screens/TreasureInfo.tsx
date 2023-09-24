import { RouteProp, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useUserContext } from "../Contexts/UserContext";
import { RootStackParamList } from "../Navigator";
import { fetchDataByMaterial } from "../api";

type Props = RouteProp<RootStackParamList, "TreasureInfo">;

export default function TreasureInfo() {
  const { user } = useUserContext();
  const route = useRoute<Props>();
  const { id } = route.params;
  const specificTrash = user?.trash.find((t) => t.id === id);
  const [description, setDescription] = useState<string | null>(null);

  // useEffect(() => {
  //   if (specificTrash) {
  //     fetchDataByMaterial(specificTrash.material)
  //       .then((data) => {
  //         setDescription(data.description);
  //       })
  //       .catch((error) => {
  //         console.error("Fel vid hämtning av data från API:et:", error.message);
  //       });
  //   }
  // }, [specificTrash]);

  return (
    <View style={styles.container}>
      <Text style={styles.materialText}>
        Du hittade skräp av typen {specificTrash?.material}.
      </Text>
      <Text style={styles.infoText}>
        {specificTrash?.date} tog du bort något från naturen som annars skulle
        varit där i upp till {specificTrash?.point} år.
      </Text>
      <Text style={styles.infoText}>Visste du?</Text>
      {description ? (
        <Text>{description}</Text>
      ) : (
        <Text>Laddar beskrivning...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 1,
    flexDirection: "column",
  },
  materialText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  infoText: {
    fontSize: 15,
  },
});
