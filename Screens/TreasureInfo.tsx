import { RouteProp, useRoute } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { useGarbageContext } from "../Contexts/GarbageContext";
import { RootStackParamList } from "../Navigator";

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
  const [backgroundImage, setBackgroundImage] = useState("");

  const getBackgroundImage = () => {
    if (specificGarbage) {
      if (specificGarbage.material.toLocaleLowerCase() == "plast") {
        setBackgroundImage(
          "https://png.pngtree.com/thumb_back/fh260/background/20210902/pngtree-retro-plastic-fold-plastic-bag-background-material-image_784405.jpg"
        );
      } else if (
        specificGarbage.material.toLocaleLowerCase() == "metall" ||
        specificGarbage.material.toLocaleLowerCase() == "aluminium"
      ) {
        setBackgroundImage(
          "https://www.myfreetextures.com/wp-content/uploads/2011/06/brushedsteel7.jpg"
        );
      }
    }
  };

  useEffect(() => {
    navigation.setOptions({
      title: "",
      headerTransparent: true,
    });
    getBackgroundImage();
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
    <ImageBackground
      source={{ uri: backgroundImage }}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.materialText}>
            {specificGarbage?.date} tog du bort {specificGarbage?.material} från
            naturen som annars skulle varit där i upp till{" "}
            {specificGarbage?.points} år.
          </Text>
          <View style={styles.didYouKnowContainer}>
            <Text style={styles.didYouKnowText}>Visste du?</Text>
            {description ? (
              <Text>{description}</Text>
            ) : (
              <Text>Laddar beskrivning...</Text>
            )}
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 1,
    flexDirection: "column",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    alignItems: "center",
    padding: 10,
    borderRadius: 20,
    flex: 1 / 2,
  },
  materialText: {
    fontSize: 17,
    alignItems: "center",
  },
  infoText: {
    fontSize: 15,
  },
  didYouKnowContainer: {
    marginTop: 10,
    flex: 1,
    alignItems: "center",
  },
  didYouKnowText: {
    fontSize: 20,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
