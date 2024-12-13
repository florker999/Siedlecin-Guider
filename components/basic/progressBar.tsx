import { Colors } from "@/constants/Colors";
import { Animated, StyleProp, StyleSheet, View, ViewStyle } from "react-native";

interface IProps {
  progress: number;
  containerStyle?: StyleProp<ViewStyle>;
  barStyle?: StyleProp<ViewStyle>;
}

export default function ProgressBar(props: IProps) {
  const translateX: `${number}%` = `${-50 * (1 - props.progress)}%`;

  return (
    <View style={[styles.progressBarContainer, props.containerStyle]}>
      <Animated.View
        style={[
          styles.progressBar,
          {
            transform: [
              { translateX: 0 },
              { translateX },
              { scaleX: props.progress },
            ],
          },
          props.barStyle,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  progressBarContainer: {
    width: "100%",
    height: 9,
    borderWidth: 1,
    borderRadius: 40,
    borderStyle: "solid",
    borderColor: "black",
    flexDirection: "row",
    alignItems: "center",
  },
  progressBar: {
    width: "98%",
    margin: "auto",
    borderRadius: 1000,
    backgroundColor: Colors['light'].tint,
    height: 3,
  },
});
