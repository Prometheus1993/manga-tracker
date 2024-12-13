/**
 * Component die actieknoppen voor stats en delen weergeeft.
 * Toont zwevende knoppen in de rechterbenedenhoek van het scherm.
 */
import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "@/src/styles/styles";
import { ActionButtonsProps } from "@/src/types/manga";


const ActionButtons = ({ onStatsPress, onSharePress }: ActionButtonsProps) => (
  <View style={styles.fabContainer}>
    {/* Statistieken knop */}
    <TouchableOpacity style={styles.fab} onPress={onStatsPress}>
      <Ionicons name="stats-chart" size={24} color="white" />
    </TouchableOpacity>

    {/* Deel knop */}
    <TouchableOpacity
      style={[styles.fab, { marginTop: 12 }]}
      onPress={onSharePress}
    >
      <Ionicons name="share-outline" size={24} color="white" />
    </TouchableOpacity>
  </View>
);

export default ActionButtons;
