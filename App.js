import React from "react";
import { ImageBackground, StyleSheet } from "react-native";

import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import { bgWall } from "./src/utils/bg";
import { colors } from "./src/utils/color";
import { MainScreen } from "./src/features/MainScreen";

export default function App() {
  const randomIndex = Math.floor(Math.random() * bgWall.length);

  return (
    <>
      <ImageBackground style={styles.bg} source={bgWall[randomIndex]} />
      <MainScreen />
      <ExpoStatusBar hidden backgroundColor="red" />
    </>
  );
}

const styles = StyleSheet.create({
  bg: {
    backgroundColor: colors.bgDark,
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
  },
});
