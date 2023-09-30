import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useUserContext } from "../Contexts/UserContext";

export default function PointBarComponent() {
  const [barWidth, setBarWidth] = useState(0);
  const [maxPoints, setMaxPoints] = useState(0);
  const { user } = useUserContext();
  const level = user?.level || 0;
  const textColor = user?.isNightMode ? "white" : "black";

  const pointsToNextLevel = 1000 - ((user?.points ?? 1) % 1000 || 1000);

  function getMaxPointsForLevel(level: number) {
    return level * 1000;
  }

  useEffect(() => {
    const percent = ((1000 - pointsToNextLevel) / 1000) * 100;

    console.log("userns poäng:", user?.points);
    // const percent = (user?.points ?? 0 / maxPointsForLevel) * 100;
    // const percent = ((user?.points ?? 0) / 1000) * 100;

    const clampedPercent = Math.min(100, Math.max(0, percent));
    setBarWidth(clampedPercent);
    console.log("clampedpercent:", clampedPercent);
    console.log("level:", level);
  }, [user?.points, level]); // Lägg till user?.points och level som beroenden

  return (
    <View
      style={{
        // flex: 1,
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        marginVertical: 30,
      }}
    >
      <View style={{ paddingVertical: 20, alignItems: "center" }}>
        <Text style={{ color: textColor, ...styles.statusText }}>
          {pointsToNextLevel} poäng till nästa level
        </Text>
      </View>

      <View style={styles.progressBar}>
        {/* <Text style={styles.label}>{user?.points} poäng</Text> */}
        <View
          style={[styles.progressBarFill, { width: `${barWidth}%` }]}
        ></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // label: {
  //   fontSize: 20,
  //   marginLeft: 35,
  //   marginBottom: 10,
  //   color: "black",
  //   fontWeight: "bold",
  //   position: "absolute",
  //   zIndex: 1,
  // },
  progressBar: {
    width: "90%",
    height: 30,
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "center",
    // alignItems: "center",
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
