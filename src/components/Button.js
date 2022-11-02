import { TouchableOpacity, View, Text } from "react-native";

const Button = (props) => {
  return (
    <View>
      <TouchableOpacity
        {...props}
        style={{
          width: "30%",
          height: 30,
          alignItems: "center",

          backgroundColor: "red",
          alignSelf: "center",
        }}
      >
        <Text style={{ alignSelf: "center" }}>{props.title}</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Button;
