import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Gather from "./Gather";
import InitialScreen from "./InitialScreen";

const Stack = createStackNavigator();

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
