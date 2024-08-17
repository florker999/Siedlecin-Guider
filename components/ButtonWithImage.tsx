import { Link } from "expo-router";
import React from "react";
import { ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";

interface IProps {
    target: any;
    title: string;
}

export function ButtonWithImage(props: IProps) {
    return (
        <View style={styles.ButtonContainer}>
            <Link
                href={{ pathname: props.target }}
                asChild
            >
                <Pressable>
                    <ImageBackground
                        source={require('@/assets/images/image1.heic')}
                        style={styles.ButtonImage}
                    >
                        <Text style={styles.ButtonTitle}>
                            {props.title}
                        </Text>
                    </ImageBackground>
                </Pressable>
            </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    ButtonContainer: {
        width: "100%",
        height: 100,
    },
    ButtonImage: {
        width: "100%",
        height: 90,
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    ButtonTitle: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})