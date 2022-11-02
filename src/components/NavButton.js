import { View, Text, TouchableOpacity } from "react-native";

const NavButton = (props) => {
  return (
    <TouchableOpacity {...props}>
      <Text> {props.text} </Text>
    </TouchableOpacity>
  );
};

export default NavButton;
