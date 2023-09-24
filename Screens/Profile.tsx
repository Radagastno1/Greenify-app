import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ResizeMode, Video } from "expo-av";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import CustomButton from "../Components/CustomButton";
import PointComponent from "../Components/PointComponent";
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
      // headerTitleStyle: {
      //   fontSize: 20,
      //   color: "rgba(81, 50, 12, 1)",
      // },
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
    <View style={{ flex: 1 }}>
      <Video
        source={{
          uri: "https://v3.cdnpk.net/videvo_files/video/free/2020-07/large_watermarked/06_1596083776_preview.mp4",
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
          top: "20%",
          width: "100%",
        }}
      >
        <PointComponent points={pointSum} username={user?.username} />
      </View>

      <View style={styles.navigationContainer}>
        <CustomButton
          title="Greenify"
          color="rgb(138, 165, 147 )"
          onPress={() => {
            navigation.navigate("Gather");
          }}
        />
        <CustomButton
          //DENNA
          title="Mina skatter"
          color="rgb(239, 223, 223)"
          onPress={() => {
            navigation.navigate("HistoryScreen");
          }}
        />
        <CustomButton
          //O DENNA
          title="Inställningar"
          color="rgb(232, 218, 218))"
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
