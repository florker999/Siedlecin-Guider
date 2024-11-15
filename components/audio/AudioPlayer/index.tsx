import { View, Easing } from "react-native";
import * as Progress from "react-native-progress";
import React from "react";
import IconButton from "../../basic/iconButton";
import styles from "./styles";
import IProps from "./IProps";
import { Assets, Button, ButtonSize, Icon, Text } from "react-native-ui-lib";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function AudioPlayer(props: IProps) {
  const [position, setPosition] = React.useState(0);
  const [duration, setDuration] = React.useState<number>();

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
            if (res.isLoaded) {
              setDuration(res.durationMillis);
            }
          });
        } else if (status.isPlaying && !play) {
          // pause track if is playing but shouldn't and do pause callback
          audio.pauseAsync().then(() => onPause());
        }
      }
    });
  }, [audio, play]);

  const icons = {
    play: require("@/assets/icons/play.png"),
    pause: require("@/assets/icons/pause.png"),
  };

  return (
    <View style={[styles.audioPlayer, props.style]}>
      <View style={styles.mainPart}>
        <Text style={styles.audioTitle}>{title}</Text>
        <MaterialIcons.Button
          name={play ? "pause" : "play-arrow"}
          size={22}
          onPress={play ? onPause : onPlay}
        />
      </View>
      <View style={styles.progressPart}>
        <Text style={styles.positionLabel}>
          {milisToString(position)}/
          {duration ? milisToString(duration) : "--:--"}
        </Text>
        <View style={styles.progressBarContainer}>
          <Progress.Bar
            width={null}
            progress={duration ? position / duration : undefined}
            animationType="timing"
            animationConfig={{ easing: Easing.linear }}
            useNativeDriver
          />
        </View>
      </View>
    </View>
  );
}

function milisToString(milis: number): string {
  const secs = Math.floor(milis / 1000);
  const mins = Math.floor(secs / 60);

  return `${mins < 10 && 0}${mins}:${secs < 10 && 0}${secs % 60}`;
}
