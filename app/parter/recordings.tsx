import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import AudioPlayer from "@/components/audio/AudioPlayer";

interface IProps {

}

export default function RecordingPage(props: IProps) {
    return (
        <ScrollView>
            <View style={styles.audioContainer}>
                <AudioPlayer title="Painting" audio={require('@/assets/recordings/parter1.mp3')} play={false}/>
                <AudioPlayer title="Nails" audio={require('@/assets/recordings/parter1.mp3')} play={false}/>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    audioContainer: {
        display: 'flex',
        rowGap: 15,
        width: "90%",
        marginHorizontal: 'auto'
    }
});