import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-paper";
import { RoundedButton } from "../components/RoundedButton";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../utils/color";

export const Focus = ({ addSubject }) => {
  const [value, setValue] = useState(null);
  return (
    <View style={styles.inputContainer}>
      <TextInput
        theme={{ colors: { primary: colors.inputcolor } }}
        style={styles.textInput}
        label="What would you like to focus on?"
        onChangeText={setValue}
      />
      <RoundedButton
        style={styles.startBtn}
        size={50}
        color={colors.inputcolor}
        onPress={() => addSubject(value)}
        textStyle={{ fontSize: 25 }}
      >
        <MaterialIcons name="add" size={24} color={colors.inputcolor} />
      </RoundedButton>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: "top",
    alignItems: "center",
    gap: 5,
    marginTop: 20,
    marginBottom: 10,
    flexDirection: "row",
  },
  textInput: {
    borderTopEndRadius: 0,
    borderTopStartRadius: 0,
    overflow: "hidden",
    flex: 1,
    backgroundColor: "#fff",
  },
  startBtn: {
    position: "absolute",
    right: 5,
  },
});
