/**
 * Component voor het weergeven van foutmeldingen.
 * Toont een bericht in een gestileerde container.
 */
import React from "react";
import { View, Text } from "react-native";
import styles from "@/src/styles/styles";
import { ErrorMessageProps } from "@/src/types/manga";

const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <View style={styles.errorContainer}>
    <Text style={styles.errorText}>{message}</Text>
  </View>
);

export default ErrorMessage;
