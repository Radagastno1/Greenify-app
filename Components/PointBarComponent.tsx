import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useUserContext } from "../Contexts/UserContext";

export default function PointBarComponent() {
  const [barWidth, setBarWidth] = useState(0);
  const { user } = useUserContext();

  useEffect(() => {
    if (user?.points) {
      const clampedWidth =
        user?.points >= 10000 ? 100 : (user?.points / 10000) * 100;
      setBarWidth(clampedWidth);
    }
  }, [user?.points]);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
      }}
    >
      <Text style={styles.label}>{user?.points} poäng</Text>
      <View style={styles.progressBar}>
        <View style={[styles.progressBarFill, { width: barWidth }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: "rgb(93, 110, 99)",
    fontWeight: "bold",
  },
  progressBar: {
    width: "80%",
    height: 24,
    backgroundColor: "#ddd",
    borderRadius: 10,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "rgb(138, 165, 147)",
  },
});
