import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../App";
import { users } from "../MockedUsers";

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

export default function ProfileScreen({ route, navigation }: Props) {
  //detta ska kanske hända i inlogg? eller
  const userId = route.params?.userId;
  const allUsers = users;
  const thisUser = allUsers.find((u) => u.id === userId);

  return (
    <View>
      <ImageBackground
        style={styles.backgroundImage}
        source={{
          uri: "https://sites.edgehill.ac.uk/sustainnet/files/2020/06/WorldHands.jpg",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            padding: 2,
            fontSize: 20,
            backgroundColor: "rgba(247, 226, 237, 0.5)",
            borderRadius: 10,
            top: 120,
          }}
        >
          {thisUser?.username}
        </Text>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    height: 200,
  },
});
