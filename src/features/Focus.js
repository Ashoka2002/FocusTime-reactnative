import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-paper";
import { RoundedButton } from "../components/RoundedButton";

export const Focus = ({ addSubject }) => {
  const [value, setValue] = useState(null);
  return (
    <View style={styles.inputContainer}>
      <TextInput
        theme={{ colors: { primary: "blue" } }}
        style={styles.textInput}
        label="What would you like to focus on?"
        onChangeText={setValue}
      />
      <RoundedButton size={50} onPress={() => addSubject(value)} title="+" textStyle={{ fontSize: 25 }} />
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
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    borderRadius: 10,
    overflow: "hidden",
    flex: 1,
    backgroundColor: "#fff",
  },
});
