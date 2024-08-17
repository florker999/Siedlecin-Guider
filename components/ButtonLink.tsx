import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface IProps {
    target: any;
    title: string;
    backgroundColor?: string;
    titleColor?: string;
}

export function ButtonLink(props: IProps) {
    const styles = StyleSheet.create({
        ButtonContainer: {
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
        ButtonTitle: {
            fontSize: 30,
            width: 'auto',
            color: props.titleColor
        }
    });

    return (
        <Link
            style={styles.ButtonContainer}
            href={{ pathname: props.target }}
            asChild
        >
            <Pressable>
                <View>
                    <Text style={styles.ButtonTitle}>
                        {props.title}
                    </Text>
                </View>
            </Pressable>
        </Link>
    )
}