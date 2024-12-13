/**
 * Service voor het beheren van leessessies in de apparaat kalender
 */
import * as Calendar from "expo-calendar";
import { Platform } from "react-native";

/**
 * Haalt de standaard kalender ID op, met platform-specifieke logica
 */
const getDefaultCalendarId = async (): Promise<string> => {
  if (Platform.OS === "ios") {
    const defaultCalendar = await Calendar.getDefaultCalendarAsync();
    return defaultCalendar.id;
  }

  const calendars = await Calendar.getCalendarsAsync(
    Calendar.EntityTypes.EVENT
  );
  const defaultCalendar = calendars[0];
  if (!defaultCalendar) {
    throw new Error("No calendar available");
  }
  return defaultCalendar.id;
};

/**
 * Vraagt kalendertoegang en retourneert de standaard kalender ID
 */
const requestAccess = async (): Promise<string> => {
  const { status } = await Calendar.requestCalendarPermissionsAsync();
  if (status !== "granted") {
    throw new Error("Calendar access not allowed");
  }
  return getDefaultCalendarId();
};

/**
 * Maakt een nieuwe leessessie aan in de kalender
 * Standaard duur is 1 uur
 */
const createReadingSession = async (
  calendarId: string,
  mangaTitle: string
): Promise<void> => {
  const startDate = new Date();
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);

  await Calendar.createEventAsync(calendarId, {
    title: `Manga Reading: ${mangaTitle}`,
    startDate,
    endDate,
    notes: `Reading session for ${mangaTitle}`,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });
};

export default {
  requestAccess,
  createReadingSession,
};
