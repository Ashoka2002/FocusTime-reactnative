import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { colors } from "../utils/color";

export const RoundedButton = ({ style = {}, textStyle = {}, size = 110, children, ...props }) => {
  return (
    <TouchableOpacity style={[styles(size).radius, style]} onPress={props.onPress}>
      {!children && <Text style={[styles(size).text, textStyle]}>{props.title}</Text>}
      {children}
    </TouchableOpacity>
  );
};

const styles = (size) => ({
  radius: {
    borderRadius: size / 2,
    width: size,
    height: size,
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.white,
    borderWidth: 2,
  },
  text: { color: colors.white, fontSize: size / 3 },
});
