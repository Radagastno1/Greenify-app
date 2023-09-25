import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ResizeMode, Video } from "expo-av";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import CustomButton from "../Components/CustomButton";
import ProfileCard from "../Components/ProfileCard";
import { useUserContext } from "../Contexts/UserContext";
import { RootStackParamList } from "../Navigator";

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

export default function ProfileScreen({ navigation }: Props) {
  const { user } = useUserContext();
  const [pointSum, setPointSum] = useState<number>(0);

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

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Video
        source={{
          uri: "https://i.imgur.com/1uf9JOQ.mp4",
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
        }}
      >
        <ProfileCard />
      </View>

      <View style={styles.navigationContainer}>
        <CustomButton
          title="Greenify"
          color="rgba(79,44,84,255)"
          onPress={() => {
            navigation.navigate("Gather");
          }}
        />
        <CustomButton
          //DENNA
          title="Mina skatter"
          color="rgb(164,116,156)"
          onPress={() => {
            navigation.navigate("HistoryScreen");
          }}
        />
        <CustomButton
          //O DENNA
          title="Inställningar"
          color="rgb(164,116,156)"
          onPress={() => {
            console.log("settings");
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navigationContainer: {
    alignItems: "center",
    display: "flex",
    position: "absolute",
    top: "55%",
    width: "100%",
  },
});
