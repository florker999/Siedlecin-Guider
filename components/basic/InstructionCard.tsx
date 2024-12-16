import { Modal, StyleSheet, Text, View } from "react-native";
import { Avatar, Button } from "react-native-ui-lib";

interface IProps {
  onButtonClick: () => void;
}

export default function InstructionCard(props: IProps) {
  const styles = StyleSheet.create({
    container: {
      width: "90%",
      backgroundColor: "white",
      borderRadius: 18,
      padding: 15,
      maxWidth: 400,
      position: "relative",
      alignItems: "center",
    },
    button: {
      marginTop: 10,
    },
    profile: {
      position: "absolute",
      left: -10,
      bottom: -10,
    },
  });

  return (
    <View style={styles.container}>
      <Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet iure
        distinctio id maiores atque ipsam alias error quia. Voluptatibus fugiat
        omnis recusandae vitae nostrum nobis sed velit temporibus laudantium
        natus.
      </Text>
      <Button
        label={"Understood"}
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
