import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  points: number;
}

export default function PointIndicator({ points }: Props) {
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    // Begränsa bredden till 100% när poängen når eller överstiger 10,000
    const clampedWidth = points >= 10000 ? 100 : (points / 10000) * 100;
    setBarWidth(clampedWidth);
  }, [points]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Poäng: {points}</Text>
      <View style={styles.progressBar}>
        <View style={[styles.progressBarFill, { width: barWidth }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
    width: 300,
    fontSize: 20,
    // backgroundColor: "rgba(206, 165, 165, 0.9)",
    backgroundColor: "#a0be98",
    borderRadius: 40,
    top: 370,
    position: "absolute",
    fontWeight: "bold",
    color: "white",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: "white",
  },
  progressBar: {
    width: "80%",
    height: 20,
    backgroundColor: "#ddd",
    borderRadius: 10,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "green",
  },
});
