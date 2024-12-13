/**
 * Specifieke modal voor locatie details.
 * Geoptimaliseerd voor het tonen van kaarten en locatie informatie.
 */
import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { LocationDetailsModalProps } from "@/src/types/manga";
import styles from "@/src/styles/styles";

const LocationModal = ({
    location,
    visible,
    onClose,
    onDelete,
}: LocationDetailsModalProps) => {
    if (!location) return null;

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.locationModalContent}>
                    {/* Header */}
                    <View style={styles.locationModalHeader}>
                        <Text style={styles.locationModalTitle}>{location.name}</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Ionicons name="close" size={24} color="#000" />
                        </TouchableOpacity>
                    </View>

                    {/* Map */}
                    <MapView
                        style={{
                            width: '100%',
                            height: 200,
                            borderRadius: 8,
                            marginVertical: 16,
                        }}
                        region={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                            latitudeDelta: 0.005,
                            longitudeDelta: 0.005,
                        }}
                    >
                        <Marker
                            coordinate={{
                                latitude: location.latitude,
                                longitude: location.longitude,
                            }}
                            title={location.name}
                            description={location.description}
                        />
                    </MapView>

                    {/* Description */}
                    {location.description && (
                        <Text style={styles.locationModalDescription}>
                            {location.description}
                        </Text>
                    )}

                    {/* Date */}
                    <Text style={styles.locationModalDate}>
                        Added on: {new Date(location.timestamp).toLocaleDateString()}
                    </Text>

                    {/* Delete Button */}
                    <TouchableOpacity
                        style={styles.locationModalDeleteButton}
                        onPress={() => onDelete(location.id)}
                    >
                        <Text style={styles.locationModalDeleteText}>Delete Location</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default LocationModal;