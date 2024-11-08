import { StyleSheet, View } from "react-native";
import { TowerFloorLink } from "./TowerFloorLink";
import { TowerRoofLink } from "./TowerRoofLink";

interface IProps {}

export default function Tower(props: IProps) {
  return (
    <View style={styles.towerContainer}>
      <TowerFloorLink
        target="/parter"
        title="Roof"
        backgroundColor="#004080"
        titleColor="white"
        style={styles.noBottomBorder}
      />
      <TowerFloorLink
        target="/parter"
        title="III Floor"
        backgroundColor="#000080"
        titleColor="white"
        style={styles.noBottomBorder}
      />
      <TowerFloorLink
        target="/parter"
        title="II Floor"
        backgroundColor="#400080"
        titleColor="white"
        style={styles.noBottomBorder}
      />
      <TowerFloorLink
        target="/parter"
        title="I Floor"
        backgroundColor="#800080"
        titleColor="white"
        style={styles.noBottomBorder}
      />
      <TowerFloorLink
        target="/parter"
        title="Ground Floor"
        backgroundColor="#800040"
        titleColor="white"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  towerContainer: {},
  noBottomBorder: {
    borderBottomWidth: 0,
  },
});
