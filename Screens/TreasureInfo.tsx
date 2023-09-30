import { RouteProp, useRoute } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useGarbageContext } from "../Contexts/GarbageContext";
import { RootStackParamList } from "../Navigator";
import { fetchDataByMaterial } from "../api/material";

type Props = RouteProp<RootStackParamList, "TreasureInfo">;
type NavigationProps = NativeStackScreenProps<
  RootStackParamList,
  "TreasureInfo"
>;

export default function TreasureInfo({ navigation }: NavigationProps) {
  const { garbage, getMaterialInfo } = useGarbageContext();
  const route = useRoute<Props>();
  const { id } = route.params;
  const specificGarbage = garbage.find((g) => g.id === id);
  const [description, setDescription] = useState<string | null>(null);

  useEffect(() => {
    navigation.setOptions({
      title: "",
      headerTransparent: true,
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (specificGarbage) {
        try {
          const data = await getMaterialInfo(specificGarbage.material);
          if (data) {
            setDescription(data.description);
          }
        } catch (error) {
          console.error(
            "Det uppstod ett fel när du hämtade info om material:",
            error
          );
        }
      }
    };

    fetchData();
  }, [specificGarbage]);

  return (
    <View style={styles.container}>
      <Text style={styles.materialText}>
        Du hittade skräp av typen {specificGarbage?.material}.
      </Text>
      <Text style={styles.infoText}>
        {specificGarbage?.date} tog du bort något från naturen som annars skulle
        varit där i upp till {specificGarbage?.points} år.
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
