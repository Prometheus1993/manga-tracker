/**
 * Modaal scherm voor het bekijken en beheren van een specifieke manga serie.
 * Toont serie details, volume grid en biedt opties voor toevoegen/verwijderen.
 */
import React from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import styles from "@/src/styles/styles";
import { Ionicons } from "@expo/vector-icons";
import SeriesHeader from "@/src/components/features/manga/series/detail/SeriesHeader";
import VolumeGrid from "@/src/components/features/manga/series/detail/VolumeGrid";
import AddSingleVolumeModal from "@/src/components/features/manga/series/modals/addSingleVolumeModal";
import useSeriesDetail from "@/src/hooks/manga/useSeriesDetail";

const SeriesDetailModal = () => {
  // Haal serie ID uit route parameters
  const { id } = useLocalSearchParams();

  // Hook voor serie beheer functionaliteit
  const {
    series,
    addModalVisible,
    toggleAddModal,
    handleClose,
    toggleRead,
    handleDelete,
    handleAddVolume,
    malId,
  } = useSeriesDetail(id);

  // Toon niets als de serie niet bestaat/geladen is
  if (!series || series.volumes.length === 0) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header met serie informatie */}
      <SeriesHeader series={series} onClose={handleClose} />

      {/* Grid van volumes met interactie opties */}
      <VolumeGrid
        volumes={series.volumes}
        onVolumePress={toggleRead}
        onVolumeLongPress={handleDelete}
      />

      {/* FAB voor het toevoegen van nieuwe volumes */}
      <TouchableOpacity
        style={[styles.fab, styles.addFab]}
        onPress={toggleAddModal}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>

      {/* Modal voor het toevoegen van individuele volumes */}
      <AddSingleVolumeModal
        visible={addModalVisible}
        onClose={toggleAddModal}
        malId={malId}
        onAddVolume={handleAddVolume}
      />
    </SafeAreaView>
  );
};

export default SeriesDetailModal;
