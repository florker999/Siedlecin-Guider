import React from "react";
import { Modal, StyleSheet, View } from "react-native";
interface IProps {

}

export default function Parter(props: IProps) {
    const [pinContent, setPinContent] = React.useState<React.ReactElement>();
    return (
        <View style={styles.page}>
            <Modal transparent visible={!!pinContent}>
                <View style={styles.centeredView}>
                    <Card style={styles.card} onPress={() => setPinContent(undefined)}>
                        {pinContent}
                    </Card>
                </View>
            </Modal>
            <GroundFloorMap onSelectRetirada={() => setPinContent(<Text>You have touched the pin!</Text>)} pinsR={14} />
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

import { SvgProps, Path, Circle } from "react-native-svg"
import SvgPanZoom from "react-native-svg-pan-zoom"
import { Card, Text } from "react-native-ui-lib";

interface GroundFloorMapProps extends SvgProps {
    pinsR: number,
    onSelectRetirada(): any,
/*     onSelectIzba(): any,
    onSelectSala(): any,
    onSelectWykusz(): any,
 */}

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
        <Circle
            onPress={props.onSelectRetirada}
            cx={387.642}
            cy={121.023}
            r={props.pinsR}
            fill="#795040"
            stroke="#795040"
        //paintOrder="fill"
        />
        <Circle
            cx={393.582}
            cy={249.268}
            r={props.pinsR}
            fill="#795040"
            stroke="#795040"
        //paintOrder="fill"
        />
        <Circle
            id="a"
            cx={175.532}
            cy={261.149}
            r={props.pinsR}
            fill="#795040"
            stroke="#795040"
        //paintOrder="fill"
        />
        <Circle
            cx={179.725}
            cy={94.117}
            r={props.pinsR}
            fill="#795040"
            stroke="#795040"
        //paintOrder="fill"
        />
    </SvgPanZoom>
);