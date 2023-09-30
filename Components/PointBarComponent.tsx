import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useUserContext } from "../Contexts/UserContext";

export default function PointBarComponent() {
  const [barWidth, setBarWidth] = useState(0);
  const { user } = useUserContext();
  const level = user?.level || 0;

  function getMaxPointsForLevel(level: number) {
    return level * 1000;
  }

  useEffect(() => {
    const maxPointsForLevel = getMaxPointsForLevel(level);
    const percent = (user?.points ?? 0 / maxPointsForLevel) * 100;
    const clampedPercent = Math.min(100, Math.max(0, percent));
    const clampedWidth = (clampedPercent / 100) * 100;
    setBarWidth(clampedWidth);
    console.log("maxpoints:", maxPointsForLevel);

    console.log("barwidth:", barWidth);
    console.log("level:", level);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        marginTop: 20,
      }}
    >
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
});
