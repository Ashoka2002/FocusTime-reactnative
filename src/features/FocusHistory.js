import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { colors } from "../utils/color";
import { fontSizes, spacing } from "../utils/sizes";
import { StringEllipsis } from "../utils/StringEllipsis";

export const FocusHistory = ({ history }) => {
  if (!history || !history.length) return <Text style={styles.title}>Things we haven't focused on yet </Text>;

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={{ ...styles.itemTitle, color: item.uncomplete ? colors.red : colors.white }}>
        {StringEllipsis(item.title, 25)}
      </Text>
      <Text style={styles.itemDate}>{item.date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Things we've focused on:</Text>
      <FlatList data={history} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.backgroundDarkOpacity,
    padding: 10,
    textAlign: "center",
    borderColor: colors.white,
    borderWidth: 1,
  },
  itemTitle: {
    width: "70%",
    fontSize: fontSizes.md,
    color: colors.white,
  },
  itemDate: {
    color: colors.white,
  },
  title: {
    marginTop: 40,
    color: colors.white,
    fontSize: fontSizes.lg,
    textTransform: "uppercase",
    backgroundColor: colors.backgroundDarkOpacity,
    padding: 10,
    textAlign: "center",
    borderColor: colors.white,
    borderWidth: 1,
  },
});
