import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useUserContext } from "../Contexts/UserContext";

export default function PointBarComponent() {
  const [barWidth, setBarWidth] = useState(0);
  const [maxPoints, setMaxPoints] = useState(0);
  const { user } = useUserContext();
  const level = user?.level || 0;
  const textColor = user?.isNightMode ? "white" : "black";

  const pointsToNextLevel = 1000 - ((user?.points || 0) % 1000);

  function getMaxPointsForLevel(level: number) {
    return level * 1000;
  }

  useEffect(() => {
    const percent = ((1000 - pointsToNextLevel) / 1000) * 100;

    console.log("userns poäng:", user?.points);
    const clampedPercent = Math.min(100, Math.max(0, percent));
    setBarWidth(clampedPercent);
    console.log("clampedpercent:", clampedPercent);
    console.log("level:", level);
  }, [user?.points, level]);

  return (
    <View
      style={{
        flex: 1 / 2,
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View style={{ paddingTop: 10, alignItems: "center" }}>
        <Text style={{ color: textColor, ...styles.statusText }}>
          {pointsToNextLevel} poäng till nästa level
        </Text>
      </View>

      <View style={styles.progressBar}>
        <View
          style={[styles.progressBarFill, { width: `${barWidth}%` }]}
        ></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  progressBar: {
    width: "90%",
    height: 30,
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "center",
    marginVertical: 20,
  },
  progressBarFill: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgb(104, 191, 140)",
    position: "absolute",
  },
  statusText: {
    fontSize: 15,
  },
});
