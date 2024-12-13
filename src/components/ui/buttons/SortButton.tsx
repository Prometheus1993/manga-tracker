/**
 * Herbruikbare sorteringsknop component.
 * Getoond als een Floating Action Button (FAB) met een repeat icoon.
 */
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "@/src/styles/styles";
import { SortButtonProps } from "@/src/types/manga";

const SortButton = ({ onSort }: SortButtonProps) => {
  return (
    <View style={styles.fabContainer}>
      <TouchableOpacity style={styles.fab} onPress={onSort}>
        <Ionicons name="repeat-outline" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default SortButton;
