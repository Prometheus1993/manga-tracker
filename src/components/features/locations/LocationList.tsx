/**
 * Component voor het weergeven van een scrollbare lijst van leeslocaties.
 * Gebruikt FlatList voor efficiënte rendering van grote lijsten.
 */
import React from "react";
import { FlatList } from "react-native";
import { LocationListProps } from "@/src/types/manga";
import LocationListItem from "./LocationListItem";
import styles from "@/src/styles/styles";

const LocationList = ({ locations, onLocationPress }: LocationListProps) => (
  <FlatList
    data={locations}
    style={styles.locationsList}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
      <LocationListItem location={item} onPress={() => onLocationPress(item)} />
    )}
  />
);

export default LocationList;
