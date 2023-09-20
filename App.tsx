import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import InitialScreen from "./InitialScreen";
import RootLayout from "./Rootlayout";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Initial">
        <Stack.Screen
          name="Initial"
          component={() => (
            <RootLayout>
              <InitialScreen />
            </RootLayout>
          )}
          options={{ title: "Initial" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
