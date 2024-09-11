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
    const [position, setPosition] = React.useState('00:00');
    const [duration, setDuration] = React.useState('--:--');

    React.useEffect(() => {
        Audio.Sound
            .createAsync(props.audio)
            .then(res => {
                if (res.status.isLoaded) {
                    setDuration(res.status.durationMillis ? milisToString(res.status.durationMillis) : '--:--');
                }
                res.sound.setOnPlaybackStatusUpdate(status => {
                    if (status.isLoaded) {
                        if (status.isPlaying) {
                            setPosition(milisToString(status.positionMillis));
                        }

                        if (status.didJustFinish) {
                            setPosition(milisToString(0));

                            if (props.onFinish) {
                                props.onFinish();
                            }
                        }
                    }
                })
                setSound(res.sound)
            });
    }, []);

    React.useEffect(() => {
        if (props.play) {
            sound?.playAsync();
        } else {
            sound?.pauseAsync();
        }
    }, [props.play]);

    const onPressStart = React.useCallback(() => {
        const { onPlay = () => undefined } = props;

        onPlay();
        sound?.playAsync();
    }, [sound]);

    const onPressPause = React.useCallback(() => {
        const { onPause = () => undefined } = props;

        onPause();
        sound?.pauseAsync();
    }, [sound]);

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
                <View style={styles.positionLabel}>
                    <Text>{position}/{duration}</Text>
                </View>
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
    },
    positionLabel: {

    }
});

function milisToString(milis: number): string {
    const secs = Math.floor(milis / 1000);
    const mins = Math.floor(secs / 60);

    return `${mins < 10 && 0}${mins}:${secs < 10 && 0}${secs % 60}`;
}