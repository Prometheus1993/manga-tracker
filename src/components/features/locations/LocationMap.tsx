/**
 * Component die een kaart weergeeft met markers voor alle leeslocaties.
 * Gebruikt react-native-maps voor de kaartweergave en interactie.
 */
import React from "react";
import MapView, { Marker } from "react-native-maps";
import { LocationMapProps } from "@/src/types/manga";
import styles from "@/src/styles/styles";

const LocationMap = ({
  locations,
  onMarkerPress,
  mapRegion,
}: LocationMapProps) => (
  <MapView style={styles.map} initialRegion={mapRegion} region={mapRegion}>
    {/* Render een marker voor elke locatie */}
    {locations.map((location) => (
      <Marker
        key={location.id}
        coordinate={{
          latitude: location.latitude,
          longitude: location.longitude,
        }}
        title={location.name}
        description={location.description}
        onPress={() => onMarkerPress(location)}
      />
    ))}
  </MapView>
);

export default LocationMap;
