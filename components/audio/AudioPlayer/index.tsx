import { View, Easing, Animated } from "react-native";
import React from "react";
import styles from "./styles";
import IProps from "./IProps";
import { Card, Text } from "react-native-ui-lib";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import ProgressBar from "@/components/basic/progressBar";

export default function AudioPlayer(props: IProps) {
  const [position, setPosition] = React.useState(0);
  const [duration, setDuration] = React.useState<number>();
  const progressAnim = React.useRef(new Animated.Value(0)).current;
  const progressAnim2 = React.useRef(new Animated.Value(-50)).current;

  const { audio, play, onPlay, onPause, onFinish, title } = props;

  // modify audio update actions on first render
  React.useEffect(() => {
    audio.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded) {
        if (status.isPlaying) {
          // update position while playing
          setPosition(status.positionMillis);
        } else if (status.didJustFinish) {
          // reset track, update position to final and do finish callback
          // once finished reset track
          audio.stopAsync();
          setPosition(status.positionMillis);

          if (onFinish) {
            onFinish();
          }
        }
      }
    });
  }, []);

  // do when track should start or stop playing
  React.useEffect(() => {
    audio.getStatusAsync().then((status) => {
      if (status.isLoaded) {
        if (!status.isPlaying && play) {
          // start track if it should but isn't playing and update duration if undefined
          setPosition(0);
          audio.playAsync().then((res) => {
            onPlay();
            Animated.timing(progressAnim, {
              toValue: 1,
              easing: Easing.linear,
              useNativeDriver: true,
              duration: (res.isLoaded && res.durationMillis) || undefined,
            }).start();
            Animated.timing(progressAnim2, {
              toValue: 0,
              easing: Easing.linear,
              useNativeDriver: true,
              duration: (res.isLoaded && res.durationMillis) || undefined,
            }).start();
            if (res.isLoaded) {
              setDuration(res.durationMillis);
            }
          });
        } else if (status.isPlaying && !play) {
          // pause track if is playing but shouldn't and do pause callback
          audio.pauseAsync().then(() => onPause());
          progressAnim.stopAnimation();
          progressAnim2.stopAnimation();
        }
      }
    });
  }, [audio, play]);

  const icons = {
    play: require("@/assets/icons/play.png"),
    pause: require("@/assets/icons/pause.png"),
  };

  const positionToDuration: number = duration ? position / duration : 0;

  return (
    <Card style={styles.audioPlayer}>
      <View style={styles.mainPart}>
        <Text style={styles.audioTitle}>{title}</Text>
      </View>
      <MaterialIcons.Button
        name={play ? "pause" : "play-arrow"}
        size={15}
        onPress={play ? onPause : onPlay}
        iconStyle={{ margin: 0 }}
      />
      <View style={styles.progressPart}>
        <View style={styles.durationContainer}>
          <Text style={styles.positionLabel}>{milisToString(position)}</Text>
          <Text style={styles.durationLabel}>
            {duration ? milisToString(duration) : "--:--"}
          </Text>
        </View>
        <ProgressBar progress={positionToDuration} />
      </View>
    </Card>
  );
}

function milisToString(milis: number): string {
  const secs = Math.floor(milis / 1000);
  const mins = Math.floor(secs / 60);

  return `${mins < 10 && 0}${mins}:${secs < 10 && 0}${secs % 60}`;
}
