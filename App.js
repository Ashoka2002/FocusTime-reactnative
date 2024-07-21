import React, { useEffect, useState } from "react";
import { Alert, ImageBackground, Platform, SafeAreaView, StatusBar, StyleSheet } from "react-native";

import { Focus } from "./src/features/Focus";
import { FocusHistory } from "./src/features/FocusHistory";
import { Timer } from "./src/features/Timer";
import { colors } from "./src/utils/color";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import { bgWall } from "./src/utils/bg";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [currentSubject, setCurrentSubject] = useState(null);
  const [history, sethistory] = useState([]);
  const randomIndex = Math.floor(Math.random() * bgWall.length);

  //Get history
  useEffect(() => {
    (async function () {
      try {
        const historyArray = await AsyncStorage.getItem("focusHistory");
        if (historyArray) sethistory(JSON.parse(historyArray));
        else sethistory([]);
      } catch (e) {
        console.log("error in getting async", e);
      }
    })();
  }, []);

  //set history
  useEffect(() => {
    AsyncStorage.setItem("focusHistory", JSON.stringify(history));
  }, [history]);

  const handleClearStorage = () => {
    async function deleteHistory() {
      sethistory([]);
    }

    Alert.alert("Alert!", "Are you sure you want to delete this focus list?", [
      { text: "No" },
      { text: "Yes", onPress: deleteHistory },
    ]);
  };

  return (
    <>
      <ImageBackground style={styles.bg} source={bgWall[randomIndex]} />
      <SafeAreaView style={styles.container}>
        {!currentSubject ? (
          <>
            <Focus addSubject={setCurrentSubject} />
            <FocusHistory history={history} onClearHistory={handleClearStorage} />
          </>
        ) : (
          <Timer
            focusSubject={currentSubject}
            onTimerEnd={(subject) =>
              sethistory([
                {
                  title: subject,
                  time: new Date().toTimeString().substring(0, 5),
                  date: new Date().toLocaleDateString(),
                },
                ...history,
              ])
            }
            clearSubject={(isTimeEnded, subject) => {
              setCurrentSubject(null);
              if (!isTimeEnded) {
                sethistory([
                  {
                    uncomplete: true,
                    title: subject,
                    time: new Date().toTimeString().substring(0, 5),
                    date: new Date().toLocaleDateString(),
                  },
                  ...history,
                ]);
              }
            }}
          />
        )}
      </SafeAreaView>
      <ExpoStatusBar hidden backgroundColor="red" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    padding: 10,
    backgroundColor: "rgba(0,0,50,.6)",
  },
  bg: {
    backgroundColor: colors.bgDark,
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
  },
});
