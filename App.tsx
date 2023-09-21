import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import CameraScreen from "./Camera";
import Gather from "./Gather";
import InitialScreen from "./InitialScreen";

export type RootStackParamList = {
  Initial: undefined;
  Gather: undefined;
  CameraScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
