/**
 * Service voor het zoeken en toevoegen van manga's via de MyAnimeList API
 */
import { API_CONFIG } from "@/src/config/api";
import { MALManga } from "@/src/types/manga";
import { createMangaFromMAL } from "@/src/utils/mangaHelpers";
import mangaService from "./mangaService";
import feedbackService from "./feedbackService";

/**
 * Zoekt manga's via de MAL API op basis van een zoekterm
 * Retourneert een lijst van maximaal 20 resultaten
 */
const searchManga = async (query: string) => {
  if (!query.trim()) return [];

  try {
    const response = await fetch(
      `${API_CONFIG.MAL_URL}/manga?q=${encodeURIComponent(
        query
      )}&fields=id,title,main_picture,num_volumes,status&limit=20`,
      {
        headers: {
          "X-MAL-CLIENT-ID": "your-api-key"!,
        },
      }
    );

    if (!response.ok) throw new Error("Search failed");

    const data = await response.json();
    return data.data;
  } catch (error) {
    feedbackService.showError("Failed to search manga");
    return [];
  }
};

/**
 * Voegt een specifiek volume van een MAL manga toe aan de collectie
 * Zet eerst MAL data om naar ons formaat en gebruikt dan mangaService
 */
const handleAddManga = async (malManga: MALManga, volumeNumber: number) => {
  try {
    const manga = createMangaFromMAL(malManga, volumeNumber);
    await mangaService.addManga(manga);
    feedbackService.showSuccess(
      `Volume ${volumeNumber} added to your collection!`
    );
  } catch (error) {
    feedbackService.showError(
      error instanceof Error ? error.message : "Failed to add manga"
    );
  }
};

export default {
  searchManga,
  handleAddManga,
};
