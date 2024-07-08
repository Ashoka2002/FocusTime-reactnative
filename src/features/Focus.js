import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { colors } from "../utils/color";
import { RoundedButton } from "../components/RoundedButton";

export const Focus = ({ addSubject }) => {
  const [value, setValue] = useState(null);
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput style={styles.textInput} label="What would you like to focus on?" onChangeText={setValue} />
        <RoundedButton size={50} onPress={() => addSubject(value)} title="+" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  inputContainer: {
    justifyContent: "top",
    alignItems: "center",
    gap: 5,
    padding: 20,
    marginTop: 20,
    flexDirection: "row",
  },
  textInput: {
    flex: 1,
  },
});
