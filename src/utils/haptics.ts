/**
 * Utility voor haptische feedback in de app.
 * Gebruikt expo-haptics voor verschillende soorten trillingen.
 */
import * as Haptics from "expo-haptics";

const haptics = {
  // Positieve feedback (bijv. bij succesvolle acties)
  success: () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  },
  // Negatieve feedback (bijv. bij fouten)
  error: () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  },
  // Subtiele feedback (bijv. bij UI interacties)
  light: () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  },
};

export default haptics;
