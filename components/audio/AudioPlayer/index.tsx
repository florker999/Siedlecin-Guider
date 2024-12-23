import { View, Easing, Animated } from "react-native";
import React from "react";
import styles from "./styles";
import IProps from "./IProps";
import { Card, Text, Button } from "react-native-ui-lib";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import ProgressBar from "@/components/basic/progressBar";
import { Colors } from "@/constants/Colors";
import Reanimated, { LinearTransition } from "react-native-reanimated";

const AnimatedCard = Reanimated.createAnimatedComponent(Card);

export default function AudioPlayer(props: IProps) {
  const [position, setPosition] = React.useState(0);
  const [duration, setDuration] = React.useState<number>();
  const [isCollapsed, setIsCollapsed] = React.useState(true);
  const progressAnim = React.useRef(new Animated.Value(0)).current;
  const progressAnim2 = React.useRef(new Animated.Value(-50)).current;
  const cardInfoHeight = React.useRef(new Animated.Value(0)).current;

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
    return () => {
      audio.stopAsync();
    }
  }, [audio, play]);

  const icons = {
    play: require("@/assets/icons/play.png"),
    pause: require("@/assets/icons/pause.png"),
  };

  const positionToDuration: number = duration ? position / duration : 0;
  const displayInfo = () => {
    Animated.timing(cardInfoHeight, {
      toValue: 1,
      easing: Easing.linear,
      useNativeDriver: true,
      duration: 500
    }).start()
  }

  return (
    <AnimatedCard layout={LinearTransition} style={styles.mainContainer} onPress={() => props.description && setIsCollapsed(!isCollapsed)}>
      <View style={styles.audioPlayer}>
        <View style={styles.mainPart}>
          <Text style={styles.audioTitle}>{title}</Text>
        </View>
        <Button
          onPress={play ? onPause : onPlay}
          backgroundColor={Colors.light.tint}
          iconSource={() => (
            <MaterialIcons name={play ? "pause" : "play-arrow"} size={40} color={'white'} />
          )}
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
      </View>
      <View>
        {!isCollapsed &&
          <Text style={styles.recordingDescription}>{props.description}</Text>
        }
      </View>
    </AnimatedCard>
  );
}

function milisToString(milis: number): string {
  const secs = Math.floor(milis / 1000);
  const mins = Math.floor(secs / 60);

  return `${mins < 10 ? 0 : ''}${mins}:${secs < 10 ? 0 : ''}${secs % 60}`;
}
