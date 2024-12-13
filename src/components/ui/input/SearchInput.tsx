/**
 * Herbruikbare zoekbalk component met standaard zoek-functionaliteit.
 * Biedt een consistente zoekinterface met clear knop en gepaste keyboard configuratie.
 */
import React from "react";
import { TextInput, View } from "react-native";
import styles from "@/src/styles/styles";
import { SearchInputProps } from "@/src/types/manga";

const SearchInput = ({ containerStyle, ...props }: SearchInputProps) => (
  <View style={[styles.searchContainer, containerStyle]}>
    <TextInput
      style={styles.searchInput}
      placeholder="Search..."
      clearButtonMode="while-editing" 
      returnKeyType="search"
      {...props}
    />
  </View>
);

export default SearchInput;
