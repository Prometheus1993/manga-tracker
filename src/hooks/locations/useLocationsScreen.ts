/**
 * Hook voor het beheren van leeslocaties in de app.
 * Handelt locatie CRUD operaties en UI states af.
 */
import { useState, useMemo } from "react";
import useReadingLocations from "./useReadingLocations";
import {
  ReadingLocation,
  MapRegion,
  FormattedReadingLocation,
} from "@/src/types/manga";
import locationService from "@/src/services/locationService";
import feedbackService from "@/src/services/feedbackService";

// Default map regio (Antwerpen)
const DEFAULT_REGION: MapRegion = {
  latitude: 51.2194,
  longitude: 4.4025,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const useLocationsScreen = () => {
  const { locations, isLoading, deleteLocation, reloadLocations } =
    useReadingLocations();
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] =
    useState<ReadingLocation | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [mapRegion, setMapRegion] = useState<MapRegion>(DEFAULT_REGION);

  // Bereken formatted locations met datums
  const formattedLocations = useMemo(
    (): FormattedReadingLocation[] =>
      locations.map((location) => ({
        ...location,
        formattedDate: new Date(location.timestamp).toLocaleDateString(),
      })),
    [locations]
  );

  // Event handlers
  const handleLocationPress = (location: ReadingLocation) => {
    setMapRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
    setTimeout(() => {
      setSelectedLocation(location);
    }, 100);
  };

  const handleDeleteLocation = async (id: string) => {
    try {
      await deleteLocation(id);
      setSelectedLocation(null);
      setMapRegion(DEFAULT_REGION);
      await reloadLocations();
    } catch (error) {
      feedbackService.showError("Failed to delete location");
    }
  };

  const handleSave = async () => {
    if (!name.trim()) return;

    try {
      await locationService.saveLocation(name, description);
      setName("");
      setDescription("");
      toggleAddModal(false);
      await reloadLocations();
    } catch (error) {
      feedbackService.showError("Failed to save location");
    }
  };

  // UI state handlers
  const toggleAddModal = (visible: boolean) => {
    setAddModalVisible(visible);
    if (!visible) {
      setName("");
      setDescription("");
    }
  };

  const closeDetailsModal = () => {
    setSelectedLocation(null);
    setMapRegion(DEFAULT_REGION);
  };

  return {
    locations: formattedLocations,
    isLoading,
    selectedLocation,
    mapRegion,
    addModalVisible,
    name,
    setName,
    description,
    setDescription,
    handleLocationPress,
    handleDeleteLocation,
    handleSave,
    toggleAddModal,
    closeDetailsModal,
  };
};

export default useLocationsScreen;
