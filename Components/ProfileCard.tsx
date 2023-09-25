import { AntDesign, Entypo } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useUserContext } from "../Contexts/UserContext";
import ShareModal from "./SharingPoints";

interface Props {
  points: number;
  username?: string;
}

export default function ProfileCard(props: Props) {
  const [barWidth, setBarWidth] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const { signOut } = useUserContext();

  useEffect(() => {
    const clampedWidth =
      props.points >= 10000 ? 100 : (props.points / 10000) * 100;
    setBarWidth(clampedWidth);
  }, [props.points]);

  const handleLogOut = () => {
    signOut();
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Entypo name="share" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Entypo name="brush" size={24} color="rgb(93, 110, 99)" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleLogOut}>
          <AntDesign name="logout" size={24} color="rgb(93, 110, 99)" />
        </TouchableOpacity>
        <ShareModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
      </View>
      {props.username ? (
        <Text style={styles.username}>{props.username}</Text>
      ) : null}
      <Image
        source={{
          uri: "https://image.shutterstock.com/image-photo/photo-owl-macro-photography-high-260nw-1178957458.jpg",
        }}
        style={{
          height: 50,
          width: 50,
          marginVertical: 10,
        }}
      />
      <Text style={styles.label}>{props.points} poäng</Text>
      <View style={styles.progressBar}>
        <View style={[styles.progressBarFill, { width: barWidth }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
    width: 300,
    fontSize: 20,
    // backgroundColor: "rgba(206, 165, 165, 0.9)",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 40,
    // top: 320,
    // position: "absolute",
    fontWeight: "bold",
    color: "white",
  },
  username: {
    color: "rgb(204, 175, 175 )",
    fontSize: 30,
    fontWeight: "bold",
    paddingVertical: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: "rgb(93, 110, 99)",
    fontWeight: "bold",
  },
  progressBar: {
    width: "80%",
    height: 24,
    backgroundColor: "#ddd",
    borderRadius: 10,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "rgb(138, 165, 147)",
  },
});
