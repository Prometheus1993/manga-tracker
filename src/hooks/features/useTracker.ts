/**
 * Hook voor het bijhouden van leesactiviteiten.
 * Integreert notificaties, kalendersessies en manga tracking.
 */
import { useMemo, useCallback } from "react";
import useManga from "@/src/hooks/context/useManga";
import useNotifications from "@/src/hooks/features/useNotifications";
import useCalendar from "@/src/hooks/features/useCalendar";
import feedbackService from "@/src/services/feedbackService";

const useTracker = () => {
  const { mangas } = useManga();
  const { reminderEnabled, toggleReminder } = useNotifications();
  const { addReadingSession } = useCalendar();

  /**
   * Voegt een leessessie toe aan de kalender
   * Met feedback bij succes of falen
   */
  const handleAddSession = useCallback(
    async (title: string): Promise<void> => {
      try {
        const success = await addReadingSession(title);
        if (success) {
          feedbackService.showSuccess(`Reading session added for ${title}`);
        }
      } catch (error) {
        feedbackService.showError("Could not add reading session");
      }
    },
    [addReadingSession]
  );

  // Sectie data voor tracker interface
  const sectionsData = useMemo(
    () => [
      {
        title: "Daily Reading Reminder",
        subtitle: "",
        data: [null],
        type: "reminder",
      },
      {
        title: "Track Reading Sessions",
        subtitle:
          "Add your reading sessions to the calendar to track your progress.",
        data: [mangas],
        type: "reading",
      },
    ],
    [mangas]
  );

  return {
    sectionsData,
    reminderEnabled,
    toggleReminder,
    handleAddSession,
    mangas,
  };
};

export default useTracker;
