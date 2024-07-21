import React, { useEffect, useState } from "react";
import { Alert, Platform, SafeAreaView, StatusBar, StyleSheet } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { Focus } from "./Focus";
import { FocusHistory } from "./FocusHistory";
import { Timer } from "./Timer";
import { colors } from "../utils/color";

export const MainScreen = () => {
  const [currentSubject, setCurrentSubject] = useState(null);
  const [history, sethistory] = useState([]);

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
  );
};

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
