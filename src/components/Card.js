import { View, Text, StyleSheet } from "react-native";

const Card = ({ text, icon }) => {
  return (
    <View style={styles.view}>
      <Text style={{ fontSize: 30 }}>{icon}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: { margin: 5, fontSize: 18 },
  view: {
    margin: 10,
    flexDirection: "row",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
});
export default Card;
