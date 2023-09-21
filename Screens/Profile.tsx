import { NativeStackScreenProps } from "@react-navigation/native-stack";
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

  return (
    <View
      style={{
        alignItems: "center",
      }}
    >
      <ImageBackground
        style={styles.backgroundImage}
        source={{
          uri: "https://sites.edgehill.ac.uk/sustainnet/files/2020/06/WorldHands.jpg",
        }}
      >
        <View style={styles.userInformationContainer}>
          <Text
            style={{
              fontSize: 20,
            }}
          >
            {user?.username}
          </Text>
          <Text
            style={{
              fontSize: 12,
            }}
          >
            Medlem sedan {user?.memberSince}
          </Text>
        </View>
      </ImageBackground>

      <Text
        style={{
          textAlign: "center",
          padding: 20,
          fontSize: 20,
          backgroundColor: "rgba(247, 226, 237, 0.8)",
          borderRadius: 10,
          top: 170,
          position: "absolute",
        }}
      >
        {totalPoints()} poäng
      </Text>

      <View style={styles.navigationContainer}>
        <CustomButton
          title="Greenify"
          color="rgba(223, 243, 193, 1)"
          onPress={() => {
            navigation.navigate("Gather");
          }}
        />
        <CustomButton
          title="Mina skatter"
          color="rgba(251, 224, 238, 0.9)"
          onPress={() => {
            navigation.navigate("HistoryScreen");
          }}
        />
        <CustomButton
          title="Inställningar"
          color="rgba(251, 224, 238, 0.9)"
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
    height: 200,
    width: "100%",
  },
  userInformationContainer: {
    alignItems: "center",
    padding: 2,
    fontSize: 20,
    backgroundColor: "rgba(247, 226, 237, 0.6)",
    borderRadius: 10,
    top: 120,
  },
  navigationContainer: {
    marginVertical: 100,
  },
});
