import { View, TextInput, StyleSheet } from "react-native";

const UserInput = (props) => {
  return (
    <View style={styles.view}>
      <TextInput
        placeholder={props.text}
        style={styles.textInpute}
        {...props}
        secureTextEntry={props.type === "password"}
        keyboardType={props.type === "password" ? "number-pad" : "default"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  view: { alignItems: "center" },
  textInpute: {
    borderWidth: 1,
    height: 50,
    width: "70%",
    borderRadius: 15,
    backgroundColor: "white",
  },
});

export default UserInput;
