import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Switch, Text, TextInput, View } from "react-native";
import CustomButton from "../Components/CustomButton";
import { useUserContext } from "../Contexts/UserContext";
import { RootStackParamList } from "../Navigator";

type Props = NativeStackScreenProps<RootStackParamList, "Settings">;

export default function Settings({ navigation }: Props) {
  const { user } = useUserContext();
  const [username, setUsername] = useState(user?.username);
  const [password, setPassword] = useState(user?.password);

  const [isSoundEnabled, setSoundIsEnabled] = useState(false);
  const toggleSoundSwitch = () =>
    setSoundIsEnabled((previousState) => !previousState);

  const [isNightmodeEnabled, setNightmodeIsEnabled] = useState(
    user?.isNightMode
  );
  const toggleNightmodeSwitch = () =>
    setNightmodeIsEnabled((previousState) => !previousState);

  const { updateUser } = useUserContext();

  const handleUpdateUser = async () => {
    if (user) {
      user.username = username ?? "";
      user.password = password ?? "";
      user.isNightMode = isNightmodeEnabled ?? false;
      await updateUser();
      navigation.navigate("Profile");
    }
  };

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
        height: "100%",
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
        onChangeText={(text) => {
          setUsername(text);
        }}
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
        onChangeText={(text) => {
          setPassword(text);
        }}
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
          trackColor={{ false: "#767577", true: "rgb(164,116,156)" }}
          thumbColor={isSoundEnabled ? "rgba(79,44,84,255)" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSoundSwitch}
          value={isSoundEnabled}
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
          trackColor={{ false: "#767577", true: "rgb(164,116,156)" }}
          thumbColor={isNightmodeEnabled ? "rgba(79,44,84,255)" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleNightmodeSwitch}
          value={isNightmodeEnabled}
        />
        <Text style={{ fontSize: 24, marginHorizontal: 20 }}>Nightmode on</Text>
      </View>

      <View
        style={{
          width: "100%",
          alignItems: "center",
        }}
      >
        <CustomButton
          onPress={() => {
            handleUpdateUser();
          }}
          title="Save"
        ></CustomButton>
      </View>
    </View>
  );
}
