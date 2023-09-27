import { StyleSheet, View } from "react-native";
import CustomButton from "./CustomButton";

interface Props {
  onPressGreenify: () => void;
  onPressMinaSkatter: () => void;
  onPressInställningar: () => void;
}

export default function ProfileNavigationComponent(props: Props) {
  return (
    <View style={styles.navigationContainer}>
      <CustomButton
        title="Greenify"
        color="rgba(79,44,84,255)"
        onPress={props.onPressGreenify}
      />
      <CustomButton
        title="Mina skatter"
        color="rgb(164,116,156)"
        onPress={props.onPressMinaSkatter}
      />
      <CustomButton
        title="Inställningar"
        color="rgb(164,116,156)"
        onPress={props.onPressInställningar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  navigationContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
});
