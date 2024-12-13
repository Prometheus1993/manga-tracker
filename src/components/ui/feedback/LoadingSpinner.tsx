/**
 * Component voor het weergeven van een laadspinner.
 * Toont een laadindicator in een gecentreerde container.
 */
import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import styles from '@/src/styles/styles';

const LoadingSpinner = () => (
    <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
    </View>
);

export default LoadingSpinner;