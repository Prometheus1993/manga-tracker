/**
 * Hook voor het beheren van leesherinneringen via notificaties.
 * Handelt notificatie permissies en scheduling af.
 */
import { useState, useEffect } from "react";
import * as Notifications from "expo-notifications";
import { Alert } from "react-native";

// Configureer lokale notificaties
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const useNotifications = () => {
  const [reminderEnabled, setReminderEnabled] = useState(false);

  // Check notificatie permissies bij mount
  useEffect(() => {
    checkPermissions();
  }, []);

  /**
   * Controleert en vraagt notificatie permissies
   * Update reminderEnabled op basis van geplande notificaties
   */
  const checkPermissions = async () => {
    try {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== "granted") {
        const { status: newStatus } =
          await Notifications.requestPermissionsAsync({
            ios: {
              allowAlert: true,
              allowSound: false,
              allowBadge: false,
            },
          });
        if (newStatus === "granted") {
          const scheduledNotifications =
            await Notifications.getAllScheduledNotificationsAsync();
          setReminderEnabled(scheduledNotifications.length > 0);
        }
      } else {
        const scheduledNotifications =
          await Notifications.getAllScheduledNotificationsAsync();
        setReminderEnabled(scheduledNotifications.length > 0);
      }
    } catch (error) {
      console.log("Error requesting notification permission:", error);
    }
  };

  // Plant dagelijkse notificatie
  const scheduleLocalNotification = async () => {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Time to Read!",
          body: "Don't forget to read some manga today 📚",
        },
        trigger: {
          seconds: 60 * 60 * 24, // Dagelijks (24 uur)
          repeats: true,
        },
      });
    } catch (error) {
      console.log("Error scheduling notification:", error);
      Alert.alert("Error", "Could not set a reminder");
    }
  };

  // Schakelt dagelijkse herinnering in/uit
  const toggleReminder = async (value: boolean) => {
    setReminderEnabled(value);
    if (value) {
      await scheduleLocalNotification();
      Alert.alert("Success", "Daily reminder set!");
    } else {
      await Notifications.cancelAllScheduledNotificationsAsync();
    }
  };

  return {
    reminderEnabled,
    toggleReminder,
  };
};

export default useNotifications;
