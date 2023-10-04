import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ResizeMode, Video } from "expo-av";
import React, { useEffect } from "react";
import { View } from "react-native";
import ProfileCard from "../Components/ProfileCard";
import { useGarbageContext } from "../Contexts/GarbageContext";
import { useUserContext } from "../Contexts/UserContext";
import { RootStackParamList } from "../Navigator";

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

export default function ProfileScreen({ navigation }: Props) {
  const { garbage, getGarbage } = useGarbageContext();
  const { user, getUser } = useUserContext();

  const videoUrl = user?.isNightMode
    ? "https://i.imgur.com/0F8HFUU.mp4"
    : "https://i.imgur.com/RoVqYQ8.mp4";

  async function getGarbageAsync() {
    try {
      await getGarbage();
      console.log("garabge som usern har: ", garbage);
    } catch (error) {
      console.error("Ett fel inträffade:", error);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      getGarbageAsync;
      console.log("garbage: ", garbage);
      getUser();
      console.log("user.", user);
    }, [])
  );

  useEffect(() => {
    if (!user) {
      navigation.navigate("Login");
    }

    navigation.setOptions({
      headerTransparent: true,
      title: "",
    });
  }, [user]);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Video
        source={{
          uri: videoUrl,
        }}
        style={{ flex: 1 }}
        resizeMode={ResizeMode.COVER}
        shouldPlay
        isLooping
        isMuted={true}
      />

      <View
        style={{
          alignItems: "center",
          position: "absolute",
          top: "15%",
          width: "100%",
          height: "100%",
        }}
      >
        <ProfileCard
          onPressGreenify={() => {
            navigation.navigate("Gather");
          }}
          onPressMinaSkatter={() => {
            navigation.navigate("HistoryScreen");
          }}
          onPressInställningar={() => {
            navigation.navigate("Settings");
          }}
        />
      </View>
    </View>
  );
}
