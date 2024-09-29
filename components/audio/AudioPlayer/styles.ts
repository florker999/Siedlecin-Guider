import { StyleSheet } from "react-native";

export default StyleSheet.create({
    audioPlayer: {
        height: 50,
        borderColor: 'black',
        borderBottomWidth: 2,
        display: 'flex',
        justifyContent: 'center',
        position: 'relative'
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
        width: '100%',
        textAlign: 'center'
    },
    progressPart: {
        display: "flex",
        flexDirection: "column",
        alignItems: 'flex-start',
        position: 'absolute',
        bottom: 0,
        width: '100%'
    },
    progressBarContainer: {
        width: '100%',
        position: 'relative'
    },
    progressBar: {
        position: 'absolute'
    },
    progressBarHeight: {
        height: 4
    },
    progressBarColor: {
        backgroundColor: '#f0dbb0'
    },
    noTopBorder: {
        borderTopWidth: 0
    }
});