import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useUserContext } from "../Contexts/UserContext";
import ProfileNavigationComponent from "./ProfileNavigationComponent";

export default function PointBarComponent() {
  const [barWidth, setBarWidth] = useState(0);
  const { user } = useUserContext();

  useEffect(() => {
    if (user?.points) {
      const percent = (user.points / 50000) * 100;
      const clampedPercent = Math.min(100, Math.max(0, percent));
      const clampedWidth = (clampedPercent / 100) * 100;
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
