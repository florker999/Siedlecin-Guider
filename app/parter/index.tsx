import { ButtonWithImage } from "@/components/ButtonWithImage";
import { StyleSheet, View } from "react-native";

interface IProps {

}

export default function Parter(props: IProps) {
    return (
        <View style={styles.page}>
            <ButtonWithImage
                target="/parter/recordings"
                title="Audoioguide"
            />
            <ButtonWithImage
                target="/parter/recordings"
                title="Purple dots"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        display: 'flex'
    }
})