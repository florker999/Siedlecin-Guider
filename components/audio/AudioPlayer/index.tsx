import { View, Text, Animated, Easing, StyleProp, ViewStyle } from "react-native";
import React from "react";
import { Audio } from "expo-av";
import IconButton from "../../basic/iconButton";
import styles from "./styles";

interface IProps {
    title: string,
    audio: Audio.Sound,
    play: boolean,
    onPlay(): any,
    onPause(): any,
    onFinish(): any,
    style?: StyleProp<ViewStyle>[]
}

export default function AudioPlayer(props: IProps) {
    const [position, setPosition] = React.useState(0);
    const [duration, setDuration] = React.useState<number>();

    const progressBarWidth1 = React.useRef(new Animated.Value(-1)).current;
    const progressBarWidth2 = React.useRef(new Animated.Value(1)).current;

    const animation = React.useRef<Animated.CompositeAnimation>();

    React.useEffect(() => {
        props.audio.setOnPlaybackStatusUpdate(status => {
            if (status.isLoaded) {
                if (status.isPlaying) {
                    setPosition(status.positionMillis);
                } else if (status.didJustFinish) {
                    setPosition(0);

                    if (props.onFinish) {
                        props.onFinish();
                    }
                }
            }
        });
    }, []);

    React.useEffect(() => {
        if (props.play) {
            props.audio.playAsync()
                .then(status => {
                    if (status.isLoaded) {
                        const { durationMillis, positionMillis } = status;

                        if (!duration) {
                            setDuration(durationMillis);
                        }

                        if (durationMillis) {
                            animation.current = Animated.parallel([
                                Animated.timing(progressBarWidth1, {
                                    toValue: 0,
                                    duration: durationMillis - positionMillis,
                                    useNativeDriver: true,
                                    easing: Easing.linear
                                }),
                                Animated.timing(progressBarWidth2, {
                                    toValue: 0,
                                    duration: durationMillis - positionMillis,
                                    useNativeDriver: true,
                                    easing: Easing.linear
                                })
                            ]);
                            animation.current.start();
                        }
                    }
                })
        } else {
            props.audio.pauseAsync()
                .then(() => {
                    animation.current?.stop();
                })
        }
    }, [props.play]);

    const { title, play, onPlay, onPause } = props;
    const icons = {
        play: require("@/assets/icons/play.png"),
        pause: require("@/assets/icons/pause.png")
    }

    return (
        <View style={[styles.audioPlayer, props.style]}>
            <View style={styles.mainPart}>
                <Text style={styles.audioTitle}>
                    {title}
                </Text>
                <IconButton
                    icon={icons[play ? 'pause' : 'play']}
                    onPress={play ? onPause : onPlay}
                />
            </View>
            <View style={styles.progressPart}>
                <Text style={styles.positionLabel}>{milisToString(position)}/{duration ? milisToString(duration) : '--:--'}</Text>
                <View style={styles.progressBarContainer}>
                    <Animated.View style={[styles.progressBarColor, styles.progressBarHeight, { width: '100%', left: progressBarWidth1.interpolate({ inputRange: [-1, 0], outputRange: ['-100%', '0%'] }) }]} />
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