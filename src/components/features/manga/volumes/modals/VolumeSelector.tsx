/**
 * Component voor het selecteren van manga volumes.
 * Biedt een scrollbare lijst van volumes en een custom input voor lopende series.
 */
import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from "react-native";
import styles from "@/src/styles/styles";
import { VolumeSelectorProps } from "@/src/types/manga";

const VolumeSelector = ({
  totalVolumes,
  selectedVolumes,
  onVolumeToggle,
  isOngoing,
  customVolumeCount,
  onCustomVolumeChange,
}: VolumeSelectorProps) => {
  // Genereer array van volume nummers
  const volumes = Array.from({ length: totalVolumes }, (_, i) => i + 1);

  return (
    <View>
      {/* Custom volume input voor lopende series */}
      {isOngoing && (
        <View style={styles.customVolumeInput}>
          <Text>Number of volumes:</Text>
          <TextInput
            style={styles.volumeInput}
            value={customVolumeCount}
            onChangeText={onCustomVolumeChange}
            keyboardType="numeric"
            onSubmitEditing={Keyboard.dismiss}
            maxLength={3}
          />
        </View>
      )}

      {/* Horizontaal scrollbare volume selector */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.volumeSelector}
      >
        {volumes.map((volume) => (
          <TouchableOpacity
            key={volume}
            style={[
              styles.volumeButton,
              selectedVolumes.includes(volume) && styles.volumeButtonSelected,
            ]}
            onPress={() => onVolumeToggle(volume)}
          >
            <Text
              style={[
                styles.volumeButtonText,
                selectedVolumes.includes(volume) &&
                  styles.volumeButtonTextSelected,
              ]}
            >
              Vol. {volume}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default VolumeSelector;
