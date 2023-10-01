import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ResizeMode, Video } from "expo-av";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import ProfileCard from "../Components/ProfileCard";
import { useGarbageContext } from "../Contexts/GarbageContext";
import { useUserContext } from "../Contexts/UserContext";
import { RootStackParamList } from "../Navigator";

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

export default function ProfileScreen({ navigation }: Props) {
  const { garbage, getGarbage } = useGarbageContext();
  const { user } = useUserContext();

  const videoUrl = user?.isNightMode
    ? "https://i.imgur.com/FWN9Gox.mp4"
    : "https://i.imgur.com/RoVqYQ8.mp4";

  async function someFunction() {
    try {
      const list = await getGarbage();
      console.log("list:", list);
    } catch (error) {
      console.error("Ett fel inträffade:", error);
    }
  }

  // useFocusEffect(
  //   React.useCallback(() => {
  //     if (garbage) {
  //       const newPointSum = garbage.reduce((accumulator, trash) => {
  //         return accumulator + (trash?.points || 0);
  //       }, 0);

  //       setPointSum(newPointSum);
  //     }
  //   }, [user])
  // );

  useFocusEffect(
    React.useCallback(() => {
      someFunction();
    }, [])
  );

  useEffect(() => {
    if (!user) {
      navigation.navigate("Login");
    }

    navigation.setOptions({
      headerTransparent: true,
      title: "",
      headerStyle: {
        backgroundColor: "rgba(255, 255, 255, 0.5)",
      },
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
