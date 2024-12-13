/**
 * Modal voor het toevoegen van nieuwe leeslocaties.
 * Vraagt om naam en optionele beschrijving voor een locatie.
 */
import React from "react";
import { View, TextInput } from "react-native";
import styles from "@/src/styles/styles";
import BaseModal from "@/src/components/ui/BaseModal";
import { AddLocationModalProps } from "@/src/types/manga";

const AddLocationModal = ({
  visible,
  onClose,
  name,
  setName,
  description,
  setDescription,
  onSave,
}: AddLocationModalProps) => {
  return (
    <BaseModal
      visible={visible}
      onClose={onClose}
      title="Add Reading Location"
      showActions={true}
      primaryAction={{
        label: "Save",
        onPress: onSave,
        disabled: !name.trim(),
      }}
    >
      <View>
        {/* Verplichte naam input */}
        <TextInput
          style={styles.input}
          placeholder="Location name"
          value={name}
          onChangeText={setName}
        />

        {/* Optionele beschrijving */}
        <TextInput
          style={styles.input}
          placeholder="Description (optional)"
          value={description}
          onChangeText={setDescription}
          multiline
        />
      </View>
    </BaseModal>
  );
};

export default AddLocationModal;
