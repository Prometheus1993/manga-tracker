/**
 * Manga-styled modal screen for viewing and managing a specific manga series.
 * Displays series details, volume grid and provides add/remove options.
 */
import React, { useRef, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Animated,
  Text,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import SeriesHeader from "@/src/components/features/manga/series/detail/SeriesHeader";
import VolumeList from "@/src/components/features/manga/series/detail/VolumeList";
import AddSingleVolumeModal from "@/src/components/features/manga/series/modals/addSingleVolumeModal";
import useSeriesDetail from "@/src/hooks/manga/useSeriesDetail";

const SeriesDetailModal = () => {
  // Get series ID from route parameters
  const { id } = useLocalSearchParams();

  // Animation references
  const fabAnim = useRef(new Animated.Value(0)).current;
  const fabRotation = useRef(new Animated.Value(0)).current;

  // Hook for series management functionality
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

  // Initialize animations
  useEffect(() => {
    Animated.spring(fabAnim, {
      toValue: 1,
      friction: 6,
      tension: 200,
      useNativeDriver: true,
    }).start();
  }, []);

  // Calculate animation values
  const fabScale = fabAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const fabTranslateY = fabAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });

  const rotate = fabRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "135deg"],
  });

  // Handle FAB press with animation
  const handleFabPress = () => {
    // Animate rotation
    Animated.timing(fabRotation, {
      toValue: addModalVisible ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Toggle modal
    toggleAddModal();
  };

  // Show nothing if series doesn't exist or has no volumes
  if (!series || series.volumes.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Manga-themed header with series info */}
      <SeriesHeader series={series} onClose={handleClose} />

      {/* Volume list with manga theme */}
      <VolumeList
        volumes={series.volumes}
        onVolumePress={toggleRead}
        onVolumeLongPress={handleDelete}
      />

      {/* Animated manga-style FAB */}
      <Animated.View
        style={[
          styles.fabContainer,
          {
            transform: [{ scale: fabScale }, { translateY: fabTranslateY }],
          },
        ]}
      >
        <TouchableOpacity
          style={styles.fabBackground}
          onPress={handleFabPress}
          activeOpacity={0.8}
        >
          <View style={styles.fabInner}>
            <LinearGradient
              colors={["#FF5F6D", "#FFC371"]}
              style={styles.fabGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Animated.View
                style={[styles.fabIcon, { transform: [{ rotate }] }]}
              >
                <Ionicons name="add" size={28} color="#FFF" />
              </Animated.View>
            </LinearGradient>
          </View>
        </TouchableOpacity>

        {/* Floating label for FAB */}
        <View style={styles.fabLabel}>
          <Text style={styles.fabLabelText}>Add Volume</Text>
        </View>
      </Animated.View>

      {/* Add volume modal with manga theme */}
      <AddSingleVolumeModal
        visible={addModalVisible}
        onClose={toggleAddModal}
        malId={malId}
        onAddVolume={handleAddVolume}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  fabContainer: {
    position: "absolute",
    right: 20,
    bottom: 24,
    alignItems: "center",
    flexDirection: "row",
  },
  fabBackground: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  fabInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    overflow: "hidden",
    // Comic book shadow style
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  fabGradient: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  fabIcon: {
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  fabLabel: {
    position: "absolute",
    right: 72,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    // Comic-style speech bubble pointer
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  fabLabelText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 12,
  },
});

export default SeriesDetailModal;
