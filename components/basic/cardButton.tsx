import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { StyleSheet } from "react-native";
import { Card, Text } from "react-native-ui-lib";

interface IProps {
    iconName: string,
    title: string
}

export default function CardButton(props: IProps) {
    return (
        <Card style={styles.card}>
            <MaterialIcons name={props.iconName as any} size={72} />
            <Text numberOfLines={1} style={styles.title}>{props.title}</Text>
        </Card>
    )
}

const styles = StyleSheet.create({
    card: {
        display: 'flex',
        flexDirection: 'row',
        padding: 12,
        alignItems: 'center',
        columnGap: 12,
        width: '100%'
    },
    title: {
        fontSize: 45,
        flexGrow: 1,
        flexShrink: 1,
        overflow: 'hidden'
    }
})