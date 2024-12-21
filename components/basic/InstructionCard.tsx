import { Modal, StyleSheet, Text, View } from "react-native";
import { Avatar, Button } from "react-native-ui-lib";

interface IProps {
  onButtonClick: () => void;
  content: string;
  buttonTitle: string;
}

export default function InstructionCard(props: IProps) {
  const styles = StyleSheet.create({
    container: {
      width: "90%",
      backgroundColor: "white",
      borderRadius: 18,
      padding: 18,
      maxWidth: 400,
      position: "relative",
      alignItems: "center",
    },
    button: {
      marginTop: 20,
    },
    profile: {
      position: "absolute",
      left: -10,
      bottom: -10,
    },
    content: {
      fontSize: 20
    },
    buttonTitle: {
      fontSize: 18
    }
  });

  return (
    <View style={styles.container}>
      <Text style={styles.content}>
        {props.content}
      </Text>
      <Button
        label={props.buttonTitle}
        labelStyle={styles.buttonTitle}
        onPress={props.onButtonClick}
        style={styles.button}
        fullWidth={false}
      />
      <Avatar
        source={require("@/assets/images/guider_face.jpg")}
        containerStyle={styles.profile}
      />
    </View>
  );
}
