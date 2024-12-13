/**
 * Scherm voor het beheren van leeslocaties.
 * Combineert een kaartweergave met een lijst van opgeslagen locaties.
 */
import React from "react";
import { View } from "react-native";
import styles from "@/src/styles/styles";
import LoadingSpinner from "@/src/components/ui/feedback/LoadingSpinner";
import LocationMap from "@/src/components/features/locations/LocationMap";
import LocationList from "@/src/components/features/locations/LocationList";
import AddButton from "@/src/components/features/locations/AddButton";
import AddLocationModal from "@/src/components/features/locations/modals/AddLocationsModal";
import LocationDetailsModal from "@/src/components/features/locations/modals/LocationDetailsModal";
import useLocationsScreen from "@/src/hooks/locations/useLocationsScreen";

const LocationsScreen = () => {
  const {
    locations,
    isLoading,
    addModalVisible,
    selectedLocation,
    mapRegion,
    handleLocationPress,
    toggleAddModal,
    closeDetailsModal,
    handleDeleteLocation,
    handleSave,
    name,
    setName,
    description,
    setDescription,
  } = useLocationsScreen();

  if (isLoading) return <LoadingSpinner />;

  return (
    <View style={styles.container}>
      <LocationMap
        locations={locations}
        onMarkerPress={handleLocationPress}
        mapRegion={mapRegion}
      />

      <LocationList
        locations={locations}
        onLocationPress={handleLocationPress}
      />

      <AddButton onPress={() => toggleAddModal(true)} />

      <AddLocationModal
        visible={addModalVisible}
        onClose={() => toggleAddModal(false)}
        onSave={handleSave}
        name={name}
        setName={setName}
        description={description}
        setDescription={setDescription}
      />

      <LocationDetailsModal
        location={selectedLocation}
        visible={!!selectedLocation}
        onClose={closeDetailsModal}
        onDelete={handleDeleteLocation}
      />
    </View>
  );
};

export default LocationsScreen;
