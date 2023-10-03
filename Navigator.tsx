import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CameraProvider } from "./Contexts/CameraContext";
import { useUserContext } from "./Contexts/UserContext";
import CameraScreen from "./Screens/Camera";
import CreateAccount from "./Screens/CreateAccount";
import Gather from "./Screens/Gather";
import History from "./Screens/History";
import Login from "./Screens/Login";
import ProfileScreen from "./Screens/Profile";
import Settings from "./Screens/Settings";
import TreasureInfo from "./Screens/TreasureInfo";

export type RootStackParamList = {
  Gather: undefined;
  CameraScreen: undefined;
  Profile: undefined;
  HistoryScreen: undefined;
  Login: undefined;
  TreasureInfo: { id: number };
  Settings: undefined;
  CreateAccount: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigator() {
  const { user } = useUserContext();

  return (
    <NavigationContainer>
      <CameraProvider>
        {user ? (
          <Stack.Navigator initialRouteName="Profile">
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{ title: "Min profil" }}
            />
            <Stack.Screen
              name="Gather"
              component={Gather}
              options={{ title: "Gather" }}
            />
            <Stack.Screen
              name="CameraScreen"
              component={CameraScreen}
              options={{ title: "Camera" }}
            />
            <Stack.Screen
              name="HistoryScreen"
              component={History}
              options={{ title: "Historik" }}
            />
            <Stack.Screen
              name="TreasureInfo"
              component={TreasureInfo}
              options={{ title: "Mer information" }}
            />
            <Stack.Screen
              name="Settings"
              component={Settings}
              options={{ title: "Inställningar" }}
            />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ title: "Logga in" }}
            />
            <Stack.Screen
              name="CreateAccount"
              component={CreateAccount}
              options={{ title: "Skapa konto" }}
            />
          </Stack.Navigator>
        )}
      </CameraProvider>
    </NavigationContainer>
  );
}
