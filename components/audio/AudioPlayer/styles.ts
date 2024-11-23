import { StyleSheet } from "react-native";

export default StyleSheet.create({
    audioPlayer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        rowGap: 5,
        position: 'relative',
        padding: 15
    },
    mainPart: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    audioTitle: {
        fontWeight: "bold"
    },
    positionLabel: {
        textAlign: 'center'
    },
    progressPart: {
        display: "flex",
        flexDirection: "column",
        alignItems: 'flex-start',
        width: '100%'
    },
    playButton: {
        position: 'absolute',
        right: 15,
        top: '50%',
        transform: [{ translateY: '-50%' }],
        zIndex: 5
    },
    durationContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingLeft: 2,
        paddingRight: 2
    },
    durationLabel: {

    }
});