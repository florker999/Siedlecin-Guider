import { Pressable, View, Text, StyleSheet } from "react-native";
import React from "react";
import { Audio } from "expo-av";

interface IProps {
    title: string,
    audio: any,
    play: boolean,
    onPlay?(): any,
    onPause?(): any,
    onFinish?(): any
}

export default function AudioPlayer(props: IProps) {
    const [sound, setSound] = React.useState<Audio.Sound>();

    React.useEffect(() => {
        Audio.Sound
            .createAsync(props.audio)
            .then(res => {
                res.sound.setOnPlaybackStatusUpdate(status => {
                    if (status.isLoaded) {
                        if (status.didJustFinish && props.onFinish) {
                            props.onFinish();
                        }
                    }
                })
                setSound(res.sound)
            });
    }, []);

    React.useEffect(() => {
        if (props.play) {
            console.log("Player: I'm playing.");
            sound?.playAsync();
        } else {
            sound?.pauseAsync();
            console.log("Player: Changed my play prop.");
        }
    }, [props.play]);

    const onPressStart = () => {
        const { onPlay = () => undefined } = props;

        onPlay();
        sound?.playAsync();
    };

    const onPressPause = () => {
        const { onPause = () => undefined } = props;

        onPause();
        sound?.stopAsync();
    }

    return (
        <View style={styles.audioButton}>
            <Text style={styles.audioTitle}>
                {props.title}
            </Text>
            <View style={styles.buttonsContainer}>
                <Pressable style={[styles.buttonStart, !props.play && { backgroundColor: "blue" }]} onPress={onPressStart}>
                    <Text style={styles.buttonTitle}>
                        Start
                    </Text>
                </Pressable>
                <Pressable style={[styles.buttonPause, props.play && { backgroundColor: "blue" }]} onPress={onPressPause}>
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