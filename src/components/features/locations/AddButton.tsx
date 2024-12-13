
/**
 * Floating Action Button component voor het toevoegen van nieuwe locaties.
 * Gepositioneerd in de rechter onderhoek van het scherm.
 */
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import styles from "@/src/styles/styles";
import { AddButtonProps } from "@/src/types/manga";

const AddButton = ({ onPress }: AddButtonProps) => (
    <TouchableOpacity
        style={[styles.fab, styles.addFab]}
        onPress={onPress}
    >
        <Ionicons name="add" size={24} color="white" />
    </TouchableOpacity>
);

export default AddButton;