/**
 * Component voor het weergeven van een individuele leeslocatie.
 * Toont naam, beschrijving, datum en een locatie-icoon.
 */
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LocationListItemProps } from "@/src/types/manga";
import styles from "@/src/styles/styles";

const LocationListItem = ({ location, onPress }: LocationListItemProps) => (
  <TouchableOpacity style={styles.locationItem} onPress={onPress}>
    <View>
      {/* Locatie naam */}
      <Text style={styles.locationName}>{location.name}</Text>

      {/* Optionele beschrijving */}
      {location.description && (
        <Text style={styles.locationDescription}>{location.description}</Text>
      )}

      {/* Datum van toevoeging */}
      <Text style={styles.locationDate}>{location.formattedDate}</Text>
    </View>

    {/* Locatie icoon */}
    <Ionicons name="location" size={24} color="#007AFF" />
  </TouchableOpacity>
);

export default LocationListItem;
