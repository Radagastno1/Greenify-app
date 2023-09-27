import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ResizeMode, Video } from "expo-av";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import ProfileCard from "../Components/ProfileCard";
import { useUserContext } from "../Contexts/UserContext";
import { RootStackParamList } from "../Navigator";

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

export default function ProfileScreen({ navigation }: Props) {
  const { user } = useUserContext();
  const [pointSum, setPointSum] = useState<number>(0);

  const videoUrl = user?.isNightMode
    ? "https://i.imgur.com/FWN9Gox.mp4"
    : "https://i.imgur.com/1uf9JOQ.mp4";

  useEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      title: "",
      headerStyle: {
        backgroundColor: "rgba(255, 255, 255, 0.5)",
      },
    });
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (user && user.trashList) {
        const newPointSum = user.trashList.reduce((accumulator, trash) => {
          return accumulator + (trash?.point || 0);
        }, 0);

        setPointSum(newPointSum);
      }
    }, [user])
  );

  useEffect(() => {
    if (!user?.isLoggedIn) {
      navigation.navigate("Login");
    }
  }, [user?.isLoggedIn]);

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
