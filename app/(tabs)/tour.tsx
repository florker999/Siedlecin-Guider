import AudioPlayer from "@/components/audio/AudioPlayer";
import InstructionCard from "@/components/basic/InstructionCard";
import { Audio } from "expo-av";
import { Sound } from "expo-av/build/Audio";
import React from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Modal,
  StyleSheet,
  View,
} from "react-native";

type Timeout = ReturnType<typeof setTimeout>;

interface IProps { }

export default function TourTab(props: IProps) {
  const [showWelcomingWindow, setShowWelcomingWindow] = React.useState(true);
  const [trackIndex, setTrackIndex] = React.useState<number>();
  const [tracks, setTracks] = React.useState<Sound[]>();
  const [timer, setTimer] = React.useState<Timeout>();

  const onPlay = React.useCallback(
    (index: number) => {
      if (timer) {
        clearTimeout(timer);
        setTimer(undefined);
      }

      setTrackIndex(index);
    },
    [trackIndex],
  );

  const onFinish = React.useCallback(
    (index: number) => {
      setTrackIndex(undefined);
      if (timer) {
        clearTimeout(timer);
      }

      // TODO describe and finilize achiving the end of tour
      const newTimer = setTimeout(() => setTrackIndex(index + 1), 1000);
      setTimer(newTimer);
      // more than tracks?
    },
    [timer],
  );

  React.useEffect(() => {
    const promises: Promise<Sound>[] = [];

    for (let index = 0; index < 15; index++) {
      const newPromise = Audio.Sound.createAsync(
        require("@/assets/recordings/parter1.mp3"),
        { progressUpdateIntervalMillis: 1 },
      ).then((res) => res.sound);
      promises.push(newPromise);
    }

    Promise.all(promises).then((res) => setTracks(res));
  }, []);

  return (
    <SafeAreaView>
      <Modal transparent visible={showWelcomingWindow} animationType="slide">
        <View style={styles.centeredView}>
          <InstructionCard
            onButtonClick={() => setShowWelcomingWindow(false)}
          />
        </View>
      </Modal>
      <ScrollView
        style={styles.playersContainer}
        contentContainerStyle={{ rowGap: 15 }}
      >
        {tracks?.map((track, index) => (
          <AudioPlayer
            key={index}
            title={"Track " + index}
            audio={track}
            onPlay={() => onPlay(index)}
            onPause={() => setTrackIndex(undefined)}
            onFinish={() => onFinish(index)}
            play={trackIndex === index}
            style={[
              !index && { borderTopWidth: 0 },
              index === tracks.length - 1 && { borderBottomWidth: 0 },
            ]}
          />
        )) || <ActivityIndicator />}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000D8",
  },
  playersContainer: {
    paddingLeft: 15,
    paddingRight: 15,
    padding: 4,
    display: "flex",
    flexDirection: "column",
    rowGap: 15,
  },
});
