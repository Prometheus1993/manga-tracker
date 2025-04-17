/**
 * Manga-styled modal for adding individual volumes to a series.
 * Features validation and manga-themed UI elements.
 */
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated,
  Easing,
  Dimensions,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import useSeries from "@/src/hooks/manga/useSeries";
import feedbackService from "@/src/services/feedbackService";
import { AddVolumeModalProps } from "@/src/types/manga";

const { width, height } = Dimensions.get("window");

const AddVolumeModal = ({
  visible,
  onClose,
  malId,
  onAddVolume,
}: AddVolumeModalProps) => {
  const [volumeNumber, setVolumeNumber] = useState("");
  const { series, validateVolumeNumber, getSkippedVolumes } = useSeries(malId);

  // Animation references
  const slideAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  // Run animations when modal becomes visible
  useEffect(() => {
    if (visible) {
      // Reset the volume number when opening
      setVolumeNumber("");

      // Run entrance animations
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
          easing: Easing.out(Easing.back(1.7)),
        }),
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
          easing: Easing.out(Easing.quad),
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 100,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Reset animations when closing
      slideAnim.setValue(0);
      rotateAnim.setValue(0);
      scaleAnim.setValue(0.9);
    }
  }, [visible]);

  // Calculate animation styles
  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [height * 0.2, 0],
  });

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["3deg", "0deg"],
  });

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
      onClose();
    } catch (error) {
      // Error handled by MangaContext
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <BlurView intensity={15} style={styles.blurContainer}>
          <TouchableOpacity style={styles.dismissArea} onPress={onClose} />

          <Animated.View
            style={[
              styles.modalContent,
              {
                transform: [{ translateY }, { rotate }, { scale: scaleAnim }],
              },
            ]}
          >
            {/* Modal header with comic-styled title */}
            <LinearGradient
              colors={["#3949AB", "#5E35B1"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.modalHeader}
            >
              <View style={styles.speechBubble}>
                <Text style={styles.modalTitle}>ADD VOLUME</Text>
                <View style={styles.speechPointer} />
              </View>

              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Ionicons name="close" size={20} color="#FFF" />
              </TouchableOpacity>
            </LinearGradient>

            {/* Manga-themed content area */}
            <ImageBackground
              // You'll need to add this image
              style={styles.contentBackground}
            >
              {/* Series info if available */}
              {series && (
                <View style={styles.seriesInfo}>
                  <Text style={styles.seriesTitle}>{series.title}</Text>
                  <Text style={styles.seriesDetail}>
                    Total: {series.totalVolumes} volumes
                  </Text>
                </View>
              )}

              {/* Volume input with manga style */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>VOLUME #</Text>
                <TextInput
                  style={styles.volumeInput}
                  keyboardType="numeric"
                  placeholder="Enter volume number"
                  value={volumeNumber}
                  onChangeText={setVolumeNumber}
                  placeholderTextColor="rgba(0,0,0,0.4)"
                  maxLength={4}
                />
              </View>

              {/* Action buttons with manga style */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                  <Text style={styles.cancelText}>CANCEL</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.addButton,
                    !volumeNumber && styles.addButtonDisabled,
                  ]}
                  onPress={handleAdd}
                  disabled={!volumeNumber}
                >
                  <LinearGradient
                    colors={["#FF5F6D", "#FFC371"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.addButtonGradient}
                  >
                    <Text style={styles.addText}>ADD</Text>
                    <Ionicons name="add-circle" size={18} color="#FFF" />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </Animated.View>
        </BlurView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  blurContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  dismissArea: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContent: {
    width: width * 0.85,
    maxWidth: 400,
    borderRadius: 16,
    overflow: "hidden",
    // Comic book style shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 15,
  },
  modalHeader: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  speechBubble: {
    backgroundColor: "#FFF",
    borderRadius: 18,
    paddingVertical: 8,
    paddingHorizontal: 16,
    position: "relative",
  },
  speechPointer: {
    position: "absolute",
    bottom: -10,
    left: 20,
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
    borderTopWidth: 10,
    borderTopColor: "#FFF",
    transform: [{ rotate: "180deg" }],
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#5E35B1",
    letterSpacing: 1,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  contentBackground: {
    padding: 20,
    backgroundColor: "#FFF",
  },
  seriesInfo: {
    marginBottom: 20,
    padding: 12,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  seriesTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  seriesDetail: {
    fontSize: 14,
    color: "#666",
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#666",
    letterSpacing: 1,
  },
  volumeInput: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderWidth: 2,
    borderColor: "#DDD",
    borderRadius: 8,
    padding: 12,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    // Comic style border
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    flex: 0.45,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: "#DDD",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.8)",
  },
  cancelText: {
    color: "#666",
    fontWeight: "bold",
    fontSize: 14,
    letterSpacing: 0.5,
  },
  addButton: {
    flex: 0.45,
    borderRadius: 8,
    overflow: "hidden",
  },
  addButtonDisabled: {
    opacity: 0.5,
  },
  addButtonGradient: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    gap: 8,
  },
  addText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 14,
    letterSpacing: 0.5,
  },
});

export default AddVolumeModal;
