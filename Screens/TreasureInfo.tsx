import { RouteProp, useRoute } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
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
  const [yearsInNature, setYearsInNature] = useState<string | null>("");
  const [backgroundImage, setBackgroundImage] = useState("");

  const getBackgroundImage = () => {
    if (specificGarbage) {
      if (specificGarbage.material.toLocaleLowerCase() == "plast") {
        setBackgroundImage("https://i.imgur.com/HgUYnUS.jpg");
      } else if (
        specificGarbage.material.toLocaleLowerCase() == "metall" ||
        specificGarbage.material.toLocaleLowerCase() == "aluminium"
      ) {
        setBackgroundImage(
          "https://www.myfreetextures.com/wp-content/uploads/2011/06/brushedsteel7.jpg"
        );
      } else if (specificGarbage.material.toLocaleLowerCase() == "glas") {
        setBackgroundImage("https://i.imgur.com/JM0QuNu.jpg");
      } else if (specificGarbage.material.toLocaleLowerCase() == "fimp") {
        setBackgroundImage("https://i.imgur.com/o6mIn98.jpg");
      } else {
        setBackgroundImage("https://pngimg.com/uploads/grass/grass_PNG397.png");
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
            setYearsInNature(data.yearsInNature);
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
          <View style={styles.didYouKnowContainer}>
            <Text style={styles.didYouKnowText}>Visste du?</Text>
            {description ? (
              <Text style={styles.didYouKnowInfo}>{description}</Text>
            ) : (
              <Text>Laddar beskrivning...</Text>
            )}
            <Text style={styles.thankYouText}>
              Tack för att du tog bort{" "}
              {specificGarbage?.material.toLocaleLowerCase()} från naturen som
              annars skulle varit där i upp till {yearsInNature} år.
            </Text>
            <Image
              source={{ uri: "https://i.imgur.com/fCMzUH7.png" }}
              style={styles.image}
            />
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
    backgroundColor: "rgba(255, 255, 255, 0.0)",
    alignItems: "center",
    padding: 10,
    borderRadius: 20,
    flex: 1 / 2,
  },
  thankYouText: {
    fontSize: 16,
    alignItems: "center",
    paddingVertical: 20,
    textAlign: "center",
  },
  infoText: {
    fontSize: 20,
  },
  didYouKnowContainer: {
    marginTop: 10,
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgb(236, 193, 221)",
    justifyContent: "center",
    borderRadius: 20,
    padding: 10,
  },
  didYouKnowText: {
    fontSize: 20,
    fontStyle: "italic",
    paddingBottom: 20,
    fontWeight: "500",
  },
  didYouKnowInfo: {
    fontSize: 18,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  image: {
    height: 80,
    width: 80,
  },
});
