import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, TextBase, View } from "react-native";

interface IProps {
    target: any;
    title: string;
    backgroundColor?: string;
    titleColor?: string;
    style?: any;
}

export function TowerRoofLink(props: IProps) {
    const styles = StyleSheet.create({
        buttonContainer: {
            width: "100%",
            height: 80,
            borderColor: 'black',
            borderWidth: 2,
            backgroundColor: props.backgroundColor,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center'
        },
        buttonTitle: {
            position: 'absolute',
            left: "50%",
            top: "50%",
            fontSize: 30,
            width: 'auto',
            color: props.titleColor,
            transformOrigin: "50"
        },
        leftRoof: {
            height: 100,
            width: "50%",
            top: 0,
            transformOrigin: "top right",
            transform: [{ rotateZ: "-15deg" }],
            backgroundColor: props.backgroundColor
        },
        rightRoof: {
            height: 100,
            width: "50%",
            top: -100,
            left: "50%",
            transformOrigin: "top left",
            transform: [{ rotateZ: "15deg" }],
            backgroundColor: props.backgroundColor

        }
    });

    return (
        <Link
            style={{ position: 'relative', height: 100, overflow: 'hidden' }}
            href={{ pathname: props.target }}
            asChild
        >
            <Pressable>
                <View style={styles.leftRoof} />
                <View style={styles.rightRoof} />
                <Text style={styles.buttonTitle}>
                    Roof
                </Text>
            </Pressable>
        </Link>
    )
}