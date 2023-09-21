import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Gather from "./Gather";
import InitialScreen from "./InitialScreen";

export type RootStackParamList = {
  Initial: undefined;
  Gather: undefined;
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
