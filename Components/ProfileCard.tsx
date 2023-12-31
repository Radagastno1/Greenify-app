import { AntDesign, Entypo } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useGarbageContext } from "../Contexts/GarbageContext";
import { useUserContext } from "../Contexts/UserContext";
import PointBarComponent from "./PointBarComponent";
import ProfileNavigationComponent from "./ProfileNavigationComponent";
import ShareModal from "./SharingPoints";
import { ChooseAnimalComponent } from "./chooseAnimalComponent";

interface Props {
  onPressGreenify: () => void;
  onPressMinaSkatter: () => void;
  onPressInställningar: () => void;
}

export default function ProfileCard(props: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  // const [maxPoints, setMaxPoints] = useState(0);
  const { user, dispatch } = useUserContext();
  const { garbage } = useGarbageContext();
  const backGroundColor = user?.isNightMode
    ? "rgba(255, 255, 255, 0.0)"
    : "rgba(255, 255, 255, 0.8)";

  const usernameColor = user?.isNightMode ? "white" : "rgba(79,44,84,255)";
  const textColor = user?.isNightMode ? "white" : "black";
  const userPoints = user?.points ?? 0;

  const handleLogout = () => {
    dispatch({ type: "SIGN_OUT" });
  };

  const getUniqueLocations = () => {
    const uniqueLocations = new Set<string>();

    garbage?.forEach((garbage) => {
      if (garbage.latitude && garbage.longitude) {
        const locationKey = `${garbage.latitude},${garbage.longitude}`;
        uniqueLocations.add(locationKey);
      }
    });

    const uniqueLocationObjects = Array.from(uniqueLocations).map(
      (locationKey) => {
        const [latitude, longitude] = locationKey.split(",");
        return { latitude, longitude };
      }
    );

    return uniqueLocationObjects.length;
  };

  return (
    <View style={{ backgroundColor: backGroundColor, ...styles.container }}>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Entypo
            name="share"
            size={24}
            color={user?.isNightMode ? "white" : "black"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setEditModalVisible(true);
          }}
        >
          <Entypo
            name="brush"
            size={24}
            color={user?.isNightMode ? "white" : "black"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <AntDesign
            name="logout"
            size={24}
            color={user?.isNightMode ? "white" : "black"}
          />
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

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingBottom: 20,
          paddingTop: 40,
          paddingHorizontal: 10,
        }}
      >
        <Image
          source={{
            uri: user?.animalImageUrl,
          }}
          style={{
            height: 50,
            width: 50,
            borderRadius: 50,
            marginRight: 10,
          }}
        />

        {user?.username ? (
          <Text style={{ color: usernameColor, ...styles.username }}>
            {user?.username}
          </Text>
        ) : null}
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            padding: 10,
          }}
        >
          <Text style={{ color: textColor, ...styles.statusNumber }}>
            {garbage?.length}
          </Text>
          <Text style={{ color: textColor, ...styles.statusText }}>SKRÄP</Text>
        </View>

        <View style={{ backgroundColor: textColor, ...styles.separator }} />

        <View
          style={{ flexDirection: "column", alignItems: "center", padding: 10 }}
        >
          <Text style={{ color: textColor, ...styles.statusNumber }}>
            {getUniqueLocations()}
          </Text>
          <Text style={{ color: textColor, ...styles.statusText }}>
            PLATSER
          </Text>
        </View>

        <View style={{ backgroundColor: textColor, ...styles.separator }} />
        <View
          style={{ flexDirection: "column", alignItems: "center", padding: 10 }}
        >
          <Text style={{ color: textColor, ...styles.statusNumber }}>
            {userPoints}
          </Text>
          <Text style={{ color: textColor, ...styles.statusText }}>POÄNG</Text>
        </View>

        <View style={{ backgroundColor: textColor, ...styles.separator }} />

        <View
          style={{ flexDirection: "column", alignItems: "center", padding: 10 }}
        >
          <Text style={{ color: textColor, ...styles.statusNumber }}>
            {user?.level}
          </Text>
          <Text style={{ color: textColor, ...styles.statusText }}>LEVEL</Text>
        </View>
      </View>

      <PointBarComponent />

      <View
        style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
      >
        <ProfileNavigationComponent
          onPressGreenify={props.onPressGreenify}
          onPressInställningar={props.onPressInställningar}
          onPressMinaSkatter={props.onPressMinaSkatter}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    padding: 20,
    width: "90%",
    fontSize: 20,
    borderRadius: 40,
    fontWeight: "bold",
    color: "white",
    height: "80%",
  },
  username: {
    fontSize: 30,
    fontWeight: "bold",
  },
  statusText: {
    fontSize: 12,
  },
  statusNumber: {
    fontSize: 15,
    fontWeight: "bold",
  },
  separator: {
    width: 1,
    height: 24,
    marginHorizontal: 5,
  },
});
