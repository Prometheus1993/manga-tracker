/**
 * Component voor het weergeven van een lege staat.
 * Wordt getoond wanneer er nog geen manga's in de collectie zijn.
 */
import React from "react";
import { View, Text } from "react-native";
import styles from "@/src/styles/styles";

const EmptyState = () => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyText}>No manga in your collection yet.</Text>
    <Text style={styles.emptySubText}>Search to add some!</Text>
  </View>
);

export default EmptyState;
