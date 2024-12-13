/**
 * Component voor het weergeven van manga statistieken.
 * Toont totaal aantal, gelezen/ongelezen aantallen en leespercentage.
 */
import React from "react";
import { View, Text } from "react-native";
import styles from "@/src/styles/styles";
import { StatsDisplayProps } from "@/src/types/manga";

const StatsDisplay = ({
  total,
  read,
  unread,
  readPercentage,
}: StatsDisplayProps) => {
  return (
    <>
      {/* Grid met hoofdstatistieken */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{total}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{read}</Text>
          <Text style={styles.statLabel}>Read</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{unread}</Text>
          <Text style={styles.statLabel}>Unread</Text>
        </View>
      </View>

      {/* Percentage weergave */}
      <View style={styles.percentageContainer}>
        <Text style={styles.percentageText}>
          {readPercentage}% Read from your collection
        </Text>
      </View>
    </>
  );
};

export default StatsDisplay;
