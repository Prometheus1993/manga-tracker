/**
 * Hook voor het beheren van opgeslagen leeslocaties.
 * Biedt CRUD functionaliteit voor locaties met error handling.
 */
import { useState, useEffect } from "react";
import locationService from "@/src/services/locationService";
import feedbackService from "@/src/services/feedbackService";
import { ReadingLocation } from "@/src/types/manga";

const useReadingLocations = () => {
  const [locations, setLocations] = useState<ReadingLocation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Laad opgeslagen locaties bij mount
  useEffect(() => {
    loadLocations();
  }, []);

  // Haalt locaties op uit storage
  const loadLocations = async () => {
    try {
      setIsLoading(true);
      const savedLocations = await locationService.getLocations();
      setLocations(savedLocations);
    } catch (error) {
      feedbackService.showError("Failed to load reading locations");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Voegt nieuwe leeslocatie toe met optionele beschrijving
   */
  const addLocation = async (name: string, description?: string) => {
    try {
      const newLocation = await locationService.saveLocation(name, description);
      setLocations((prev) => [...prev, newLocation]);
      feedbackService.showSuccess("Reading location saved!");
    } catch (error) {
      feedbackService.showError("Could not save location");
    }
  };

  /**
   * Verwijdert bestaande leeslocatie
   */
  const deleteLocation = async (id: string) => {
    try {
      await locationService.deleteLocation(id);
      setLocations((prev) => prev.filter((loc) => loc.id !== id));
      feedbackService.showSuccess("Location deleted");
    } catch (error) {
      feedbackService.showError("Could not delete location");
    }
  };

  return {
    locations,
    isLoading,
    addLocation,
    deleteLocation,
    reloadLocations: loadLocations,
  };
};
export default useReadingLocations;