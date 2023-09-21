import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { CameraProvider } from "./Contexts/CameraContext";
import CameraScreen from "./Screens/Camera";
import Gather from "./Screens/Gather";
import History from "./Screens/History";
import InitialScreen from "./Screens/InitialScreen";
import ProfileScreen from "./Screens/Profile";

export type RootStackParamList = {
  Initial: undefined;
  Gather: undefined;
  CameraScreen: undefined;
  Profile: { userId: number };
  HistoryScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <CameraProvider>
        <Stack.Navigator initialRouteName="Initial">
          <Stack.Screen
            name="Initial"
            component={InitialScreen}
            options={{ title: "Initial" }}
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
            name="Profile"
            component={ProfileScreen}
            options={{ title: "Min profil" }}
          />
          <Stack.Screen
            name="HistoryScreen"
            component={History}
            options={{ title: "Historik" }}
          />
        </Stack.Navigator>
      </CameraProvider>
    </NavigationContainer>
  );
}
