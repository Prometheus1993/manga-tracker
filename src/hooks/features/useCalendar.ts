/**
 * Hook voor het beheren van leessessies in de apparaat kalender.
 * Handelt kalendertoegang en het toevoegen van sessies af.
 */
import { useState, useEffect } from "react";
import calendarService from "@/src/services/calendarService";

const useCalendar = () => {
  const [calendarId, setCalendarId] = useState<string | null>(null);

  // Initialiseer kalender toegang bij mount
  useEffect(() => {
    initializeCalendar();
  }, []);

  // Vraag kalendertoegang en sla ID op
  const initializeCalendar = async () => {
    try {
      const id = await calendarService.requestAccess();
      setCalendarId(id);
    } catch (error) {
      console.error("Calendar initialization error:", error);
    }
  };

  /**
   * Voegt een leessessie toe aan de kalender
   * Vraagt indien nodig opnieuw om toegang
   */
  const addReadingSession = async (mangaTitle: string) => {
    try {
      if (!calendarId) {
        await initializeCalendar();
        if (!calendarId) {
          throw new Error("Geen toegang tot agenda");
        }
      }

      await calendarService.createReadingSession(calendarId, mangaTitle);
      return true;
    } catch (error) {
      console.error("Add session error:", error);
      throw error;
    }
  };

  return { addReadingSession };
};

export default useCalendar;
