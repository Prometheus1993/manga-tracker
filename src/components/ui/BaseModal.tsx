/**
 * Herbruikbare basis modal component.
 * Biedt een consistente layout voor alle modals in de app met:
 * - Titel
 * - Content area
 * - Optionele actieknoppen
 * - Slide animatie
 */
import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import styles from "@/src/styles/styles";
import { BaseModalProps } from "@/src/types/manga";

const BaseModal: React.FC<BaseModalProps> = ({
  visible,
  onClose,
  title,
  children,
  showActions,
  primaryAction,
}) => (
  <Modal
    visible={visible}
    transparent={true}
    animationType="slide"
    onRequestClose={onClose}
  >
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        {/* Modal titel */}
        <Text style={styles.modalTitle}>{title}</Text>

        {/* Modal inhoud via children prop */}
        {children}

        {/* Actieknoppen indien showActions true is */}
        {showActions && (
          <View style={styles.modalButtons}>
            {primaryAction && (
              <TouchableOpacity
                style={[
                  styles.modalButton,
                  primaryAction.disabled && styles.modalButtonDisabled,
                ]}
                onPress={primaryAction.onPress}
                disabled={primaryAction.disabled}
              >
                <Text style={styles.modalButtonText}>
                  {primaryAction.label}
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[styles.modalButton, styles.modalButtonCancel]}
              onPress={onClose}
            >
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  </Modal>
);

export default BaseModal;
