import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Audio, AVPlaybackStatus } from "expo-av";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, Button } from "react-native-ui-lib";

interface IProps {
  onButtonClick: () => void;
  content: string;
  buttonTitle: string;
  audioSource: any;
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 18,
    padding: 18,
    maxWidth: 400,
    position: "relative",
    alignItems: "center",
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    columnGap: 20
  },
  button: {
  },
  profile: {
    position: "absolute",
    left: -10,
    bottom: -10,
  },
  content: {
    fontSize: 20
  },
  buttonTitle: {
    fontSize: 18
  }
});

export default function InstructionCard(props: IProps) {
  const [getAudio, setAudio] = React.useState<Audio.Sound>();

  React.useEffect(() => {
    Audio.Sound.createAsync(props.audioSource)
      .then(res => {
        setAudio(res.sound);

      })
  }, []);

  const headphonesButtonH = async () => {
    if (getAudio) {
      try {
        let status: AVPlaybackStatus;
        do {
          status = await getAudio.getStatusAsync()

        } while (!status.isLoaded);

        if (status.isPlaying) {
          getAudio.pauseAsync();

        } else {
          getAudio.playAsync();

        }
      } catch (error) {

      }

    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.content}>
        {props.content}
      </Text>
      <View style={styles.buttonsContainer}>
        <Button
          label={props.buttonTitle}
          labelStyle={styles.buttonTitle}
          onPress={() => { getAudio?.stopAsync(); props.onButtonClick(); }}
          style={styles.button}
        />
        <Button
          iconSource={() => <MaterialIcons name="headphones" size={25} color={'white'} />}
          labelStyle={styles.buttonTitle}
          style={{ width: 40 }}
          onPress={headphonesButtonH}
        // TODO
        />

      </View>
      <Avatar
        source={require("@/assets/images/guider_face.jpg")}
        containerStyle={styles.profile}
      />
    </View>
  );
}
