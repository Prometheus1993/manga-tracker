/**
 * Hoofdcomponent voor serie details.
 * Toont serie informatie, volumes en biedt mogelijkheden voor beheer.
 */
import React from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import useSeries from "@/src/hooks/manga/useSeries";
import styles from "@/src/styles/styles";
import SeriesHeader from "./SeriesHeader";
import VolumeGrid from "./VolumeGrid";
import AddVolumeModal from "../modals/addSingleVolumeModal";

const SeriesDetailModal = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const malId = Number(id);

  const {
    series,
    toggleRead,
    handleDelete,
    addManga,
    addModalVisible,
    setAddModalVisible,
  } = useSeries(malId);

  // Redirect als de serie niet bestaat
  React.useEffect(() => {
    if (!series || series.volumes.length === 0) {
      router.back();
    }
  }, [series]);

  if (!series || series.volumes.length === 0) return null;

  const AddButton = ({ onPress }: { onPress: () => void }) => (
    <TouchableOpacity style={[styles.fab, styles.addFab]} onPress={onPress}>
      <Ionicons name="add" size={24} color="white" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <SeriesHeader series={series} onClose={() => router.back()} />

      <VolumeGrid
        volumes={series.volumes}
        onVolumePress={toggleRead}
        onVolumeLongPress={handleDelete}
      />

      <AddButton onPress={() => setAddModalVisible(true)} />

      <AddVolumeModal
        visible={addModalVisible}
        onClose={() => setAddModalVisible(false)}
        malId={malId}
        onAddVolume={async (manga) => {
          await addManga({
            ...manga,
            id: `${manga.malId}_vol${manga.volumeNumber}`,
          });
        }}
      />
    </SafeAreaView>
  );
};

export default SeriesDetailModal;
