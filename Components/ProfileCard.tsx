import { AntDesign, Entypo } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useUserContext } from "../Contexts/UserContext";
import ShareModal from "./SharingPoints";
import { ChooseAnimalComponent } from "./chooseAnimalComponent";
import PointBarComponent from "./PointBarComponent";

export default function ProfileCard() {
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const { user, dispatch } = useUserContext();

  const handleLogout = () => {
    dispatch({ type: "SIGN_OUT" });
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
        <TouchableOpacity
          onPress={() => {
            setEditModalVisible(true);
          }}
        >
          <Entypo name="brush" size={24} color="rgb(93, 110, 99)" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <AntDesign name="logout" size={24} color="rgb(93, 110, 99)" />
        </TouchableOpacity>
        <ShareModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
        <ChooseAnimalComponent
          visible={editModalVisible}
          onClose={() => setEditModalVisible(false)}
        />
      </View>
      {user?.username ? (
        <Text style={styles.username}>{user?.username}</Text>
      ) : null}
      <Image
        source={{
          uri: user?.animalImageUrl,
        }}
        style={{
          height: 90,
          width: 90,
          borderRadius: 10,
        }}
      />
      <PointBarComponent/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
    width: 300,
    fontSize: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 40,
    fontWeight: "bold",
    color: "white",
  },
  username: {
    color: "rgb(204, 175, 175 )",
    fontSize: 30,
    fontWeight: "bold",
    paddingVertical: 20,
  }
});
