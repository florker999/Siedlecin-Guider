import InstructionCard from "@/components/basic/InstructionCard";
import React from "react";
import { Modal, StyleSheet, View } from "react-native";
import { SvgProps, Path, Circle, NumberProp } from "react-native-svg"
import SvgPanZoom from "react-native-svg-pan-zoom"

interface IPin {
    r?: NumberProp,
    onPress?: () => any,
    cx: NumberProp,
    cy: NumberProp,
    fill?: string,
    content: string,
    audioSource: any,
}
interface GroundFloorMapProps extends SvgProps {
    pinsR: number,
    pinsColour: string,
    pins?: IPin[]
}

interface IProps {

}

export default function Parter(props: IProps) {
    const [getPin, setPin] = React.useState<IPin>();
    const [showWelcomingWindow, setShowWelcomingWindow] = React.useState(true);

    const pins: IPin[] = [
        {
            cx: 200,
            cy: 120,
            onPress: () => setPin(pins[0]), // TODO change
            content: "Na XIV-wiecznej belce stropowej dostrzec można pięć kutych gwoździ, rozmieszczonych w jednakowych odstępach - co 120 cm. Służyły one do wieszania dekoracyjnych tkanin, które przykrywały ścianę ciepłej izby.",
            audioSource: require("@/assets/recordings/parter1.mp3")
        }
    ]
    return (
        <View style={styles.page}>
            <Modal transparent visible={showWelcomingWindow} animationType="slide">
                <View style={styles.centeredView}>
                    <InstructionCard
                        onButtonClick={() => setShowWelcomingWindow(false)}
                        content="Jeśli chcesz przyjrzeć się planowi piętra, na którym jesteś, wybierz je z listy. Każda mapka posiada też punkty, które po dotknięciu zdradzą więcej informacji o wskazanym miejscu."
                        buttonTitle="Rozumiem"
                        audioSource={require("@/assets/recordings/instructions/map.mp3")}
                    />
                </View>
            </Modal>
            {
                getPin &&
                <Modal transparent>
                    <View style={styles.centeredView}>
                        <InstructionCard
                            onButtonClick={() => setPin(undefined)}
                            buttonTitle="Zamknij"
                            content={getPin?.content}
                            audioSource={getPin?.audioSource}
                        />
                    </View>
                </Modal >
            }
            <GroundFloorMap pinsColour="#795040" pins={pins} pinsR={14} />
        </View >
    )
}

const styles = StyleSheet.create({
    page: {
        width: '100%',
        height: '100%'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000000D8",
    },
    card: {
        width: "90%",
        backgroundColor: "white",
        borderRadius: 18,
        padding: 15,
        maxWidth: 400,
        position: "relative",
        alignItems: "center",
    }
})

const GroundFloorMap = (props: GroundFloorMapProps) => (
    <SvgPanZoom {...props}>
        <Path
            d="M52.219 61.502h403.253v252.296H52.219z"
            fill="#d8d8d8"
            stroke="#795040"
            strokeWidth={31}
        />
        <Path
            d="m63.167 186.368 378.093 1.398M331.887 75.945l1.397 223.642"
            fill="#d8d8d8"
            stroke="#795040"
            strokeWidth={6}
        />
        {
            props.pins?.map((pin, index) => (
                <Circle fill={props.pinsColour} r={props.pinsR} {...pin} key={index} />
            ))
        }
    </SvgPanZoom>
);