import React from "react";
import { Modal, StyleSheet, View } from "react-native";
import { SvgProps, Path, Circle, NumberProp } from "react-native-svg"
import SvgPanZoom from "react-native-svg-pan-zoom"
import { Card, Text } from "react-native-ui-lib";

interface IPin {
    r?: NumberProp,
    onPress?: () => any,
    cx: NumberProp,
    cy: NumberProp,
    fill?: string,
}
interface GroundFloorMapProps extends SvgProps {
    pinsR: number,
    pinsColour: string,
    pins?: IPin[]
}

interface IProps {

}

export default function Parter(props: IProps) {
    const [pinContent, setPinContent] = React.useState<React.ReactElement>();
    const pins: IPin[] = [
        {
            cx: 200,
            cy: 120,
            onPress: () => setPinContent(<Text>You have touched the pin!</Text>)
        }
    ]
    return (
        <View style={styles.page}>
            <Modal transparent visible={!!pinContent}>
                <View style={styles.centeredView}>
                    <Card style={styles.card} onPress={() => setPinContent(undefined)}>
                        {pinContent}
                    </Card>
                </View>
            </Modal>
            <GroundFloorMap pinsColour="#795040" pins={pins} pinsR={14} />
        </View>
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