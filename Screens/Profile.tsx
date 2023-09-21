import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import CustomButton from "../Components/CustomButton";
import { useUserContext } from "../Contexts/UserContext";
import { RootStackParamList } from "../Navigator";

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

export default function ProfileScreen({ navigation }: Props) {
  const { user } = useUserContext();

  const totalPoints = () => {
    const pointsSum = user?.trash.reduce((accumulator, trash) => {
      return accumulator + (trash?.point || 0);
    }, 0);

    return pointsSum;
  };

  useEffect(() => {
    if (user?.username) {
      navigation.setOptions({
        title: user.username,
        headerTitleStyle: {
          fontSize: 20,
        },
        headerStyle: {
          backgroundColor: "rgba(207, 182, 195, 0.8)",
        },
      });
    }
  }, [user?.username]);

  return (
    <View
      style={{
        alignItems: "center",
        backgroundColor: "rgba(207, 182, 195, 0.8)",
      }}
    >
      <ImageBackground
        style={styles.backgroundImage}
        source={{
          uri: "https://www.ox.ac.uk/sites/files/oxford/styles/ow_medium_feature/s3/field/field_image_main/shutterstock_1379741990.jpg?itok=x_E4gx1C",
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Text style={styles.pointsContainer}>{totalPoints()} poäng</Text>
        </View>
      </ImageBackground>

      <View style={styles.navigationContainer}>
        <CustomButton
          title="Greenify"
          color="rgba(154, 192, 153, 0.61)"
          onPress={() => {
            navigation.navigate("Gather");
          }}
        />
        <CustomButton
          title="Mina skatter"
          color="rgba(241, 227, 236, 0.61)"
          onPress={() => {
            navigation.navigate("HistoryScreen");
          }}
        />
        <CustomButton
          title="Inställningar"
          color="rgba(241, 227, 236, 0.61)"
          onPress={() => {
            console.log("settings");
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    height: 300,
    width: "100%",
  },
  pointsContainer: {
    alignItems: "center",
    padding: 20,
    fontSize: 20,
    backgroundColor: "rgba(157, 133, 112, 0.8)",
    borderRadius: 45,
    top: 270,
    position: "absolute",
    fontWeight: "bold",
    color: "white",
  },
  navigationContainer: {
    marginVertical: 100,
  },
});
