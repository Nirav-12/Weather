import { View, Text, StyleSheet } from "react-native";

const Card = (props) => {
  return (
    <View style={styles.view}>
      {props.children}
      <Text style={styles.text}>{props.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: { color: "white" },
  view: {
    margin: 10,
    flexDirection: "row",
    borderWidth: 1,
    height: 50,
    width: 230,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
});
export default Card;
