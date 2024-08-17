import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import AudioPlayer from "@/components/AudioPlayer";

interface IProps {

}

export default function RecordingPage(props: IProps) {

    return (
        <ScrollView>
            <View style={styles.audioContainer}>
                <AudioPlayer title="Painting" />
                <AudioPlayer title="Nails" />
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