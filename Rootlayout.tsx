import React, { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(150, 121, 105, 0.7)",
  },
});
