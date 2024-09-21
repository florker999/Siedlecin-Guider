import { Image, Pressable, StyleProp, ViewStyle } from "react-native"

interface IProps {
    icon: any,
    onPress: () => any,
    title?: string,
    style?: StyleProp<ViewStyle>
}

export default function IconButton(props: IProps) {
    return (
        <Pressable onPress={props.onPress} style={props.style}>
            <Image source={props.icon} />
        </Pressable>
    )
}