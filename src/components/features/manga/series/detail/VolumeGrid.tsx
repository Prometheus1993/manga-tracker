/**
 * Grid weergave van manga volumes binnen een serie.
 * Toont volume nummers en leesvoortgang met sorterings functionaliteit.
 */
import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import  useVolumeSort  from "@/src/hooks/manga/useVolumeSort";
import styles from "@/src/styles/styles";
import { VolumeGridProps } from "@/src/types/manga";

/**
 * Volume kaart component met leesstatus indicator
 */
const VolumeCard = ({ volume, onPress, onLongPress }: any) => (
  <TouchableOpacity
    style={[styles.volumeCard, volume.isRead && styles.volumeCardRead]}
    onPress={onPress}
    onLongPress={onLongPress}
  >
    <Text style={styles.volumeNumber}>Volume {volume.volumeNumber}</Text>
    {volume.isRead && (
      <Ionicons
        name="checkmark-circle"
        size={20}
        color="#4CAF50"
        style={styles.readIcon}
      />
    )}
  </TouchableOpacity>
);

const VolumeGrid = ({
  volumes,
  onVolumePress,
  onVolumeLongPress,
}: VolumeGridProps) => {
  const sortedVolumes = useVolumeSort(volumes);

  return (
    <ScrollView>
      <View style={styles.volumeGrid}>
        {sortedVolumes.map((volume) => (
          <VolumeCard
            key={volume.id}
            volume={volume}
            onPress={() => onVolumePress(volume.id)}
            onLongPress={() => onVolumeLongPress(volume.id, volume.title)}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default VolumeGrid;
