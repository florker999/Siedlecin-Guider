import AudioPlayer from "@/components/audio/AudioPlayer";
import React from "react";
import { ScrollView } from "react-native";

interface IProps {

}

export default function TourTab(props: IProps) {
    const [trackIndex, setTrackIndex] = React.useState<number>();

    const onPlay = (index: number) => {
        console.log("Started to play: " + index)
        setTrackIndex(index);
    };

    const onFinish = (index: number) => {
        console.log("Finished playing: " + index); 
        setTrackIndex(index+1)
        // more than tracks?
    };

    const guideTracks: JSX.Element[] = [];
    for (let index = 0; index < 15; index++) {
        const newTrack = (
            <AudioPlayer
                key={index}
                title={"Track " + index}
                audio={require("@/assets/recordings/parter1.mp3")}
                onPlay={() => onPlay(index)}
                onPause={() => setTrackIndex(undefined)}
                onFinish={() => onFinish(index)}
                play={trackIndex === index}
            />
        )
        guideTracks.push(newTrack);
    }

    return (
        <ScrollView>
            {guideTracks}
        </ScrollView>
    )
}