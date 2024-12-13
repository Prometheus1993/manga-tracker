/**
 * Modal voor het toevoegen van individuele volumes aan een serie.
 * Bevat validatie voor volume nummers en waarschuwingen voor ontbrekende volumes.
 */
import React, { useState } from "react";
import { TextInput } from "react-native";
import BaseModal from "@/src/components/ui/BaseModal";
import useSeries from "@/src/hooks/manga/useSeries";
import feedbackService from "@/src/services/feedbackService";
import styles from "@/src/styles/styles";
import { AddVolumeModalProps } from "@/src/types/manga";

const AddVolumeModal = ({
  visible,
  onClose,
  malId,
  onAddVolume,
}: AddVolumeModalProps) => {
  const [volumeNumber, setVolumeNumber] = useState("");
  const { series, validateVolumeNumber, getSkippedVolumes } = useSeries(malId);

  const handleAdd = async () => {
    const num = parseInt(volumeNumber);
    const validation = validateVolumeNumber(num);

    if (!validation.isValid) {
      feedbackService.showError(validation.error!);
      return;
    }

    const skippedVolumes = getSkippedVolumes(num);
    if (skippedVolumes.length > 0) {
      feedbackService.showConfirmation({
        title: "Missing Previous Volumes",
        message: `You are missing volumes: ${skippedVolumes.join(
          ", "
        )}. Do you still want to add volume ${num}?`,
        onConfirm: () => addNewVolume(num),
      });
    } else {
      await addNewVolume(num);
    }
  };

  const addNewVolume = async (num: number) => {
    if (!series) return;

    try {
      await onAddVolume({
        malId: series.malId,
        title: `${series.title} Vol. ${num}`,
        coverImage: series.coverImage,
        isRead: false,
        volumeNumber: num,
        totalVolumes: series.totalVolumes,
      });
      setVolumeNumber("");
      onClose();
    } catch (error) {
      // Error wordt afgehandeld door MangaContext
    }
  };

  return (
    <BaseModal
      visible={visible}
      onClose={onClose}
      title="Add Volume"
      showActions={true}
      primaryAction={{
        label: "Add",
        onPress: handleAdd,
      }}
    >
      <TextInput
        style={styles.volumeInputInSeries}
        keyboardType="numeric"
        placeholder="Enter volume number"
        value={volumeNumber}
        onChangeText={setVolumeNumber}
      />
    </BaseModal>
  );
};

export default AddVolumeModal;
