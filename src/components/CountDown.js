import React, { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";

import { colors } from "../utils/color";
import { fontSizes, spacing } from "../utils/sizes";

const minutesToMillis = (min) => min * 1000 * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({ minutes = 0.1, isPaused, onProgress, onEnd }) => {
  const interval = React.useRef(null);
  const [millis, setMillis] = useState(null);

  const resetMillis = () => setMillis(minutesToMillis(minutes));

  const countDown = () => {
    setMillis((time) => {
      if (time === 0 || time < 0) {
        clearInterval(interval.current);
        onEnd(resetMillis);
        return time;
      }
      const timeLeft = time - 1000;
      return timeLeft;
    });
  };

  useEffect(() => {
    setMillis(minutesToMillis(minutes));
  }, [minutes]);

  useEffect(() => {
    onProgress(millis / minutesToMillis(minutes));
  }, [millis]);

  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }

    interval.current = setInterval(countDown, 1000);

    return () => clearInterval(interval.current);
  }, [isPaused]);

  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;
  return (
    <Text style={styles.text}>
      {formatTime(minute)}:{formatTime(seconds)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    fontWeight: "bold",
    color: colors.white,
    padding: spacing.lg,
    backgroundColor: "rgba(94, 132, 226, 0.35)",
    borderRadius: 25,
    borderWidth: 4,
    borderColor: colors.blue,
  },
});
