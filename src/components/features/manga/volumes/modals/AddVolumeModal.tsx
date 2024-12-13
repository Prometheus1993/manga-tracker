/**
 * Modal voor het toevoegen van meerdere volumes van een manga.
 * Toont manga details en biedt volume selectie functionaliteit.
 * Ondersteunt zowel afgeronde als lopende series.
 */
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import styles from "@/src/styles/styles";
import VolumeSelector from "@/src/components/features/manga/volumes/modals/VolumeSelector";
import BaseModal from "@/src/components/ui/BaseModal";
import { MangaDetailModalProps } from "@/src/types/manga";

const MangaDetailModal = ({
  visible,
  onClose,
  manga,
  onAddVolumes,
}: MangaDetailModalProps) => {
  // State voor geselecteerde volumes en custom volume aantal
  const [selectedVolumes, setSelectedVolumes] = useState<number[]>([]);
  const [customVolumeCount, setCustomVolumeCount] = useState(
    manga.node.num_volumes?.toString() || "1"
  );

  // Check voor lopende series en bepaal totaal aantal volumes
  const isOngoing = manga.node.status === "currently_publishing";
  const totalVolumes = isOngoing
    ? parseInt(customVolumeCount)
    : manga.node.num_volumes || 1;

  /**
   * Handelt volume selectie/deselectie af
   */
  const handleVolumeToggle = (volume: number) => {
    if (selectedVolumes.includes(volume)) {
      setSelectedVolumes(selectedVolumes.filter((v) => v !== volume));
    } else {
      setSelectedVolumes([...selectedVolumes, volume]);
    }
  };

  return (
    <BaseModal
      visible={visible}
      onClose={onClose}
      title={manga.node.title}
      showActions
      primaryAction={{
        label: `Add ${selectedVolumes.length} Volume(s)`,
        onPress: () => {
          if (selectedVolumes.length > 0) {
            onAddVolumes(selectedVolumes);
            onClose();
          }
        },
        disabled: selectedVolumes.length === 0,
      }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          {/* Manga cover afbeelding */}
          <Image
            source={{ uri: manga.node.main_picture?.medium }}
            style={styles.modalImage}
          />

          {/* Serie status en instructie */}
          <Text style={styles.modalSubtitle}>
            {isOngoing ? "Ongoing Series - Select Volumes:" : "Select Volumes:"}
          </Text>

          {/* Volume selectie component */}
          <VolumeSelector
            totalVolumes={totalVolumes}
            selectedVolumes={selectedVolumes}
            onVolumeToggle={handleVolumeToggle}
            isOngoing={isOngoing}
            customVolumeCount={customVolumeCount}
            onCustomVolumeChange={setCustomVolumeCount}
          />
        </View>
      </TouchableWithoutFeedback>
    </BaseModal>
  );
};

export default MangaDetailModal;
