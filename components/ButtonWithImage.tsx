import { Link } from "expo-router";
import React from "react";
import { ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";

interface IProps {
    target: any;
    title: string;
}

export function ButtonWithImage(props: IProps) {
    return (
        <View style={styles.buttonContainer}>
            <Link
                href={{ pathname: props.target }}
                asChild
            >
                <Pressable>
                    <ImageBackground
                        source={require('@/assets/images/image1.heic')}
                        style={styles.buttonImage}
                    >
                        <Text style={styles.buttonTitle}>
                            {props.title}
                        </Text>
                    </ImageBackground>
                </Pressable>
            </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: "100%",
        height: 100,
    },
    buttonImage: {
        width: "100%",
        height: 90,
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    buttonTitle: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})