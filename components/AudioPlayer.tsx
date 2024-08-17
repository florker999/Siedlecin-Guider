import { Pressable, View, Text, StyleSheet } from "react-native";
import { Audio } from "expo-av";
import React from "react";

interface IProps {
    title: string;
    //audioSrc: string;
}

export default function AudioPlayer(props: IProps) {
    const [audio, setAudio] = React.useState<Audio.Sound>();

    React.useEffect(() => {
        Audio.Sound
            .createAsync(require("@/assets/recordings/parter1.mp3"))
            .then(res => setAudio(res.sound));
    }, [])
    return (
        <View style={styles.audioButton}>
            <Text style={styles.audioTitle}>
                {props.title}
            </Text>
            <View style={styles.buttonsContainer}>
                <Pressable style={styles.buttonStart} onPress={() => audio?.playAsync()}>
                    <Text style={styles.buttonTitle}>
                        Start
                    </Text>
                </Pressable>
                <Pressable style={styles.buttonPause} onPress={() => audio?.pauseAsync()}>
                    <Text style={styles.buttonTitle}>
                        Pause
                    </Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    audioButton: {
        height: 80,
        borderColor: 'black',
        borderWidth: 2,
        display: 'flex'
    },
    audioTitle: {
        textAlign: 'center'
    },
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    buttonStart: {
        borderColor: 'blue',
        borderWidth: 1,
        borderRadius: 20,
        width: '25%',
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonPause: {
        borderColor: 'blue',
        borderWidth: 1,
        borderRadius: 20,
        width: '25%',
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonTitle: {
    }
});