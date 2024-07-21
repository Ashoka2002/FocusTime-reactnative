import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useKeepAwake } from "expo-keep-awake";
import React, { useState } from "react";
import { StyleSheet, Text, Vibration, View } from "react-native";
import { ProgressBar } from "react-native-paper";
import { Countdown } from "../components/CountDown";
import { RoundedButton } from "../components/RoundedButton";
import { colors } from "../utils/color";
import { fontSizes, spacing } from "../utils/sizes";
import { Timing } from "./Timing";

const ONE_SECOND_IN_MS = 1000;

const PATTERN = [
  0.5 * ONE_SECOND_IN_MS,
  0.5 * ONE_SECOND_IN_MS,
  0.5 * ONE_SECOND_IN_MS,
  0.5 * ONE_SECOND_IN_MS,
  0.5 * ONE_SECOND_IN_MS,
  0.5 * ONE_SECOND_IN_MS,
];

export const Timer = ({ focusSubject, clearSubject, onTimerEnd }) => {
  useKeepAwake();
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(0.5);

  const onEnd = (resetMillis) => {
    Vibration.vibrate(PATTERN);
    setIsStarted(false);
    setProgress(1);
    resetMillis();
    onTimerEnd(focusSubject);
  };

  const addTime = () => setMinutes((prev) => prev + 0.5);
  const subtractTime = () => setMinutes((prev) => (prev > 0.5 ? prev - 0.5 : prev));

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown minutes={minutes} isPaused={!isStarted} onProgress={setProgress} onEnd={onEnd} />
        <View style={{ paddingTop: spacing.xxl, marginTop: -15 }}>
          <Text style={styles.title}>Focusing on:</Text>
          <Text style={styles.task}>{focusSubject}</Text>
        </View>
      </View>

      <View style={{ paddingTop: spacing.sm }}>
        <ProgressBar
          style={{ height: spacing.sm, borderRadius: 10, overflow: "hidden" }}
          progress={progress}
          color={colors.blue}
        />
      </View>

      <View style={styles.timingWrapper}>
        <Timing onChangeTime={setMinutes} />
      </View>

      <View style={styles.buttonWrapper}>
        <RoundedButton size={50} title="-" onPress={subtractTime}>
          <MaterialIcons name="add" size={24} color="white" />
        </RoundedButton>
        {!isStarted && <RoundedButton title="start" onPress={() => setIsStarted(true)} />}
        {isStarted && <RoundedButton title="pause" onPress={() => setIsStarted(false)} />}
        <RoundedButton size={50} title="+" onPress={addTime}>
          <MaterialIcons name="remove" size={24} color="white" />
        </RoundedButton>
      </View>

      <View style={styles.clearSubjectWrapper}>
        <RoundedButton size={50} onPress={clearSubject}>
          <MaterialIcons name="clear" size={24} color="white" />
        </RoundedButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countdown: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  timingWrapper: {
    flex: 0.1,
    flexDirection: "row",
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
    marginBottom: -10,
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: "row",
    padding: spacing.md,
    justifyContent: "space-around",
    alignItems: "center",
  },
  clearSubjectWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: -15,
  },
  title: {
    color: colors.white,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: fontSizes.md,
    textTransform: "uppercase",
  },
  task: {
    color: colors.lightBlue,
    textAlign: "center",
    fontSize: 20,
    marginVertical: 8,
    paddingVertical: 4,
    letterSpacing: 1.5,
    backgroundColor: colors.backgroundDarkOpacity,
    borderWidth: 1,
    borderColor: colors.blue,
    borderRadius: 10,
  },
});
