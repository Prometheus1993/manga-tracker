/**
 * Service voor gebruikersfeedback via alerts en haptische feedback
 */
import { Alert } from "react-native";
import haptics from "@/src/utils/haptics";

/**
 * Toont succesbericht met positieve haptische feedback
 */
const showSuccess = (message: string) => {
  haptics.success();
  Alert.alert("Success", message);
};

/**
 * Toont foutmelding met negatieve haptische feedback
 */
const showError = (message: string) => {
  haptics.error();
  Alert.alert("Error", message);
};

/**
 * Toont bevestigingsdialoog met haptische feedback
 * Handelt successen en fouten automatisch af
 */
const showConfirmation = ({
  title,
  message,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
}: {
  title: string;
  message: string;
  onConfirm: () => Promise<void>;
  confirmText?: string;
  cancelText?: string;
}) => {
  haptics.light();
  Alert.alert(title, message, [
    { text: cancelText, style: "cancel" },
    {
      text: confirmText,
      onPress: async () => {
        try {
          await onConfirm();
          showSuccess(`${title} successful`);
        } catch (error) {
          showError(`Failed to ${title.toLowerCase()}`);
        }
      },
      style: "destructive",
    },
  ]);
};

export default {
  showSuccess,
  showError,
  showConfirmation,
};
