import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Switch, Text, TextInput, View } from "react-native";
import { useUserContext } from "../Contexts/UserContext";
import { RootStackParamList } from "../Navigator";

type Props = NativeStackScreenProps<RootStackParamList, "Settings">;

export default function Settings({ navigation }: Props) {
  const { user } = useUserContext();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const renderPasswordStars = () => {
    if (user && user.password) {
      return Array(user.password.length).fill("*").join("");
    }
    return "";
  };

  useEffect(() => {
    navigation.setOptions({
      title: "",
      headerTransparent: true,
    });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "flex-start",
        paddingHorizontal: 20,
        width: "100%",
        marginTop: 100,
      }}
    >
      <TextInput
        style={{
          height: 50,
          fontSize: 24,
          borderWidth: 2,
          padding: 10,
          width: "100%",
          borderRadius: 10,
          marginVertical: 10,
        }}
        placeholder={user?.username}
      ></TextInput>
      <TextInput
        style={{
          height: 50,
          fontSize: 24,
          borderWidth: 2,
          padding: 10,
          width: "100%",
          borderRadius: 10,
          marginVertical: 10,
        }}
        placeholder={renderPasswordStars()}
      ></TextInput>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          padding: 10,
          alignItems: "center",
        }}
      >
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <Text style={{ fontSize: 24, marginHorizontal: 20 }}>Sound on</Text>
      </View>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          padding: 10,
          alignItems: "center",
        }}
      >
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <Text style={{ fontSize: 24, marginHorizontal: 20 }}>Nightmode on</Text>
      </View>
    </View>
  );
}
