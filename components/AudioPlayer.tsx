import { Pressable, View, Text, StyleSheet } from "react-native";
import React from "react";
import { Audio } from "expo-av";

interface IProps {
    title: string;
    audio: any;
}

export default function AudioPlayer(props: IProps) {
    const [sound, setSound] = React.useState<Audio.Sound>();

    React.useEffect(() => {
        Audio.Sound.createAsync(props.audio)
            .then(res => setSound(res.sound));
    }, []);

    return (
        <View style={styles.audioButton}>
            <Text style={styles.audioTitle}>
                {props.title}
            </Text>
            <View style={styles.buttonsContainer}>
                <Pressable style={styles.buttonStart} onPress={() => sound?.playAsync()}>
                    <Text style={styles.buttonTitle}>
                        Start
                    </Text>
                </Pressable>
                <Pressable style={styles.buttonPause} onPress={() => sound?.pauseAsync()}>
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